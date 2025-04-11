from django.http import JsonResponse
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
from transformers import pipeline
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]        

@api_view(['POST'])
def logout_view(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=205)
    except Exception as e :
        return Response(status=400)


import logging
logger = logging.getLogger(__name__)

DOCUMENTS = [
    {
        "id": "1",
        "title": "Understanding AI",
        "content": "Artificial Intelligence (AI) is a branch of computer science focusing on creating smart machines."
    },
    {
        "id": "2",
        "title": "Machine Learning Basics",
        "content": "Machine Learning is a subset of AI that involves training algorithms on data."
    },
    {
        "id": "3",
        "title": "Deep Learning Explained",
        "content": "Deep Learning uses neural networks with many layers to model complex patterns in data."
    },
    {
    "id": "4",
    "title": "Natural Language Processing",
    "content": "Natural Language Processing (NLP) enables machines to understand and generate human language."
},
{
    "id": "5",
    "title": "Supervised Learning",
    "content": "Supervised learning involves training a model on labeled data where the output is known."
},
{
    "id": "6",
    "title": "Unsupervised Learning",
    "content": "Unsupervised learning uses unlabeled data to find hidden patterns or groupings in the dataset."
},
{
    "id": "7",
    "title": "Reinforcement Learning",
    "content": "Reinforcement learning is a type of machine learning where an agent learns by interacting with its environment."
},
{
    "id": "8",
    "title": "Neural Networks",
    "content": "Neural networks are a set of algorithms designed to recognize patterns, inspired by the human brain."
},
{
    "id": "9",
    "title": "Transfer Learning",
    "content": "Transfer learning applies knowledge gained from one task to a different but related task."
},
{
    "id": "10",
    "title": "AI in Healthcare",
    "content": "AI is being used in healthcare for diagnostics, treatment planning, and drug discovery."
},
{
    "id": "11",
    "title": "Data Preprocessing",
    "content": "Data preprocessing involves cleaning and transforming raw data into a usable format for modeling."
},
{
    "id": "12",
    "title": "Model Evaluation Metrics",
    "content": "Common model evaluation metrics include accuracy, precision, recall, and F1-score."
},
{
    "id": "13",
    "title": "Overfitting and Underfitting",
    "content": "Overfitting occurs when a model learns the training data too well, while underfitting happens when the model fails to capture underlying patterns."
}

]


embedding_model = SentenceTransformer('all-MiniLM-L6-v2')


doc_texts = [doc['content'] for doc in DOCUMENTS]
doc_embeddings = embedding_model.encode(doc_texts, convert_to_numpy=True)
dimension = doc_embeddings.shape[1]
faiss_index = faiss.IndexFlatL2(dimension)
faiss_index.add(doc_embeddings)


generator = pipeline("text-generation", model="gpt2")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search(request):
    query = request.GET.get('query', '').strip()
    if not query:
        return JsonResponse({"error": "No query provided."}, status=400)
    
    try:
        
        query_embedding = embedding_model.encode([query], convert_to_numpy=True)
        k = 2 
        distances, indices = faiss_index.search(query_embedding, k)
        
        retrieved_docs = []
        for idx in indices[0]:
            if idx < len(DOCUMENTS):
                retrieved_docs.append(DOCUMENTS[idx])
        
       
        context = " ".join(doc["content"] for doc in retrieved_docs)
        
        
        prompt = f"Context:  {query}"
        
        #{context}
       
        generated = generator(prompt, max_length=150, num_return_sequences=1)
        final_answer = generated[0]["generated_text"]
        
       
        response = {
            "retrieved_documents": retrieved_docs,
            "answer": final_answer,
        }
        return JsonResponse(response, safe=False)
    
    except Exception as e:
        logger.error("Error during search: %s", e)
        return JsonResponse({"error": "Internal Server Error"}, status=500)


