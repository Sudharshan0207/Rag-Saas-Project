# AI RAG SaaS Platform

Production-ready AI SaaS platform using:

- FastAPI
- React
- FAISS Vector DB
- Ollama
- Mistral LLM
- Sentence Transformers
- RAG Architecture

---

# Features

✅ PDF Upload  
✅ AI Question Answering  
✅ Retrieval-Augmented Generation  
✅ Persistent Vector Database  
✅ ChatGPT-style UI  
✅ Multi-document Support  
✅ Typing Animation  
✅ Chat Memory  
✅ Modern SaaS Interface  

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS

## Backend
- FastAPI
- FAISS
- Sentence Transformers
- Ollama
- PyMuPDF

---

# Architecture

PDF Upload
↓
Text Extraction
↓
Chunking
↓
Embeddings
↓
FAISS Vector Search
↓
LLM Context Injection
↓
AI Response

---

# Run Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload