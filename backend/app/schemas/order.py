"""Order schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.order import OrderStatus, PaymentMethod


class OrderItemRequest(BaseModel):
    """Order item creation request."""

    product_id: str = Field(..., description="Product ID")
    quantity: int = Field(..., gt=0, description="Item quantity")


class OrderCreate(BaseModel):
    """Order creation schema."""

    items: list[OrderItemRequest] = Field(..., description="Order items")
    customer_name: Optional[str] = Field(None)
    customer_phone: Optional[str] = Field(None)
    customer_address: Optional[str] = Field(None)
    customer_city: Optional[str] = Field(None)
    customer_notes: Optional[str] = Field(None)
    payment_method: PaymentMethod = Field(default=PaymentMethod.COD)
    payment_screenshot: Optional[str] = Field(None)


class OrderItemResponse(BaseModel):
    """Order item response schema."""

    id: str
    product_id: str
    quantity: int
    price: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    """Order response schema."""

    id: str
    user_id: str
    total_amount: float
    status: str
    payment_method: str
    payment_status: Optional[str] = None
    payment_screenshot: Optional[str] = None
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_address: Optional[str] = None
    customer_city: Optional[str] = None
    customer_notes: Optional[str] = None
    items: list[OrderItemResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class OrderUpdate(BaseModel):
    """Order update schema (admin only) — status and/or payment_status."""

    status: Optional[str] = Field(None, description="New order status")
    payment_status: Optional[str] = Field(None, description="New payment status (Paid | Rejected)")


__all__ = ["OrderCreate", "OrderUpdate", "OrderResponse", "OrderItemResponse", "OrderItemRequest"]
