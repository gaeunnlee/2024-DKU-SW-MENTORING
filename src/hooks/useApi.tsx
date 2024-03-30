import axios from 'axios';
import React from 'react';
import { API_URL } from '../data/constant';

const client = axios.create({
   baseURL: API_URL,
});

export const useApi = () => {
   const post = async ({ api, body, type, auth }: { api: string; body: unknown; type?: string; auth?: boolean }) => {
      const { data } = await client.post(api, body, {
         headers: {
            'Content-Type': type === undefined ? 'application/json' : type,
            Authorization: auth ? `Bearer ${localStorage.getItem('accessToken')}` : null,
         },
      });
      return data;
   };

   const get = async ({ api, auth }: { api: string; auth?: boolean }) => {
      const { data } = await client.get(api, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: auth ? `Bearer ${localStorage.getItem('accessToken')}` : null,
         },
      });
      return data;
   };

   const patch = async ({ api, body, type, auth }: { api: string; body?: unknown; type?: string; auth?: boolean }) => {
      const { data } = await client.patch(api, body, {
         headers: {
            'Content-Type': type === undefined ? 'application/json' : type,
            Authorization: auth ? `Bearer ${localStorage.getItem('accessToken')}` : null,
         },
      });
      return data;
   };

   return { post, get, patch };
};
