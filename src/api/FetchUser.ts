import $client from "../http/axios";

export default async function FetchUser(id: string) {
  const res = await $client.get(`/users/${id}`);  
  return res.data;
}
