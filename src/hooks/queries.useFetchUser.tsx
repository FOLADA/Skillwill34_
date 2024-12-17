import { useQuery } from "@tanstack/react-query"
import FetchUser from "../api/FetchUser"

const useFetchUser = (id:string) => {
    const result = useQuery({
        queryKey: ["users"],
        queryFn: () => FetchUser(id)
    })
  return result
}

export default useFetchUser
