"""Database session factory and utilities."""
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app.core.config import settings

# Ensure async-compatible URL scheme for PostgreSQL
from urllib.parse import urlparse, urlencode, parse_qs, urlunparse

_db_url = settings.DATABASE_URL
if _db_url.startswith("postgresql://"):
    _db_url = _db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
elif _db_url.startswith("postgres://"):
    _db_url = _db_url.replace("postgres://", "postgresql+asyncpg://", 1)

# Strip sslmode/channel_binding params — asyncpg uses connect_args instead
_parsed = urlparse(_db_url)
_qs = parse_qs(_parsed.query)
_qs.pop("sslmode", None)
_qs.pop("channel_binding", None)
_clean_url = _parsed._replace(query=urlencode({k: v[0] for k, v in _qs.items()})).geturl()

engine = create_async_engine(
    _clean_url,
    echo=settings.DEBUG,
    future=True,
    connect_args={"ssl": "require"},
    poolclass=NullPool,
)

# Create async session factory
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False, autoflush=False
)


async def get_session() -> AsyncSession:
    """Get database session for dependency injection."""
    async with async_session() as session:
        yield session


async def init_db() -> None:
    """Initialize database (create tables and apply missing column migrations)."""
    from app.db.base import Base

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all, checkfirst=True)

        # Safe incremental migrations — ADD COLUMN IF NOT EXISTS is idempotent
        missing_columns = [
            "ALTER TABLE products ADD COLUMN IF NOT EXISTS brand VARCHAR(100) NOT NULL DEFAULT 'Al Imran Fabrics'",
            "ALTER TABLE products ADD COLUMN IF NOT EXISTS is_bestseller BOOLEAN NOT NULL DEFAULT FALSE",
            "ALTER TABLE products ADD COLUMN IF NOT EXISTS is_new_arrival BOOLEAN NOT NULL DEFAULT FALSE",
        ]
        for sql in missing_columns:
            await conn.execute(text(sql))


async def close_db() -> None:
    """Close database connection."""
    await engine.dispose()
