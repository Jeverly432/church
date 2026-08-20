'use client';

import { create } from 'zustand';
import { apiRequest, API_URL } from '../api/client';

export type Document = {
  id: number;
  title: string;
  url: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

type DocumentUpload = {
  title: string;
  pinned: boolean;
  file: File;
};

type DocsState = {
  documents: Document[];
  currentDocument: Document | null;
  fetchedId: string | null;
  isFetching: boolean;
  isLoading: boolean;
  hasFetchedDocuments: boolean;
  fetchDocuments: () => Promise<void>;
  addDocument: (token: string, body: DocumentUpload) => Promise<void>;
  getDocument: (id: string) => Promise<void>;
  putDocument: (token: string, id: string, body: Partial<DocumentUpload>) => Promise<void>;
};

export const useDocsStore = create<DocsState>()((set) => ({
  documents: [],
  isLoading: false,
  isFetching: false,
  fetchedId: null,
  currentDocument: null,
  hasFetchedDocuments: false,
  fetchDocuments: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ documents: Document[] }>('/api/docs');
      set({ documents: data.documents, isLoading: false, hasFetchedDocuments: true });
    } catch (e) {
      set({ isLoading: false, hasFetchedDocuments: true });
      throw e;
    }
  },
  getDocument: async (id) => {
    set({ isFetching: true, fetchedId: id, currentDocument: null });

    try {
      const data = await apiRequest<{ document: Document }>(`/api/docs/${id}`);
      set({ currentDocument: data.document, isFetching: false });
    } catch (e) {
      set({ currentDocument: null, isFetching: false });
      throw e;
    }
  },
  putDocument: async (token, id, { title, pinned, file }) => {
    set({ isLoading: true });
    const form = new FormData();

    if (title !== undefined) {
      form.append('title', title);
    }

    if (pinned !== undefined) {
      form.append('pinned', String(pinned));
    }

    if (file) {
      form.append('file', file);
    }

    const response = await fetch(`${API_URL}/api/docs/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const data = await response.json();

    if (!response.ok) {
      set({ isLoading: false });
      throw new Error(data.message);
    }
    set((state) => ({
      currentDocument: data.document,
      documents: [data.document, ...state.documents.filter((document) => document.id !== data.document.id)],
      isLoading: false,
    }));
  },
  addDocument: async (token, { title, pinned, file }) => {
    set({ isLoading: true });
    const form = new FormData();

    form.append('title', title);
    form.append('pinned', String(pinned));
    form.append('file', file);

    const response = await fetch(`${API_URL}/api/docs`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const data = await response.json();

    if (!response.ok) {
      set({ isLoading: false });
      throw new Error(data.message);
    }
    set((state) => ({
      documents: [data.document, ...state.documents],
      isLoading: false,
    }));
  },
}));
