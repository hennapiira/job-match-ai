from typing import Annotated

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from job_match_ai.analyzer import analyze_cv, analyze_job_url, analyze_match
from job_match_ai.cv_reader import read_cv_pdf
from job_match_ai.models import MatchAnalysis

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Job Match AI API"}


@app.post("/analyze", response_model=MatchAnalysis)
def analyze(
    cv: Annotated[UploadFile, File()],
    job_url: Annotated[str, Form()],
):
    # Validate the uploaded file before trying to read it
    if cv.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="CV must be a PDF file.",
        )

    try:
        cv_text = read_cv_pdf(cv.file)

        if not cv_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the PDF.",
            )

        profile = analyze_cv(cv_text)
        job = analyze_job_url(job_url)
        return analyze_match(profile, job)

    except HTTPException:
        raise
    except Exception as error:
        print(f"Analysis failed: {error}")
        raise HTTPException(
            status_code=500,
            detail="Analysis failed. Please try again.",
        ) from error
