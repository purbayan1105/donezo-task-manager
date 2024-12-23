import axios from "axios";

export async function signUpFn(signUpData: any) {
  const response = await axios.post("/api/signupapi", signUpData);
  return response.data;
}
