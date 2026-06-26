import axios from "axios";

import { env } from "../config/env";

// All HTTP calls should go through this client. Interceptors for JWT refresh,
// request IDs and error normalization belong here, not inside UI components.
export const httpClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
