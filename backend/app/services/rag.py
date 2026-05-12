import requests

from app.services.vector_db import search

from app.services.embedding import get_model

# SPLIT TEXT

def chunk_text(
    text,
    chunk_size=500
):

    return [

        text[i:i + chunk_size]

        for i in range(
            0,
            len(text),
            chunk_size
        )
    ]


# OLLAMA REQUEST

def query_ollama(prompt):

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()[
        "response"
    ]

# MAIN RAG

def generate_answer(
    query,
    history=None
):

    try:

        # EMBED QUESTION

        model = get_model()
        query_embedding = model.encode([
            query
        ])[0]

        # SEARCH

        relevant_chunks = search(
            query_embedding
        )

        if not relevant_chunks:

            return (
                "No relevant context found."
            )

        context = "\n".join(
            relevant_chunks
        )

        # CHAT HISTORY

        history_text = ""

        if history:

            for msg in history[-5:]:

                history_text += f"""
                {msg['role']}:
                {msg['text']}
                """

        # FINAL PROMPT

        prompt = f"""
        You are a helpful AI assistant.

        Previous Conversation:
        {history_text}

        Context:
        {context}

        User Question:
        {query}

        Give a clear helpful answer.
        """

        return query_ollama(
            prompt
        )

    except Exception as e:

        return f"""
        RAG Error:
        {str(e)}
        """