import faiss
import numpy as np
import pickle
import os

INDEX_FILE = "faiss.index"

CHUNKS_FILE = "chunks.pkl"

index = None

stored_chunks = []

# CREATE / UPDATE INDEX

def create_index(
    embeddings,
    chunks
):

    global index
    global stored_chunks

    dimension = len(
        embeddings[0]
    )

    if os.path.exists(
        INDEX_FILE
    ):

        index = faiss.read_index(
            INDEX_FILE
        )

    else:

        index = faiss.IndexFlatL2(
            dimension
        )

    index.add(
        np.array(embeddings)
    )

    stored_chunks.extend(chunks)

    # SAVE

    faiss.write_index(
        index,
        INDEX_FILE
    )

    with open(
        CHUNKS_FILE,
        "wb"
    ) as f:

        pickle.dump(
            stored_chunks,
            f
        )

# LOAD INDEX

def load_index():

    global index
    global stored_chunks

    if os.path.exists(
        INDEX_FILE
    ):

        index = faiss.read_index(
            INDEX_FILE
        )

    if os.path.exists(
        CHUNKS_FILE
    ):

        with open(
            CHUNKS_FILE,
            "rb"
        ) as f:

            stored_chunks = pickle.load(
                f
            )

# SEARCH

def search(
    query_embedding,
    k=3
):

    global index
    global stored_chunks

    if index is None:
        return []

    query_embedding = np.array([
        query_embedding
    ])

    distances, indices = index.search(
        query_embedding,
        k
    )

    results = []

    for idx in indices[0]:

        if idx < len(stored_chunks):

            results.append(
                stored_chunks[idx]
            )

    return results