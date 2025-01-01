export function POST() {
  const headers = new Headers();
  headers.append("Set-Cookie", `token='';path=/;httpOnly=true;maxAge=0`);
  headers.append(
    "Set-Cookie",
    `refresh-token='';path=/;httpOnly=true;maxAge=0`
  );
  return Response.json(
    { message: "You logedout" },
    {
      status: 200,
      headers,
    }
  );
}
