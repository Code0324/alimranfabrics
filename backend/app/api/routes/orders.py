"""Order routes."""
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_session, get_current_user, get_admin_user
from app.models.order import Order
from app.models.user import User
from app.schemas.order import OrderCreate, OrderUpdate, OrderResponse
from app.services.order import OrderService

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_create: OrderCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Order:
    """Create a new order (authenticated users only)."""
    return await OrderService.create_order(current_user, order_create, session)


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Order:
    """Get order by ID (users see only their own; admins see all)."""
    order = await OrderService.get_order_by_id(order_id, session)

    if (
        current_user.role.value != "admin"
        and order.user_id != current_user.id
    ):
        from app.utils.exceptions import PermissionDeniedException
        raise PermissionDeniedException()

    return order


@router.get("", response_model=list[OrderResponse])
async def list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=500),
    order_status: Optional[str] = Query(None, alias="status"),
    payment_status: Optional[str] = Query(None),
    current_user: Annotated[User, Depends(get_current_user)] = None,
    session: Annotated[AsyncSession, Depends(get_session)] = None,
) -> list[Order]:
    """
    List orders.
    - Admin: returns all orders (with optional status/payment_status filters).
    - Regular user: returns only their own orders.
    """
    if current_user.role.value == "admin":
        return await OrderService.list_all_orders(
            session, skip, limit,
            status=order_status,
            payment_status=payment_status,
        )
    return await OrderService.list_user_orders(current_user, session, skip, limit)


@router.put("/{order_id}", response_model=OrderResponse)
async def update_order(
    order_id: str,
    order_update: OrderUpdate,
    admin: Annotated[User, Depends(get_admin_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> Order:
    """
    Update order status and/or payment_status (admin only).

    Body fields (all optional):
    - **status**: pending | confirmed | shipped | delivered | cancelled
    - **payment_status**: Pending | Pending Verification | Paid | Rejected
    """
    return await OrderService.update_order(order_id, order_update, session)


__all__ = ["router"]
