import { startAuthentication } from "@simplewebauthn/browser";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";

import {
  API_WEBAUTHN_AUTH_OPTIONS,
  API_WEBAUTHN_AUTH_VERIFY,
} from "@/utils/api/APIConstant";

export const authenticateWithBiometric = async () => {
  const optionsRes = await getApiWithOutQuery({
    url: API_WEBAUTHN_AUTH_OPTIONS,
  });

  if (!optionsRes?.success) {
    throw new Error(optionsRes?.message || "Biometric not registered");
  }

  const assertion = await startAuthentication(optionsRes.data);

  const verifyRes = await apiPost({
    url: API_WEBAUTHN_AUTH_VERIFY,
    values: assertion,
  });

  if (!verifyRes?.success) {
    throw new Error("Biometric verification failed");
  }

  return true;
};
