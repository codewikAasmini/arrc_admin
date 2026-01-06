import ShowToast from "@/components/Common/ShowToast";
import defaultAxios from "../api/axios";

interface PageResponse {
  results: any[];
  hasMore: boolean;
}

interface ApiParams {
  url: string;
  page?: number;
  searchText?: string;
  rowsPerPage?: number;
}

interface ApiParamsQuery {
  url: string;
  params?: string;
}

interface postParams {
  url: string;
  values: any;
}

export const getApiWithOutQuery = async ({ url }: ApiParams): Promise<any> => {
  try {
    const res = await defaultAxios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getApi = async ({
  url,
  page,
  searchText,
  rowsPerPage,
}: ApiParams): Promise<any> => {
  try {
    const res = await defaultAxios.get(
      url +
        "?page=" +
        page +
        "&rowsPerPage=" +
        rowsPerPage +
        "&q=" +
        searchText,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getApiByParams = async ({
  url,
  params,
}: ApiParamsQuery): Promise<any> => {
  try {
    const res = await defaultAxios.get(url + "/" + params, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const apiPost = async ({ url, values }: postParams): Promise<any> => {
  try {
    const res = await defaultAxios.post(url, values, {
      headers: {
        Accept: "application/json",
      },
    });
    // ShowToast(res.data?.message, "success");
    return res.data;
  } catch (err: any) {
    ShowToast(err?.response?.data?.error, "error");
    return err?.response?.data;
  }
};

export const apiDelete = async ({
  url,
  params,
}: ApiParamsQuery): Promise<any> => {
  try {
    const res = await defaultAxios.delete(url + "/" + params, {
      headers: {
        Accept: "application/json",
      },
    });
    ShowToast(res.data?.message, "success");
    return res.data;
  } catch (err: any) {
    ShowToast(err?.response?.data?.error, "error");
    return err?.response?.data;
  }
};

export const apiPostWithMultiForm = async ({
  url,
  values,
}: postParams): Promise<any> => {
  try {
    const res = await defaultAxios.post(url, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    // ShowToast(res.data?.message, "success");
    return res.data;
  } catch (err: any) {
    ShowToast(err?.response?.data?.error, "error");
    return err?.response?.data;
  }
};

type FilterApiParams = {
  url: string;
  page?: number;
  searchText?: string;
  rowsPerPage?: number;
  [key: string]: any; 
};

export const getFilterApi = async ({
  url,
  page,
  searchText,
  rowsPerPage,
  ...filters
}: FilterApiParams): Promise<any> => {
  try {

    const queryParams = new URLSearchParams();

    if (page !== undefined) queryParams.append("page", String(page));
    if (rowsPerPage !== undefined) queryParams.append("rowsPerPage", String(rowsPerPage));
    if (searchText !== undefined) queryParams.append("q", searchText);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        queryParams.append(key, String(value));
      }
    });

    const fullUrl = `${url}?${queryParams.toString()}`;

    const res = await defaultAxios.get(fullUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const downloadFile = async (url: string): Promise<Blob | null> => {
  try {
    const res = await defaultAxios.get(url, {
      responseType: "blob",
    });
    return res.data;
  } catch (error: any) {
    ShowToast("Failed to download file", "error");
    return null;
  }
};