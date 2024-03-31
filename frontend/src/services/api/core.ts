import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  validateStatus: (status: number) => {
    return status >= 200 && status < 400;
  },
});

function changeClientBearerToken(token: string | null) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export { client, changeClientBearerToken };
