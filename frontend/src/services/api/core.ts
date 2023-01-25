import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.0.158:3000",
  validateStatus: (status: number) => {
    return status >= 200 && status < 400;
  },
});

function changeClientBearerToken(token: string | null) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export { client, changeClientBearerToken };
