import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { song } from '../../utils/constants';

export interface Music {
  playlist: song[];
  currentSong?: song;
  searchTerm?: string;
}

const initialState: Music = {
  currentSong: undefined,
  playlist: [],
};

export const musicSlice = createSlice({
  name: 'Music',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<song[]>) => {
      state.playlist = action.payload;
    },
    setCurrentSong: (state, action: PayloadAction<song | undefined>) => {
      state.currentSong = action.payload;
    },
  },
});

export const { setPlaylist, setCurrentSong, setSearchTerm } =
  musicSlice.actions;

export default musicSlice.reducer;
