export const API_ADMIN_LOGIN = "/admin/auth/login";
export const API_ADMIN_LOGOUT = "/admin/auth/logout";
export const API_GET_PROFILE: string = "/auth/profile";
export const API_FORGOT_PASSWORD: string = "/auth/forgot-password";
export const API_CHANGE_PASSWORD: string = "/auth/changePassword";
export const API_EDIT_PROFILE: string = "/auth/edit-profile";
export const API_USER_List: string = "/users";
export const API_USER_DETAILS: string = "/users/details";

// categories/all-categories
export const API_GET_ALL_CATEGORY= "/categories/all-categories";
export const API_GET_CATEGORY_BY_ID = "/category-items/list"; 
export const API_UPDATE_CATEGORY = "/categories/category-update";
export const API_DELETE_CATEGORY = "/categories/category-delete";
export const API_CREATE_CATEGORY = "/categories/create-category";


// ===================== CATEGORY ITEMS =====================

export const API_GET_ALL_CATEGORY_ITEMS = "/category-items/list";
export const API_CREATE_CATEGORY_ITEM = "/category-items/create";
export const API_UPDATE_CATEGORY_ITEM =
  "/category-items/category-item-update";
export const API_DELETE_CATEGORY_ITEM =
  "/category-items/category-item-delete";

export const API_GET_ALL_USERS = "/admin/auth/users";
export const API_USER_STATUS_UPDATE = (id: string) => `/admin/auth/users/${id}/status`;

