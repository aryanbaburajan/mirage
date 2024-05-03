export async function verifyToken(token: string) {
  // const params = new URLSearchParams();
  // params.append("secret", process.env.RECAPTCHA_SECRET_KEY!);
  // params.append("response", token);

  // const response = await fetch(
  //   "https://www.google.com/recaptcha/api/siteverify",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: params,
  //   }
  // );

  // const res = await response.json();
  // return res.success;
  return true;
}
