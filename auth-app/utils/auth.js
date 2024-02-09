import axios from "axios";

export async function createUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNUvX6X2PnIEYkC-FuAzbq2KBR4NLsoYc",
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  return response.data.idToken;
}

export async function loginUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNUvX6X2PnIEYkC-FuAzbq2KBR4NLsoYc",
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response.data.idToken;
}
