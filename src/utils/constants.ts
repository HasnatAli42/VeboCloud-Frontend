export const defaultSongImage =
  'https://res.cloudinary.com/junaidbukhari/image/upload/v1731688023/vebo/pngtree-pair-of-headphones-on-the-water-at-nighttime-image_2931863_yhmsw3.jpg';
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

export interface songArtist {
  id: number;
  follower_count: number;
  full_name: string;
  cover_photo: string;
  user: {
    id: number;
    email: string;
  };
  bio: string;
  profile_picture: string;
  social_media_links: string;
  verified: boolean;
}
export interface song {
  id: number;
  title: string;
  image?: string;
  artist?: songArtist;
  like_count: number;
  album?: {
    id: number;
    title: string;
    release_date: string;
    cover_art: string;
  };
  genre?: {
    id: number;
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

export interface profile {
  followed_artists: number[];
  liked_songs: number[];
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  gender: string;
  image: string;
  cover_photo: string;
  status: boolean;
  is_active: boolean;
  is_verified: boolean;
  is_card_attached: string;
  stripe_customer_id: string;
  created_at: string;
  updated_at: string;
}
