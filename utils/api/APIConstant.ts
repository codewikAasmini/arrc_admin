export const API_LOGOUT: string = "/auth/logout";
export const API_LOGIN: string = "/auth/login";
export const API_GET_PROFILE: string = "/auth/profile";
export const API_REGISTER: string = "/auth/register";
export const API_OTP_VERIFICATION: string = "/auth/otp-verified";
export const API_OTP_RESEND: string = "/auth/otp-resend";

export const API_FORGOT_PASSWORD: string = "/auth/forgot-password";
export const API_CHANGE_PASSWORD: string = "/auth/changePassword";
export const API_EDIT_PROFILE: string = "/auth/edit-profile";
export const API_USER_List: string = "/users";
export const API_USER_DETAILS: string = "/users/details";
export const API_USER_MEDIA_FILE: string = "/get-media-files";

//faq
export const API_FAQS_LIST: string = "admin/faq/all";

//contact
export const API_CREATE_CONTACTUS: string = "admin/createcontact"; 


// member card
export const API_MEMBER_CARD: string = "/member-card/get-memebercard";

export const API_MEMBER_CARD_DOWNLOAD: string = "/member-card/file";

// // tvm/calculate
export const API_TVM_CALCULATE: string = "/tvm/calculate";

// plaid
export const API_PLAID_CREATE_LINK_TOKEN = "/plaid/create-link-token";
export const API_PLAID_EXCHANGE_TOKEN = "/plaid/exchange-token";
export const API_PLAID_ACCOUNTS = "/plaid/accounts";
export const API_PLAID_ACCOUNT_DELETE = "/plaid/disconnect";



export const API_PLAID_TRANSACTIONS_SYNC= "/plaid/transactions/sync";
export const API_PLAID_TRANSACTIONS_DETAILS = "/plaid/transactions";


// stripe
export const API_STRIPE_CONNECT_BANK = "/stripe/connect-bank";
export const API_STRIPE_FUND_BALANCE = "/stripe/fund";
export const API_STRIPE_CREATE_CARD = "/issuing/virtual-card";
export const API_CREATE_VIRTUAL_CARD = "/issuing/virtual-card";

export const API_PORTFOLIO_SUMMARY= "/portfolio/summary";
export const API_PORTFOLIO_GET= "/portfolio/get-portfolio";
export const API_SPENDING_INSIGHTS = "/portfolio/spending-insights";


export const API_REWARD_CONVERT= "/rewards/convert";
export const API_REWARD_RECENT = "/rewards/recent";


// categories/all-categories
export const API_GET_ALL_CATEGORY= "categories/all-categories";
export const API_GET_CATEGORY_BY_ID = "category-items/list"; 

export const API_GET_FINANCIAL_ADVISOR = "/ai/financial-advisor"; 

export const API_WEBAUTHN_AUTH_OPTIONS = "/webauthn/auth-options";
export const API_WEBAUTHN_AUTH_VERIFY = "/webauthn/auth-verify";


