import axios from 'axios';
import { API_URL } from '../data/constant';

export const getMission = async (id: number) => {
   const { data } = await axios.get(API_URL + `/mission/${id}`, {
      headers: {
         'Content-Type': 'application/json',
      },
   });
   return data;
};
