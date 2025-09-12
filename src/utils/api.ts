import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

export const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
export const DEV = `https://temp.dev`;
export const PRODUCT = `https://temp.dev`;
export const DOMAIN = isProd ? PRODUCT : DEV;
export const API = `${DOMAIN}/api`;

const instance = axios.create({
  baseURL: API,
  timeout: 80000,
});

export const GET = async (
  entry: string,
  payload?: { params?: any; bodyData?: any; signal?: AbortController }
) => {
  const AUTH_TOKEN = getCookie('accessToken');

  try {
    const data = await instance({
      method: 'GET',
      url: entry,
      signal: payload?.signal?.signal,
      params: payload?.params,
      data: payload?.bodyData,
      headers: AUTH_TOKEN
        ? {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          }
        : {},
    });

    return data.data;
  } catch (error: any) {
    const code = error.response.status;
    if (code === 403 || code === 401) {
      // alert('로그인 후 이용해 주세요')
      console.error(error);
      if (typeof window !== 'undefined') {
        deleteCookie('accessToken');
        sessionStorage.setItem('prevUrl', window.location.href);
        window.location.replace('/login');
      }
    }
    throw error;
  }
};

export const POST = async (
  entry: string,
  payload?: { bodyData?: any; signal?: AbortController }
) => {
  const AUTH_TOKEN = getCookie('accessToken');

  try {
    const data = await instance({
      url: entry,
      method: 'POST',
      signal: payload?.signal?.signal ?? undefined,
      data: payload?.bodyData,
      headers: AUTH_TOKEN
        ? {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          }
        : {},
    });
    return data.data;
  } catch (error: any) {
    const code = error?.response?.status;
    if (code === 403 || code === 401) {
      // alert('로그인 후 이용해 주세요')
      if (typeof window !== 'undefined') {
        deleteCookie('accessToken');
        window.location.href = '/login';
      }
    }
    throw error;
  }
};

export const DELETE = async (
  entry: string,
  payload?: { params?: any; bodyData?: any; signal?: AbortController }
) => {
  const AUTH_TOKEN = getCookie('accessToken');

  try {
    const res = await instance({
      url: entry,
      method: 'DELETE',
      params: payload?.params,
      signal: payload?.signal?.signal,
      data: payload?.bodyData,
      headers: AUTH_TOKEN
        ? {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          }
        : {},
    });
    return res;
  } catch (error: any) {
    const code = error?.response?.status;
    if (code === 403 || code === 401) {
      // alert('로그인 후 이용해 주세요')
      if (typeof window !== 'undefined') {
        deleteCookie('accessToken');
        window.location.href = '/login';
      }
    }
    throw error;
  }
};

export const PATCH = async (
  entry: string,
  payload?: { bodyData?: any; signal?: AbortController }
) => {
  const AUTH_TOKEN = getCookie('accessToken');

  try {
    const res = await instance({
      url: entry,
      method: 'PATCH',
      data: payload?.bodyData,
      signal: payload?.signal?.signal,
      headers: AUTH_TOKEN
        ? {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          }
        : {},
    });
    return res.data;
  } catch (error: any) {
    const code = error?.response?.status;
    if (code === 403 || code === 401) {
      // alert('로그인 후 이용해 주세요')
      if (typeof window !== 'undefined') {
        deleteCookie('accessToken');
        window.location.href = '/login';
      }
    }
    throw error;
  }
};

export const PUT = async (
  entry: string,
  payload?: { params?: any; bodyData?: any }
) => {
  const AUTH_TOKEN = getCookie('accessToken');

  try {
    const res = await instance({
      url: entry,
      method: 'PUT',
      data: payload?.bodyData,
      params: payload?.params,
      headers: AUTH_TOKEN
        ? {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          }
        : {},
    });
    return res.data;
  } catch (error: any) {
    const code = error?.response?.status;
    if (code === 403 || code === 401) {
      // alert('로그인 후 이용해 주세요')
      if (typeof window !== 'undefined') {
        deleteCookie('accessToken');
        window.location.href = '/login';
      }
    }
    throw error;
  }
};
