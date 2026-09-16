from job_search_ai.llm_client import analyze_text, analyze_url
from job_search_ai.models import CVProfile, JobPosting, MatchAnalysis


# Convert extracted CV text into a structured CV profile
def analyze_cv(cv_text: str) -> CVProfile:
    return analyze_text(cv_text, CVProfile)


# Extract and structure job posting information from a URL
def analyze_job_url(job_url: str) -> JobPosting:
    return analyze_url(job_url, JobPosting)


# Compare the CV profile with the job posting and return a structured match analysis
def analyze_match(profile: CVProfile, job: JobPosting) -> MatchAnalysis:
    return analyze_text(
        text=f"""Compare the candidate's CV profile with the job posting.

        Analyze the candidate specifically in relation to this job.

        Identify:
        - an overall match score from 0 to 100
        - skills from the CV that are relevant to the job
        - important skills required by the job that are missing from the CV
        - the candidate's main strengths for this job
        - practical recommendations for improving the candidate's fit or CV

        Base the analysis only on information found in the CV profile and job posting.
        Do not assume skills, experience, education, or qualifications that are not provided.
        Avoid repeating the same information across different fields.

        CV:
        {profile.model_dump_json()}

        Job:
        {job.model_dump_json()}""",
        model_class=MatchAnalysis,
    )
