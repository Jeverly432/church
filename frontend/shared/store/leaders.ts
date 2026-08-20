'use client';

import { create } from 'zustand';
import { apiRequest, API_URL } from '../api/client';

export type LeaderPhoto = {
  id: number;
  url: string;
};

export type Leader = {
  id: number;
  slug: string;
  name: string;
  title: string;
  bioTitle: string;
  bio: string[];
  portrait: string | null;
  photos: LeaderPhoto[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type LeaderPayload = {
  name: string;
  title: string;
  slug: string;
  bioTitle: string;
  bio: string;
  portrait?: File;
  photos?: File[];
  removePhotoIds?: number[];
};

type LeadersState = {
  leaders: Leader[];
  currentLeader: Leader | null;
  isLoading: boolean;
  isFetching: boolean;
  fetchedId: number | string | null;
  hasFetchedLeaders: boolean;
  fetchLeaders: () => Promise<void>;
  getLeader: (id: number | string) => Promise<void>;
  createLeader: (token: string, body: LeaderPayload) => Promise<void>;
  updateLeader: (token: string, id: number | string, body: LeaderPayload) => Promise<void>;
};

const applyLeader = (item: Leader) => (state: { leaders: Leader[] }) => ({
  currentLeader: item,
  leaders: [...state.leaders.filter((leader) => leader.id !== item.id), item].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.id - b.id,
  ),
  isLoading: false,
});

const requestLeader = async (
  token: string,
  path: string,
  method: string,
  body: Omit<LeaderPayload, 'photos' | 'removePhotoIds'> & { photo?: File },
) => {
  const form = new FormData();

  form.append('name', body.name);
  form.append('title', body.title);
  form.append('slug', body.slug);
  form.append('bioTitle', body.bioTitle);
  form.append('bio', body.bio);

  if (body.portrait) {
    form.append('portrait', body.portrait);
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

  return data.leader as Leader;
};

const deletePhoto = async (token: string, leaderId: number | string, photoId: number) => {
  const response = await fetch(`${API_URL}/api/leaders/${leaderId}/photos/${photoId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Не удалось удалить фото');
  }
};

export const useLeadersStore = create<LeadersState>()((set) => ({
  leaders: [],
  currentLeader: null,
  isLoading: false,
  isFetching: false,
  fetchedId: null,
  hasFetchedLeaders: false,
  fetchLeaders: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ leaders: Leader[] }>('/api/leaders');
      set({ leaders: data.leaders, isLoading: false, hasFetchedLeaders: true });
    } catch (e) {
      set({ isLoading: false, hasFetchedLeaders: true });
      console.log(e);
    }
  },
  getLeader: async (id) => {
    set({ isFetching: true, fetchedId: id, currentLeader: null });

    try {
      const data = await apiRequest<{ leader: Leader }>(`/api/leaders/${id}`);
      set({ currentLeader: data.leader, isFetching: false });
    } catch (e) {
      set({ currentLeader: null, isFetching: false });
      console.log(e);
    }
  },
  createLeader: async (token, { photos = [], ...body }) => {
    set({ isLoading: true });
    const [first, ...rest] = photos.slice(0, 10);

    try {
      let item = await requestLeader(token, '/api/leaders', 'POST', { ...body, photo: first });

      for (const photo of rest) {
        item = await requestLeader(token, `/api/leaders/${item.id}`, 'PATCH', { ...body, photo });
      }

      set(applyLeader(item));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
  updateLeader: async (token, id, { photos = [], removePhotoIds = [], ...body }) => {
    set({ isLoading: true });
    const [first, ...rest] = photos.slice(0, 10);

    try {
      for (const photoId of removePhotoIds) {
        await deletePhoto(token, id, photoId);
      }

      let item = await requestLeader(token, `/api/leaders/${id}`, 'PATCH', { ...body, photo: first });

      for (const photo of rest) {
        item = await requestLeader(token, `/api/leaders/${id}`, 'PATCH', { ...body, photo });
      }

      set(applyLeader(item));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
}));
