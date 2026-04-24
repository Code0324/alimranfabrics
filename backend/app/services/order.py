"""Order service."""
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import OrderCreate, OrderUpdate
from app.utils.exceptions import (
    OrderNotFoundException,
    ProductNotFoundException,
    InsufficientStockException,
)


class OrderService:
    """Order service."""

    @staticmethod
    async def create_order(
        user: User, order_create: OrderCreate, session: AsyncSession
    ) -> Order:
        """
        Create a new order.

        Args:
            user: Current user
            order_create: Order creation data
            session: Database session

        Returns:
            Created order

        Raises:
            ProductNotFoundException: If product not found
            InsufficientStockException: If product stock insufficient
        """
        total_amount = 0.0
        order_items = []

        # Validate and prepare order items
        for item_data in order_create.items:
            result = await session.execute(
                select(Product).where(Product.id == item_data.product_id)
            )
            product = result.scalar_one_or_none()

            if not product:
                raise ProductNotFoundException()

            if product.stock < item_data.quantity:
                raise InsufficientStockException(product.name)

            # Calculate item total
            item_total = float(product.price) * item_data.quantity
            total_amount += item_total

            # Create order item
            order_item = OrderItem(
                id=str(uuid4()),
                product_id=item_data.product_id,
                quantity=item_data.quantity,
                price=product.price,
            )
            order_items.append(order_item)

        # Create order
        order = Order(
            id=str(uuid4()),
            user_id=user.id,
            total_amount=total_amount,
            customer_name=order_create.customer_name or user.name,
            customer_phone=order_create.customer_phone,
            customer_address=order_create.customer_address,
            customer_city=order_create.customer_city,
            customer_notes=order_create.customer_notes,
            payment_method=order_create.payment_method,
            payment_screenshot=order_create.payment_screenshot,
        )

        # Add items to order
        for item in order_items:
            item.order_id = order.id
            order.items.append(item)

        # Reduce stock for each product
        for item_data in order_create.items:
            result = await session.execute(
                select(Product).where(Product.id == item_data.product_id)
            )
            product = result.scalar_one()
            product.stock -= item_data.quantity

        session.add(order)
        await session.commit()
        await session.refresh(order)

        return order

    @staticmethod
    async def get_order_by_id(
        order_id: str, session: AsyncSession
    ) -> Order:
        """
        Get order by ID.

        Args:
            order_id: Order ID
            session: Database session

        Returns:
            Order object

        Raises:
            OrderNotFoundException: If order not found
        """
        result = await session.execute(
            select(Order)
            .where(Order.id == order_id)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
        )
        order = result.scalar_one_or_none()

        if not order:
            raise OrderNotFoundException()

        return order

    @staticmethod
    async def list_user_orders(
        user: User, session: AsyncSession, skip: int = 0, limit: int = 20
    ) -> list[Order]:
        """
        List orders for a user.

        Args:
            user: Current user
            session: Database session
            skip: Number of records to skip
            limit: Maximum records to return

        Returns:
            List of orders
        """
        result = await session.execute(
            select(Order)
            .where(Order.user_id == user.id)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
            .offset(skip)
            .limit(limit)
            .order_by(Order.created_at.desc())
        )
        return result.scalars().unique().all()

    @staticmethod
    async def list_all_orders(
        session: AsyncSession,
        skip: int = 0,
        limit: int = 20,
        status: str | None = None,
        payment_status: str | None = None,
    ) -> list[Order]:
        """
        List all orders (admin only), with optional filters.
        """
        query = (
            select(Order)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
            .order_by(Order.created_at.desc())
        )
        if status:
            query = query.where(Order.status == status)
        if payment_status:
            query = query.where(Order.payment_status == payment_status)

        result = await session.execute(query.offset(skip).limit(limit))
        return result.scalars().unique().all()

    @staticmethod
    async def update_order(
        order_id: str, order_update: OrderUpdate, session: AsyncSession
    ) -> Order:
        """
        Update order status and/or payment_status (admin only).

        Raises:
            OrderNotFoundException: If order not found
        """
        result = await session.execute(
            select(Order)
            .where(Order.id == order_id)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
        )
        order = result.scalar_one_or_none()

        if not order:
            raise OrderNotFoundException()

        if order_update.status is not None:
            order.status = order_update.status

        if order_update.payment_status is not None:
            order.payment_status = order_update.payment_status
            # Auto-confirm when payment is verified
            if order_update.payment_status == "Paid" and order.status == "pending":
                order.status = "confirmed"

        await session.commit()
        await session.refresh(order)

        # Reload with items
        result = await session.execute(
            select(Order)
            .where(Order.id == order_id)
            .options(selectinload(Order.items).selectinload(OrderItem.product))
        )
        return result.scalar_one()


__all__ = ["OrderService"]
