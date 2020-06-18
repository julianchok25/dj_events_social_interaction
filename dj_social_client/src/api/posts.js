import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function addPostApi(message) {
  const url = `${API_HOST}/personal-posts`;

  const data = {
    message,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Post Submit" };
      }
      return { code: 500, message: "Error in Server" };
    })
    .catch((err) => {
      return err;
    });
}

export function getPostApi(idUser, page) {
  const url = `${API_HOST}/read-posts?id=${idUser}&page=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}

export function getPostHomeApi(page = 1) {
  const url = `${API_HOST}/public-posts?page=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
