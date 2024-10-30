import { useQuery } from 'react-query';
import { store } from '../redux/store/store';
import queryKeys from '../utils/queryKeys';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../environment/environment';
import {
  genre,
  googleLoginResponse,
  loginResponse,
  song,
} from '../utils/constants';
import { handleSetUserAndLogin } from '../redux/actions/auth';

export const useGetSongs = () => {
  return useQuery(
    queryKeys.getAllSongsKey(),
    async () => {
      const resp = await axios.get(environment.VITE_BACKEND_URL + '/songs/');
      return resp.data.data as song[];
    },
    {
      onError: (error: Error & { status: number }) => {
        console.error('Error fetching songs:', error);
      },
      staleTime: 60000,
    }
  );
};

export const useGetGenres = () => {
  return useQuery(
    queryKeys.getAllGenresKey(),
    async () => {
      const resp = await axios.get(environment.VITE_BACKEND_URL + '/genres/');
      return (resp?.data?.data || []) as genre[];
    },
    {
      onError: (error: Error & { status: number }) => {
        console.error('Error fetching genres:', error);
      },
      staleTime: 60000,
    }
  );
};

export const handleGoogleLoginData = (response: AxiosResponse) => {
  const {
    user: { first_name, last_name, email, id, image },
    refresh_token,
    access_token,
  } = response.data.data as googleLoginResponse;
  store.dispatch(
    handleSetUserAndLogin({
      first_name,
      last_name,
      refresh_token,
      access_token,
      image,
      email,
      id,
    })
  );
};
export const handleLoginData = (response: AxiosResponse) => {
  if (response.data?.data) {
    const {
      first_name,
      last_name,
      refresh_token,
      access_token,
      image,
      email,
      id,
    } = response.data.data as loginResponse;
    store.dispatch(
      handleSetUserAndLogin({
        first_name,
        last_name,
        refresh_token,
        access_token,
        image,
        email,
        id,
      })
    );
  }
};
