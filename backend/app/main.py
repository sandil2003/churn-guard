from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router as api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="ChurnGuard Predictive Analytics Dashboard API"
)

# Set up CORS middleware to allow Vite frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend origin e.g. http://localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include prediction and health routers
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "active",
        "service": "ChurnGuard API",
        "version": settings.VERSION,
        "message": "Send POST requests to /api/predict to perform churn probability calculations."
    }
