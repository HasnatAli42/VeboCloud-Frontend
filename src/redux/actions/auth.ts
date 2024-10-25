import {
  setForgetPasswordModalOpen,
  setLoggedIn,
  setLoggedInUser,
  setLoginModalOpen,
  setSignUpModalOpen,
  User,
} from '../slices/authSlice';
import { AppDispatch } from '../store/store';

export const handleSetLoginModalOpen = (open: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoginModalOpen(open));
  };
};
export const handleSetSignUpModalOpen = (open: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(setSignUpModalOpen(open));
  };
};
export const handleForgetPasswordModalOpen = (open: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(setForgetPasswordModalOpen(open));
  };
};
export const handleCreateUser = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch(handleSetLoginModalOpen(true));
  };
};
export const handleSetUserAndLogin = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch(handleSetSignUpModalOpen(false));
    dispatch(setLoggedInUser(user));
    dispatch(setLoggedIn(true));
  };
};
export const handleLogout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoggedInUser(undefined));
    dispatch(setLoggedIn(false));
  };
};
