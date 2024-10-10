import {
  setForgetPasswordModalOpen,
  setLoginModalOpen,
  setSignUpModalOpen,
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
