import { API_HOST } from "../utils/constants";
export function signUpApi(user) {
  const url = `${API_HOST}/sign-ins`;
  const userTemp = {
    ...user,
    email: user.email.toLowerCase(),
    birthDate: new Date(),
  };
  delete userTemp.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Email not Disponible" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
