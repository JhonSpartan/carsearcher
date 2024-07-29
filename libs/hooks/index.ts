
import { useMutation, useQuery, useQueryClient } from "react-query";
import AppFetcher from '@/libs/fetcher';
import { carEditProps, carProps, NotifyData, Options, SearchResults } from "@/types";

export const useSearchOptions = () => {
  return useQuery(
    ["searchOptions"],
    () => AppFetcher.getSearchOptions(),
    {
      select: ({ data }) => data,
    }
  );
}

export const useUpdateSearchOptions = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (options: Options) => AppFetcher.updateSearchOptions(options),
    onSettled: async(_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['searchOptions'] });
      }
    },
  });
}

export const useCars = () => {
  return useQuery(
    ["cars"],
    () => AppFetcher.getCars(),
    {
      select: ({ data }) => data,
    }
  );
}

export const useGetCar = (id: string) => {
  return useQuery(
    ["car", parseInt(id)],
    () => AppFetcher.getCar(id),
    {
      select: ({ data }) => data,
    } 
  );
}

export function useCreateCar(setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (car: carProps) => AppFetcher.createCar(car),
    onMutate: () => {
      console.log("mutate");
    },

    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
      
      
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cars"] });
        setNotify({
          isOpen: true,
          message: 'New car successfully added',
          type: 'success'
        });
      }
    },
  });
}

export const useUpdateCar = (setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (car: carEditProps) => AppFetcher.updateCar(car),
    onSettled: async(_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['cars'] });
        setNotify({
          isOpen: true,
          message: 'Car successfully edited',
          type: 'success'
        })
      }
    },
  });
}

export function useDeleteCar(setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AppFetcher.deleteCar(id),
  
    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cars"] });
        setNotify({
          isOpen: true,
          message: 'Car successfully deleted',
          type: 'success'
        })
      }
      
    },
  });
}

export const useGetSearchResults = () => {
  return useQuery(
    ["results"],
    () => AppFetcher.getSearchResults(),
    {
      select: ({ data }) => data,
    }
  );
}

export function useCreateSearchResults(setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (results: SearchResults) => AppFetcher.createSearchResult(results),
    onMutate: () => {
      console.log("mutate");
    },

    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["results"] });
        setNotify({
          isOpen: true,
          message: 'New search result added. Check your email',
          type: 'success'
        });
      }
    },
  });
}

export const useUpdateSearchResult = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (results: SearchResults) => AppFetcher.updateSearchResult(results),
    onSettled: async(_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['results'] });
      }
    },
  });
}

export function useDeleteSearchResult(setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AppFetcher.deleteSearchResult(id),
  
    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["results"] });
        setNotify({
          isOpen: true,
          message: 'Search result successfully deleted',
          type: 'success'
        })
      }
    },
  });
}


export const useGetGraphData = () => {
  return useQuery(
    ["graphData"],
    () => AppFetcher.getGraphData(),
    {
      select: ({ data }) => data.graphData
    }
    
  );
}

export function useCreateGraphData() {
  
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (graphData: number) => AppFetcher.createGraphData(graphData),
    onMutate: () => {
      console.log("mutate");
    },

    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["graphData"] });
      }
    },
  });
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
