from fastapi import APIRouter

router = APIRouter(tags=["system"])


@router.get("/health")
def health_check() -> dict[str, str]:
    """Lightweight healthcheck used by Render and CI smoke tests."""
    return {"status": "ok", "service": "martrust-api"}
