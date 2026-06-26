from fastapi import APIRouter

from app.api.v1.endpoints import health

api_router = APIRouter()

# Register feature routers here. Keeping one router per domain module avoids a
# large main.py and makes future permissions easier to audit.
api_router.include_router(health.router)
