from pypdf import PdfReader


# Extracts text from an uploaded PDF file
def read_cv_pdf(file) -> str:
    reader = PdfReader(file)
    text = ""

    for page in reader.pages:
        text += page.extract_text() + "\n"

    # Returns extracted PDF text as a string
    return text
