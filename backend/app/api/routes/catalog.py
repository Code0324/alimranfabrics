"""Catalog routes — reads from the actual DB schema."""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.api.deps import get_session

router = APIRouter(prefix="/catalog", tags=["Catalog"])


def _parse_product(row: dict) -> dict:
    import json
    images_raw = row.get("images") or "[]"
    try:
        images = json.loads(images_raw) if isinstance(images_raw, str) else images_raw
    except Exception:
        images = []

    price = float(row.get("selling_price") or 0)
    compare_price = float(row.get("discount_price") or 0) or None

    return {
        "id": row["id"],
        "name": row["name"],
        "slug": row["slug"],
        "description": row.get("description") or "",
        "price": price,
        "originalPrice": compare_price,
        "images": images if images else [],
        "category": row.get("category_name") or row.get("type") or "Uncategorized",
        "categorySlug": row.get("category_slug") or "women",
        "brand": row.get("brand_name") or "Al Imran Fabrics",
        "brandSlug": row.get("brand_slug") or "",
        "fabric": row.get("piece_type") or row.get("type") or "",
        "stock": int(row.get("total_stock") or 0),
        "stockStatus": row.get("stock_status") or "in_stock",
        "isFeatured": bool(row.get("is_featured")),
        "isBestSeller": bool(row.get("is_bestseller")),
        "isNew": bool(row.get("is_new_arrival")),
        "isLimitedEdition": bool(row.get("is_limited_edition")),
        "discountPercentage": int(row.get("discount_percentage") or 0),
        "tags": row.get("tags") or "",
    }


@router.get("/products")
async def list_catalog_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category_slug: Optional[str] = None,
    brand_slug: Optional[str] = None,
    featured: Optional[bool] = None,
    new_arrival: Optional[bool] = None,
    session: AsyncSession = Depends(get_session),
):
    """List products with real schema, optional filters."""
    filters = ["p.status = 'active'"]
    params: dict = {"skip": skip, "limit": limit}

    if category_slug:
        filters.append("c.slug = :category_slug")
        params["category_slug"] = category_slug

    if brand_slug:
        filters.append("b.slug = :brand_slug")
        params["brand_slug"] = brand_slug

    if featured is not None:
        filters.append("p.is_featured = :featured")
        params["featured"] = featured

    if new_arrival is not None:
        filters.append("p.is_new_arrival = :new_arrival")
        params["new_arrival"] = new_arrival

    where = " AND ".join(filters)

    sql = text(f"""
        SELECT
            p.id, p.name, p.slug, p.description, p.selling_price, p.discount_price,
            p.discount_percentage, p.total_stock, p.stock_status, p.images, p.tags,
            p.is_featured, p.is_bestseller, p.is_new_arrival, p.is_limited_edition,
            p.piece_type, p.type,
            c.name AS category_name, c.slug AS category_slug,
            b.name AS brand_name, b.slug AS brand_slug
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        LEFT JOIN brands b ON b.id = p.brand_id
        WHERE {where}
        ORDER BY p.display_order ASC, p.created_at DESC
        LIMIT :limit OFFSET :skip
    """)

    result = await session.execute(sql, params)
    rows = result.mappings().all()
    return [_parse_product(dict(r)) for r in rows]


@router.get("/products/count")
async def count_catalog_products(
    category_slug: Optional[str] = None,
    session: AsyncSession = Depends(get_session),
):
    """Count active products, optionally filtered by category."""
    if category_slug:
        sql = text("""
            SELECT COUNT(*) FROM products p
            LEFT JOIN categories c ON c.id = p.category_id
            WHERE p.status = 'active' AND c.slug = :slug
        """)
        result = await session.execute(sql, {"slug": category_slug})
    else:
        sql = text("SELECT COUNT(*) FROM products WHERE status = 'active'")
        result = await session.execute(sql)
    return {"count": result.scalar()}


@router.get("/products/{product_id}")
async def get_catalog_product(
    product_id: str,
    session: AsyncSession = Depends(get_session),
):
    """Get single product by ID or slug."""
    sql = text("""
        SELECT
            p.id, p.name, p.slug, p.description, p.detailed_description,
            p.selling_price, p.discount_price, p.discount_percentage,
            p.total_stock, p.stock_status, p.images, p.tags,
            p.is_featured, p.is_bestseller, p.is_new_arrival, p.is_limited_edition,
            p.piece_type, p.type,
            c.name AS category_name, c.slug AS category_slug,
            b.name AS brand_name, b.slug AS brand_slug
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        LEFT JOIN brands b ON b.id = p.brand_id
        WHERE p.status = 'active' AND (p.id = :val OR p.slug = :val)
        LIMIT 1
    """)
    result = await session.execute(sql, {"val": product_id})
    row = result.mappings().first()
    if not row:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Product not found")
    return _parse_product(dict(row))


@router.get("/categories")
async def list_categories(session: AsyncSession = Depends(get_session)):
    """List all categories with product counts."""
    sql = text("""
        SELECT c.id, c.name, c.slug,
               COUNT(p.id) AS product_count
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id AND p.status = 'active'
        GROUP BY c.id, c.name, c.slug
        ORDER BY product_count DESC
    """)
    result = await session.execute(sql)
    return [dict(r) for r in result.mappings().all()]
