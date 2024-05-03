export async function GET(request: Request) {
  //   const body = await request.json();
  //   const userId = body.userId;

  //   const products = await getUserProducts(userId);

  //   if (products) {
  //     return Response.json(
  //       { success: true, products },
  //       { status: 302, statusText: "User found." }
  //     );
  //   } else {
  return Response.json(
    { success: false },
    { status: 404, statusText: "Unavailable." }
  );
  //   }
}
