import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function CreateEventsApi(data) {
  const url = `${API_HOST}/events`;

  const dataTemp = {
    ...data,
    phone: parseInt(data.phone),
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(dataTemp),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
