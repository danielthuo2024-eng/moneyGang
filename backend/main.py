from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import logging
from datetime import datetime
import os
import uuid
import asyncio
from typing import Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(
    title="M-Pesa AI Analyzer API",
    description="AI-powered credit assessment using M-Pesa statements",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Create upload directory on startup"""
    os.makedirs("uploads/mpesa", exist_ok=True)
    logger.info("Upload directory created: uploads/mpesa")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "service": "M-Pesa AI Analyzer"}

@app.post("/analyze-mpesa")
async def analyze_mpesa_statement(mpesa_statement: UploadFile = File(...)):
    """
    Analyze M-Pesa statement for AI-powered credit assessment
    """
    try:
        logger.info(f"Received M-Pesa statement upload: {mpesa_statement.filename}")
        
        # Validate file presence
        if not mpesa_statement.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please upload your M-Pesa statement (.pdf or .csv)."
            )
        
        # Validate file type
        file_ext = os.path.splitext(mpesa_statement.filename)[1].lower()
        if file_ext not in ['.pdf', '.csv']:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type — only PDF and CSV allowed."
            )
        
        # Read file content for size validation
        content = await mpesa_statement.read()
        
        # Validate file size (5MB)
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File exceeds 5MB limit."
            )
        
        # Reset file pointer for saving
        await mpesa_statement.seek(0)
        
        # Save file with secure naming
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = uuid.uuid4().hex[:8]
        safe_filename = f"mpesa_{timestamp}_{unique_id}{file_ext}"
        save_path = os.path.join("uploads/mpesa", safe_filename)
        
        # Save file
        with open(save_path, "wb") as f:
            content = await mpesa_statement.read()
            f.write(content)
        
        logger.info(f"Successfully saved M-Pesa statement: {safe_filename}")
        
        # Process with AI analysis
        analysis_result = await process_mpesa_analysis(save_path, file_ext)
        
        logger.info(f"AI analysis completed for {mpesa_statement.filename}")
        
        return analysis_result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during analysis: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Upload failed. Try again or contact support."
        )

async def process_mpesa_analysis(file_path: str, file_ext: str) -> Dict[str, Any]:
    """Mock AI analysis - replace with real AI integration"""
    processing_time = 3 if file_ext == '.pdf' else 2
    await asyncio.sleep(processing_time)
    
    import random
    base_score = random.randint(60, 85)
    
    if base_score >= 75:
        decision_status = "APPROVED"
        interest_rate = round(12.5 - (base_score - 75) * 0.2, 2)
        reasons = [
            "Strong consistent income pattern",
            "Excellent transaction frequency",
            "Healthy account balance history",
            "Regular bill payment behavior"
        ]
    elif base_score >= 60:
        decision_status = "SECOND_LOOK"
        interest_rate = 16.5
        reasons = [
            "Moderate income consistency",
            "Average transaction volume",
            "Some irregular payment patterns",
            "Requires additional verification"
        ]
    else:
        decision_status = "DECLINED"
        interest_rate = None
        reasons = [
            "Insufficient transaction history",
            "Irregular income pattern",
            "High transaction volatility",
            "Limited credit history data"
        ]
    
    extracted_data = {
        "monthly_income": round(random.uniform(30000, 80000), -2),
        "monthly_expenses": round(random.uniform(20000, 60000), -2),
        "avg_daily_balance": round(random.uniform(5000, 150000), -2),
        "transaction_consistency": random.randint(70, 95),
        "savings_rate": random.randint(10, 40),
        "credit_history_length": random.randint(6, 48)
    }
    
    return {
        "credit_score": base_score,
        "decision_status": decision_status,
        "interest_rate": interest_rate,
        "reason_codes": reasons,
        "extracted_data": extracted_data,
        "confidence_score": round(random.uniform(0.75, 0.95), 2),
        "analysis_timestamp": datetime.now().isoformat()
    }

@app.get("/")
async def root():
    return {
        "message": "M-Pesa AI Analyzer API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "analyze": "/analyze-mpesa"
        }
    }