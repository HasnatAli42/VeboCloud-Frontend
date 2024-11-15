import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface User {
  first_name: string;
  last_name: string;
  refresh_token: string;
  access_token: string;
  image?: string;
  email: string;
  city?: string;
  country?: string;
  state?: string;
  zipCode?: string;
  gender?: string;
  id: string;
}
export interface Auth {
  loginModalOpen: boolean;
  loggedInTime?: number;
  loginModalMessage?: string;
  signUpModalOpen: boolean;
  forgetPasswordModalOpen: boolean;
  loggedIn: boolean;
  loggedInUser: User | undefined;
}

const initialState: Auth = {
  loggedInTime: undefined,
  loginModalOpen: false,
  forgetPasswordModalOpen: false,
  signUpModalOpen: false,
  loggedIn: false,
  loggedInUser: undefined,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setLoggedInTime: (state) => {
      state.loggedInTime = new Date().getTime();
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      state.loginModalOpen = action.payload;
      state.signUpModalOpen = false;
      state.forgetPasswordModalOpen = false;
    },
    setLoginModalMessage: (state, action: PayloadAction<string>) => {
      state.loginModalMessage = action.payload;
    },
    setSignUpModalOpen: (state, action: PayloadAction<boolean>) => {
      state.signUpModalOpen = action.payload;
      state.loginModalOpen = false;
      state.forgetPasswordModalOpen = false;
    },
    setForgetPasswordModalOpen: (state, action: PayloadAction<boolean>) => {
      state.forgetPasswordModalOpen = action.payload;
      state.signUpModalOpen = false;
      state.loginModalOpen = false;
    },
    setLoggedInUser: (state, action: PayloadAction<User | undefined>) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setLoggedInTime,
  setLoggedInUser,
  setLoginModalOpen,
  setLoginModalMessage,
  setSignUpModalOpen,
  setForgetPasswordModalOpen,
} = authSlice.actions;

export default authSlice.reducer;
