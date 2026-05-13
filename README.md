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

#Screen Shots 

##Modren Chat Interface

<img width="839" height="270" alt="image" src="https://github.com/user-attachments/assets/0ac47753-dc0b-468d-8d2a-faec95540757" />

<img width="1420" height="725" alt="image" src="https://github.com/user-attachments/assets/c37e9060-b82f-4444-a5a3-2e2b3de906b3" />

<img width="1377" height="724" alt="image" src="https://github.com/user-attachments/assets/1b7a9505-6f5f-4338-bfae-238d14357439" />


##Backend (SWAGGER DOCS)

<img width="1892" height="541" alt="image" src="https://github.com/user-attachments/assets/b10f4aaa-4090-4332-bfb0-267c558e2565" />

<img width="1792" height="923" alt="image" src="https://github.com/user-attachments/assets/c4af6692-cea2-4b88-a963-135ecf6d0791" />








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

#Run Frontend 

```bash

cd frontend

npm install dev

npm run dev 


# Run Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload



