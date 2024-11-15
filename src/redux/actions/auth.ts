import {
  setForgetPasswordModalOpen,
  setLoggedIn,
  setLoggedInTime,
  setLoggedInUser,
  setLoginModalMessage,
  setLoginModalOpen,
  setSignUpModalOpen,
  User,
} from '../slices/authSlice';
import { AppDispatch } from '../store/store';
export const handleStatesOnRefresh = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoginModalOpen(false));
    dispatch(setSignUpModalOpen(false));
    dispatch(setForgetPasswordModalOpen(false));
    dispatch(setLoginModalMessage(''));
  };
};
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
export const handleCreateUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch(handleSetLoginModalOpen(true));
  };
};
export const handleSetUserAndLogin = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch(handleSetSignUpModalOpen(false));
    dispatch(setLoggedInUser(user));
    dispatch(setLoggedIn(true));
    dispatch(setLoggedInTime());
  };
};
export const handleLogout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoggedInUser(undefined));
    dispatch(setLoggedIn(false));
  };
};
