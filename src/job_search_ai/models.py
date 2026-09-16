from pydantic import BaseModel


class WorkExperience(BaseModel):
    title: str
    company: str
    duration: str
    skills: list[str]


class CVProfile(BaseModel):
    skills: list[str]
    experience: list[WorkExperience]
    education: list[str]
    location: str


class JobPosting(BaseModel):
    job_title: str
    company: str
    location: list[str]
    description: str
    skills: list[str]
    url: str


class MatchAnalysis(BaseModel):
    score: float
    related_skills: list[str]
    missing_skills: list[str]
    strengths: list[str]
    recommendations: list[str]
