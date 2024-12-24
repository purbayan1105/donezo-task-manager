import axios from "axios";

export async function signUpFn(signUpData: any) {
  const response = await axios.post("/api/signupapi", signUpData);
  return response.data;
}

export async function addVerificationCodeFn({ email, code }: any) {
  const response = await axios.post("/api/signupapi/verifyapi", {
    email,
    code,
  });

  return response.data;
}
