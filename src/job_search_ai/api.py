from typing import Annotated

from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from job_search_ai.analyzer import (
    analyze_cv,
    analyze_job_url,
    analyze_match,
)
from job_search_ai.cv_reader import read_cv_pdf

# Create the FastAPI application
app = FastAPI()

# Allow the Next.js frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Simple endpoint for checking that the API is running
@app.get("/")
def root():
    return {"message": "Job Match Analysis AI API"}


# Receive the CV and job URL and run the job match analysis
@app.post("/analyze")
def analyze(
    cv: UploadFile,
    job_url: Annotated[str, Form()],
):
    # Extract text from the uploaded CV
    cv_text = read_cv_pdf(cv.file)

    # Analyze the CV and job posting
    profile = analyze_cv(cv_text)
    job = analyze_job_url(job_url)

    # Compare the candidate with the job and generate the final analysis
    analysis = analyze_match(profile, job)

    # FastAPI converts the Pydantic objects into a JSON response
    return analysis
