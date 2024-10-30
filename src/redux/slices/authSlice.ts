import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface User {
  first_name: string;
  last_name: string;
  refresh_token: string;
  access_token: string;
  image?: string;
  email: string;
  id: string;
}
export interface Auth {
  loginModalOpen: boolean;
  loginModalMessage?: string;
  signUpModalOpen: boolean;
  forgetPasswordModalOpen: boolean;
  loggedIn: boolean;
  loggedInUser: User | undefined;
}

const initialState: Auth = {
  loginModalOpen: false,
  forgetPasswordModalOpen: false,
  signUpModalOpen: false,
  loggedIn: false,
  loggedInUser: undefined,
};

export const authSlice = createSlice({
  name: 'Jobs',
  initialState,
  reducers: {
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
  setLoggedInUser,
  setLoginModalOpen,
  setLoginModalMessage,
  setSignUpModalOpen,
  setForgetPasswordModalOpen,
} = authSlice.actions;

export default authSlice.reducer;
