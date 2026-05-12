from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Body
)

import os

from app.utils.pdf_loader import load_pdf

from app.services.embedding import (
    get_embeddings
)

from app.services.vector_db import (
    create_index
)

from app.services.rag import (
    chunk_text,
    generate_answer
)

router = APIRouter()

# STORAGE

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

UPLOAD_DIR = os.path.join(
    BASE_DIR,
    "data"
)

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

# UPLOAD PDF

@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        content = await file.read()

        with open(file_path, "wb") as f:
            f.write(content)

        # PDF → TEXT
        text = load_pdf(file_path)

        # TEXT → CHUNKS
        chunks = chunk_text(text)

        # CHUNKS → EMBEDDINGS
        embeddings = get_embeddings(chunks)

        # SAVE TO VECTOR DB
        create_index(
            embeddings,
            chunks
        )

        return {
            "success": True,
            "filename": file.filename
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

# QUERY AI

@router.post("/query")
async def query_api(
    data: dict = Body(...)
):

    try:

        question = data.get(
            "question",
            ""
        )

        history = data.get(
            "history",
            []
        )

        answer = generate_answer(
            question,
            history
        )

        return {
            "success": True,
            "answer": answer
        }

    except Exception as e:

        return {
            "success": False,
            "answer": str(e)
        }