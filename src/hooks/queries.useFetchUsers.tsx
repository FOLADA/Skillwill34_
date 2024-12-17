import { useQuery } from "@tanstack/react-query"
import FetchUsers from "../api/FetchUsers"
import { IUsers } from "../interfaces/users.interface"

const useFetchUsers = () => {
    const result = useQuery<IUsers[]>({
        queryKey: ["users"],
        queryFn: FetchUsers
    })
  return result
}

export default useFetchUsers
