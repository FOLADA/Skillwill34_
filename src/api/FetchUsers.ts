import $client from "../http/axios";

export default async function FetchUsers() {
  const res = await $client.get("/users");
  return res.data.users
}
