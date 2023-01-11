import { useEffect } from "react"
import { pengaturanUserApi } from "src/api/pengaturan-user"

export const useModal = () => {
  const { getPengaturanUser, pengaturanUserList } = pengaturanUserApi()

  const userOptions = pengaturanUserList.map(({ id, name }) => ({ value: id, label: name }))

  useEffect(() => {
    getPengaturanUser()
  }, [])

  return {
    userOptions
  }
}