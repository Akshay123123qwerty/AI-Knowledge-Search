# AI-Powered Knowledge Search

An AI-powered knowledge search system that leverages Retrieval-Augmented Generation (RAG) to provide intelligent search results and natural language answers. The project features a React frontend for a clean, responsive UI and a Django backend that serves as an API for document retrieval and answer generation. Document embeddings and vector search (using FAISS) are used to efficiently fetch relevant documents based on user queries.This project uses GPT-2 as LLM, this provides close query related answers but not accurate, you can  choose other LLMs that have better generation wrt query.This project gives you an idea of implementing RAG.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
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
  - Sentence Transformers ( `all-MiniLM-L6-v2`) for embeddings
  - FAISS or ChromaDB for vector indexing and similarity search
  - Hugging Face Transformers (`GPT-2`) for generation

- **Others:**  
  - Axios for API calls
  - Virtual environments for Python dependency isolation
 
## Usage

### Frontend

- The app initially displays a welcome page.
- Clicking **"Get Started"** transitions to the search interface.
- The search interface includes:
  - A section to display **search results**.
  - A section to show the **final generated answer**.
- As the user types, API calls are made to the Django backend to retrieve relevant documents and generate a final answer.

### Backend API

- The `/api/search/` endpoint accepts a `query` parameter.
- It computes document embeddings for the stored documents.
- It performs vector search using **FAISS** to retrieve semantically relevant documents.
- It integrates with an LLM to generate a refined final answer based on the retrieved context.
- The API returns a JSON object containing:
  - `retrieved_documents`: An array of search result objects.
  - `answer`: A generated answer as a string.


## Future Enhancements

- **Real Document Database:**  
  Store and manage documents in a persistent database rather than hard-coding them in memory. This will allow dynamic updates and scalability for a larger collection of documents.

- **Improved LLM Integration:**  
  Upgrade to a more capable open-source LLM or use a hosted API to enhance the quality of generated responses. This can include fine-tuning for domain-specific language and better context handling.

- **User Authentication:**  
  Add token-based authentication (e.g., using JWT) to secure your API endpoints. This ensures that only authorized users can access the search functionality and data.

- **Advanced UI/UX:**  
  Improve the user interface by enhancing styling, adding pagination for search results, and incorporating robust error handling. Additional features like loading indicators, search suggestions, and responsive design will further boost user experience.

- **Deployment:**  
  Deploy both the Django backend and React frontend to cloud services (such as Heroku, AWS, or Vercel) to make the application accessible in a production environment. Consider containerization (e.g., Docker) for easier scalability and maintenance.


