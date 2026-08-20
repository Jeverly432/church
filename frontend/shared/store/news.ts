'use client';

import { create } from 'zustand';
import { apiRequest, API_URL } from '../api/client';

export type Tag = {
  id: string;
  title: string;
};

export type Photo = {
  id: number;
  url: string;
};

export type News = {
  id: number;
  title: string;
  tag: Tag;
  text: string;
  date: string | null;
  createdAt: string;
  updatedAt: string;
  photos: Photo[];
};

type NewsPayload = {
  title: string;
  date?: string | null;
  tag: string;
  text: string;
  photos?: File[];
  removePhotoIds?: number[];
};

type NewsState = {
  news: News[];
  currentNews: News | null;
  isLoading: boolean;
  isFetching: boolean;
  fetchedId: number | null;
  hasFetchedNews: boolean;
  tags: Tag[];
  getNews: () => Promise<void>;
  getTags: () => Promise<void>;
  getCurrentNews: (id: number) => Promise<void>;
  createNews: (token: string, body: NewsPayload) => Promise<void>;
  updateNews: (token: string, id: number, body: NewsPayload) => Promise<void>;
  deleteNews: (id: number) => Promise<void>;
};

const applyNews = (item: News) => (state: { news: News[] }) => ({
  currentNews: item,
  news: [item, ...state.news.filter((news) => news.id !== item.id)],
  isLoading: false,
});

const requestNews = async (
  token: string,
  path: string,
  method: string,
  body: Omit<NewsPayload, 'photos' | 'removePhotoIds'> & { photo?: File },
) => {
  const form = new FormData();

  form.append('title', body.title);
  form.append('tag', body.tag);
  form.append('text', body.text);

  if (body.date) {
    form.append('date', body.date);
  }

  if (body.photo) {
    form.append('photo', body.photo);
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.news as News;
};

const deletePhoto = async (token: string, newsId: number, photoId: number) => {
  const response = await fetch(`${API_URL}/api/news/${newsId}/photos/${photoId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Не удалось удалить фото');
  }
};

export const useNewsStore = create<NewsState>()((set) => ({
  news: [],
  currentNews: null,
  isLoading: false,
  isFetching: false,
  fetchedId: null,
  hasFetchedNews: false,
  tags: [],
  getNews: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ news: News[] }>('/api/news');
      set({ news: data.news, isLoading: false, hasFetchedNews: true });
    } catch (e) {
      set({ isLoading: false, hasFetchedNews: true });
      console.log(e);
    }
  },
  getTags: async () => {
    try {
      const data = await apiRequest<{ tags: Tag[] }>('/api/news/tags');
      set({ tags: data.tags });
    } catch (e) {
      console.log(e);
    }
  },
  createNews: async (token, { title, date, tag, text, photos = [] }) => {
    set({ isLoading: true });
    const [first, ...rest] = photos.slice(0, 10);

    try {
      let item = await requestNews(token, '/api/news', 'POST', { title, date, tag, text, photo: first });

      for (const photo of rest) {
        item = await requestNews(token, `/api/news/${item.id}`, 'PATCH', { title, date, tag, text, photo });
      }

      set(applyNews(item));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
  getCurrentNews: async (id) => {
    set({ isFetching: true, fetchedId: id, currentNews: null });

    try {
      const data = await apiRequest<{ news: News }>(`/api/news/${id}`);
      set({ currentNews: data.news, isFetching: false });
    } catch (e) {
      set({ currentNews: null, isFetching: false });
      console.log(e);
    }
  },
  updateNews: async (token, id, { title, date, tag, text, photos = [], removePhotoIds = [] }) => {
    set({ isLoading: true });
    const [first, ...rest] = photos.slice(0, 10);

    try {
      for (const photoId of removePhotoIds) {
        await deletePhoto(token, id, photoId);
      }

      let item = await requestNews(token, `/api/news/${id}`, 'PATCH', { title, date, tag, text, photo: first });

      for (const photo of rest) {
        item = await requestNews(token, `/api/news/${id}`, 'PATCH', { title, date, tag, text, photo });
      }

      set(applyNews(item));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
  deleteNews: async () => {},
}));
