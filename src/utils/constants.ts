export const defaultSongImage =
  'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-pair-of-headphones-on-the-water-at-nighttime-image_2931863.jpg';
export interface loginResponse {
  first_name: string;
  last_name: string;
  refresh_token: string;
  access_token: string;
  image: string;
  email: string;
  id: string;
}
export interface googleLoginResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    image?: string;
  };
  access_token: string;
  refresh_token: string;
}
export interface song {
  id: number;
  title: string;
  image?: string;
  artist?: {
    id: number;
    user: {
      id: number;
      email: string;
    };
    bio: string;
    profile_picture: string;
    social_media_links: string;
    verified: boolean;
  };
  album?: {
    id: number;
    title: string;
    release_date: string;
    cover_art: string;
  };
  genre?: {
    name: string;
    description: string;
  };
  upload_date: string;
  file: string;
  length: string;
}

export interface genre {
  id: number;
  name: string;
  description: string;
}
