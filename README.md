# AI-Powered Knowledge Search

An AI-powered knowledge search system that leverages Retrieval-Augmented Generation (RAG) to provide intelligent search results and natural language answers. The project features a React frontend for a clean, responsive UI and a Django backend that serves as an API for document retrieval and answer generation. Document embeddings and vector search (using FAISS) are used to efficiently fetch relevant documents based on user queries.This project uses GPT-2 that produces close answers but not accurate you can use other LLMs(like OPENAI, Llama etc) to produce more relevant answer, overall the project gives you aN idea of how to implement RAG(Retrieval-Augmented Generation).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Frontend (React)](#frontend-react)
  - [Backend (Django)](#backend-django)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

## Features

- **AI-Powered Search:**  
  Use of embeddings and vector search to retrieve semantically similar documents.

- **Retrieval-Augmented Generation (RAG):**  
  Combine retrieved documents with an LLM to generate a final answer to user queries.

- **Responsive UI:**  
  A modern, React-based frontend with Tailwind CSS for styling.

- **Django REST API:**  
  A backend built with Django that exposes API endpoints for search.

## Tech Stack

- **Frontend:**  
  - React (with TypeScript)
  - Tailwind CSS

- **Backend:**  
  - Django, Django REST Framework (optional for advanced endpoints)
  - django-cors-headers

- **AI & Vector Search:**  
  - Sentence Transformers (`all-MiniLM-L6-v2`) for embeddings
  - FAISS for vector indexing and similarity search
  - Hugging Face Transformers (GPT-2) for generation

- **Others:**  
  - Axios for API calls
  - Virtual environments for Python dependency isolation

## Project Structure

ai-knowledge-search/ ├── backend/ # Django backend │ ├── backend/ # Django project settings │ ├── searchapi/ # Django app for search API │ │ ├── views.py # API endpoints, RAG, vector search logic │ │ ├── urls.py # URL routes for search API │ │ └── ... │ ├── manage.py │ └── ... └── frontend/ # React frontend ├── src/ │ ├── components/ │ │ ├── WelcomePage.tsx │ │ ├── SearchBar.tsx │ │ ├── SearchResults.tsx │ │ └── FinalAnswer.tsx │ ├── types/ │ │ └── SearchResult.ts │ ├── App.tsx │ └── index.css ├── package.json └── ...

- ** Future Enhancements:**
      Real Document Database:
      Store and manage documents in a persistent database rather than hard-coded in memory.

      Improved LLM Integration:
      Upgrade to a more capable open-source LLM or use a hosted API for better generation.

      User Authentication:
      Add token-based authentication to secure your API.

      Advanced UI/UX:
      Improve styling, add pagination, and enhance error handling on the frontend.

      Deployment:
      Deploy your backend and frontend to cloud services for production use.

