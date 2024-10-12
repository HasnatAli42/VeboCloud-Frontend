import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Auth {
  loginModalOpen: boolean;
  signUpModalOpen: boolean;
  forgetPasswordModalOpen: boolean;
  loggedIn: boolean;
  userEmail: string;
}

const initialState: Auth = {
  loginModalOpen: false,
  forgetPasswordModalOpen: false,
  signUpModalOpen: false,
  loggedIn: false,
  userEmail: '',
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
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setUserEmail,
  setLoginModalOpen,
  setSignUpModalOpen,
  setForgetPasswordModalOpen
} = authSlice.actions;

export default authSlice.reducer;
