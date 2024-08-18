
import { useQuery } from "react-query";
import axios from "axios";

const URL = '';

export const useGetCar = (id: string) => {
  return useQuery(
    ["car", parseInt(id)],
    () => axios.get(`${URL}/api/cars/${id}`),
    {
      select: ({ data }) => data,
    } 
  );
}

export function useLocalStorage(key: string) {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  return { setItem, getItem }
}
