const getAllSongsKey = () => `getSongs`;
const getAllGenresKey = () => `getGenres`;
const getProfileKey = (token?: string) => `getGenres-${token}`;

export default {
  getAllSongsKey,
  getAllGenresKey,
  getProfileKey,
};
