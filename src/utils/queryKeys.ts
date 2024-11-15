const getAllSongsKey = (search?: string) => `getSongs-${search}`;
const getAllGenresKey = (search?: string) => `getGenres-${search}`;
const getProfileKey = (token?: string) => `getGenres-${token}`;

export default {
  getAllSongsKey,
  getAllGenresKey,
  getProfileKey,
};
