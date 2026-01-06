import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  isSuccessful: boolean;
  error: null | string;
  user: UserData;
  token: null | string;
  isAuthenticated: boolean;
}

interface UserData {
  token?: string;
  email?: string;
  fullName?: string;
  role?: string;
  profile?: string;
  isVerified?: boolean;
  isApproved?: boolean;
}

const initialState: AuthState = {
  loading: false,
  isSuccessful: false,
  error: null,
  user: {},
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLoginRequest(state) {
      state.loading = true;
    },
    onLoginSuccess(state, action: PayloadAction<{ data: any }>) {
      state.loading = false;
      state.user = action.payload.data?.user;
      state.token = action.payload.data.token || null;
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<UserData>) {   
      state.user = { ...state.user, ...action.payload };
    },
    onEditProfileSuccess(state, action: PayloadAction<{ data: UserData }>) {
      state.loading = false;
      state.user.profile = action.payload.data.profile || "";
      state.user.fullName = action.payload.data.fullName || "";
    },
    onLoginFailed(state) {
      state.loading = false;
    },
    onLogoutSuccess(state) {
    state.loading = false;
    state.isAuthenticated = false;
    localStorage.removeItem("persist:root");
    state.token = null;         
    state.user = {};            
    }

  },
});

export const {
  onLoginRequest,
  onLoginSuccess,
  onLoginFailed,
  onEditProfileSuccess,
  onLogoutSuccess,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
