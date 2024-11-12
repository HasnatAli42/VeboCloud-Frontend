import { song } from '../../utils/constants';
import { setCurrentSong, setPlaylist } from '../slices/musicSlice';
import { AppDispatch } from '../store/store';

export const handlePlaySong = (list: song[], song?: song) => {
  return (dispatch: AppDispatch) => {
    dispatch(setPlaylist(list));
    dispatch(setCurrentSong(song));
  };
};
