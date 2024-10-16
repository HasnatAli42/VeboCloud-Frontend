import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface User {
  name: string;
  password: string;
  email: string;
  id: string;
}
export interface Auth {
  loginModalOpen: boolean;
  signUpModalOpen: boolean;
  forgetPasswordModalOpen: boolean;
  loggedIn: boolean;
  loggedInUser: User | undefined;
  users: User[];
}

const initialState: Auth = {
  loginModalOpen: false,
  forgetPasswordModalOpen: false,
  signUpModalOpen: false,
  loggedIn: false,
  loggedInUser: undefined,
  users: [
    {
      name: 'Test User',
      email: 'user@gmail.com',
      password: '12345678',
      id: '1',
    },
  ],
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
    setLoggedInUser: (state, action: PayloadAction<User | undefined>) => {
      state.loggedInUser = action.payload;
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const {
  setLoggedIn,
  setLoggedInUser,
  addNewUser,
  setLoginModalOpen,
  setSignUpModalOpen,
  setForgetPasswordModalOpen,
} = authSlice.actions;

export default authSlice.reducer;
