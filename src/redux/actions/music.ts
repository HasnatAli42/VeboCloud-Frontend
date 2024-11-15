import { song } from '../../utils/constants';
import {
  setCurrentSong,
  setPlaylist,
  setSearchTerm,
} from '../slices/musicSlice';
import { AppDispatch } from '../store/store';

export const handleSearchTerm = (search: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setSearchTerm(search));
  };
};

export const handleSetCurrentSong = (song?: song) => {
  return (dispatch: AppDispatch) => {
    dispatch(setCurrentSong(song));
  };
};

export const handlePlaySong = (list: song[], song?: song) => {
  return (dispatch: AppDispatch) => {
    dispatch(setPlaylist(list));
    dispatch(setCurrentSong(song));
  };
};
