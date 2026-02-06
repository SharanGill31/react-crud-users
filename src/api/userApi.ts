import api from './index';
import type { User } from '../types/user';

export const getUsers = async () => {
  try {
    const res = await api.get<User[]>('/users');
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

export const createUser = async (user: Partial<User>) => {
  try {
    const res = await api.post<User>('/users', user);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to create user' };
  }
};

export const updateUser = async (id: string, user: Partial<User>) => {
  try {
    const res = await api.put<User>(`/users/${id}`, user);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to update user' };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to delete user' };
  }
};
