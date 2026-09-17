# Job Match AI

Job Match AI is an AI-powered web application that compares a user's CV with a job posting and provides an analysis of how well the candidate matches the role.

The user uploads a CV as a PDF and provides a URL to a job posting. The application analyzes both and identifies relevant skills, missing skills, strengths, recommendations, and an AI-estimated match score.

## Features

- Upload a CV as a PDF
- Analyze a job posting from a URL
- Compare CV skills and experience with job requirements
- Identify relevant and missing skills
- Highlight candidate strengths
- Provide recommendations based on the job
- Generate an AI-estimated match score
- Validate uploaded CV files
- Handle API and analysis errors

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- Pydantic
- Gemini API
- PyPDF

## How It Works

1. The user uploads a CV and provides a job posting URL.
2. The FastAPI backend extracts text from the PDF.
3. Gemini analyzes the CV and creates a structured candidate profile.
4. Gemini analyzes the job posting from the provided URL.
5. The candidate profile and job posting are compared.
6. The frontend displays the match score, related skills, missing skills, strengths, and recommendations.

## Running Locally

### Prerequisites

- Python 3.11 or newer
- Node.js
- uv
- Gemini API key

### Backend

Clone the repository and navigate to the project directory.

Create a `.env` file in the project root based on `.env.example`, then add your Gemini API key:

    GEMINI_API_KEY=your_api_key

Install the Python dependencies:

    uv sync

Start the FastAPI server:

    uv run uvicorn job_match_ai.api:app --reload

The API runs at `http://127.0.0.1:8000`.

### Frontend

Open another terminal and navigate to the frontend directory:

    cd frontend

Install the frontend dependencies:

    npm install

Start the development server:

    npm run dev

The frontend runs at `http://localhost:3000`.

## Match Score

The match score is AI-generated and should be treated as an estimate rather than an objective measurement of a candidate's suitability for a role.
