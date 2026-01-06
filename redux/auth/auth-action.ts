import axios from "../../utils/api/axios";
import {
  API_CHANGE_PASSWORD,
  API_EDIT_PROFILE,
  API_LOGIN,
  API_LOGOUT,
  API_REGISTER,
  API_GET_PROFILE
} from "@/utils/api/APIConstant";
import {
  onEditProfileSuccess,
  onLoginFailed,
  onLoginRequest,
  onLoginSuccess,
  onLogoutSuccess,
  setUser,
} from "./authSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";
import ShowToast from "@/components/Common/ShowToast";

interface LoginParams {
  values: any;
  navigate: any;
  dispatch: any;
}

export const LoginUser = createAsyncThunk(
  "login",
  async ({ values, navigate, dispatch }: LoginParams) => {
    try {
      dispatch(onLoginRequest());
      const res = await axios.request({
        method: "POST",
        url: API_LOGIN,
        headers: {
          Accept: "application/json",
        },
        data: values,
      });
      if (res.data?.success) {

        dispatch(onLoginSuccess(res.data));
        const u = res.data?.data?.user;
        const role = u?.role;
        const verified = u?.isVerified && u?.isApproved === true;

        if (role === "USER") navigate.push("/");
       
        // navigate.push("/Dashboard");
        ShowToast("Login Successfully !!", "success");
      } else {
        dispatch(onLoginFailed());
        ShowToast(res.data?.error, "error");
      }
      return res.data;
    } catch (err: any) {
      dispatch(onLoginFailed());
      ShowToast(err?.response?.data?.error, "error");
      return err?.response?.data;
    }
  }
);


export const refreshMe = createAsyncThunk(
  "auth/refreshMe",
  async (_, { dispatch, getState }) => {
    const state: any = getState();
    const token = state.auth.token;

    const res = await axios.request({
      method: "GET",
      url: API_GET_PROFILE,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (res.data?.success) {
      const payloadUser = res.data?.data?.user ?? res.data?.data;
      dispatch(setUser(payloadUser));
    }
    return res.data;
  }
);

interface LogoutParams {
  dispatch: any;
  navigate: any;
}

export const userLogout = createAsyncThunk("logout", async ({ dispatch, navigate }: LogoutParams) => {
  try {
    const res = await axios.request({
      method: "get",
      url: API_LOGOUT,
    });
    dispatch(onLogoutSuccess());
    navigate.push("/");
    ShowToast("Logout Successfully !!", "success");
    return res.data;
  } catch (err: any) {
    dispatch(onLogoutSuccess());
    if (err.response && err.response.status === 404) {
      ShowToast(err.message, "error");
    } else {
      ShowToast(err?.response?.data?.error, "error");
      return err.response.data;
    }
  }
}
);

export const changePassword = createAsyncThunk(
  "change-password",
  async ({ values, navigate }: any) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: API_CHANGE_PASSWORD,
        headers: {
          Accept: "application/json",
        },
        data: values,
      });
      console.log(res);
      if (res.data.success) {
        ShowToast("Password changed Successfully !!", "success");

        if (res.data?.data?.role) {

          const role = res.data.data.role;
          if (role === "USER" || role === "OWNER") navigate.push("/Dashboard");
        }
      } else {
        ShowToast(res.data.error, "error");
      }

      return res.data;
    } catch (err: any) {
      ShowToast(err?.response?.data?.error, "error");
      return err?.response?.data;
    }
  }
);

export const editProfile = createAsyncThunk(
  "edit-profile",
  async ({ values, dispatch }: LoginParams) => {
    try {
      const res = await axios.request({
        method: "PUT",
        url: API_EDIT_PROFILE,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: values,
      });
      dispatch(onEditProfileSuccess(res.data));
      ShowToast(res.data?.message, "success");
      return res.data;
    } catch (err: any) {
      ShowToast(err?.response?.data?.error, "error");
      return err?.response?.data;
    }
  }
);

interface RegisterParams {
  values: any,
  navigate: any;
  dispatch: any;
}
export const RegisterUser = createAsyncThunk(
  "register",
  async ({ values, navigate, dispatch }: RegisterParams) => {
    try {

    } catch (err: any) {
      ShowToast(err?.response?.data?.error, "error");
      return err?.response?.data;
    }
  }
);