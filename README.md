# AI-Powered Knowledge Search

An AI-powered knowledge search system that leverages Retrieval-Augmented Generation (RAG) to provide intelligent search results and natural language answers. The project features a React frontend for a clean, responsive UI and a Django backend that serves as an API for document retrieval and answer generation. Document embeddings and vector search (using FAISS or ChromaDB) are used to efficiently fetch relevant documents based on user queries.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Frontend (React)](#frontend-react)
  - [Backend (Django)](#backend-django)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- **AI-Powered Search:**  
  Use of embeddings and vector search to retrieve semantically similar documents.

- **Retrieval-Augmented Generation (RAG):**  
  Combine retrieved documents with an LLM to generate a final answer to user queries.

- **Responsive UI:**  
  A modern, React-based frontend with Tailwind CSS for styling.

- **Django REST API:**  
  A backend built with Django that exposes API endpoints for search.

- **Debounced Search Input:**  
  As users type, a debounced search triggers API calls to improve performance.

- **Loading Indicators & Error Handling:**  
  The UI provides user feedback during API calls.

## Tech Stack

- **Frontend:**  
  - React (with TypeScript)
  - Tailwind CSS

- **Backend:**  
  - Django, Django REST Framework (optional for advanced endpoints)
  - django-cors-headers

- **AI & Vector Search:**  
  - Sentence Transformers (e.g., `all-MiniLM-L6-v2`) for embeddings
  - FAISS or ChromaDB for vector indexing and similarity search
  - Hugging Face Transformers (e.g., GPT-2 or another LLM) for generation

- **Others:**  
  - Axios for API calls
  - Virtual environments for Python dependency isolation

## Project Structure

