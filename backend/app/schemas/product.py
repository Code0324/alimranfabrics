"""Product schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    """Product creation schema."""

    sku: str = Field(..., min_length=1, max_length=100)
    name: str = Field(..., min_length=1, max_length=255)
    brand: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None)
    price: float = Field(..., gt=0)
    compare_price: Optional[float] = Field(None, ge=0)
    stock: int = Field(default=0, ge=0)
    image_url: Optional[str] = Field(None)
    is_featured: bool = Field(default=False)
    is_bestseller: bool = Field(default=False)
    is_new_arrival: bool = Field(default=False)
    is_active: bool = Field(default=True)


class ProductUpdate(BaseModel):
    """Product update schema."""

    name: Optional[str] = Field(None)
    brand: Optional[str] = Field(None)
    category: Optional[str] = Field(None)
    description: Optional[str] = Field(None)
    price: Optional[float] = Field(None, gt=0)
    compare_price: Optional[float] = Field(None, ge=0)
    stock: Optional[int] = Field(None, ge=0)
    image_url: Optional[str] = Field(None)
    is_featured: Optional[bool] = Field(None)
    is_bestseller: Optional[bool] = Field(None)
    is_new_arrival: Optional[bool] = Field(None)
    is_active: Optional[bool] = Field(None)


class ProductResponse(BaseModel):
    """Product response schema."""

    id: str
    sku: str
    name: str
    brand: str
    category: str
    description: Optional[str] = None
    price: float
    compare_price: Optional[float] = None
    stock: int
    image_url: Optional[str] = None
    is_featured: bool
    is_bestseller: bool = False
    is_new_arrival: bool = False
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


__all__ = ["ProductCreate", "ProductUpdate", "ProductResponse"]
