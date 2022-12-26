import { useCallback, useState } from "react"
import { Axios } from '../axios'

const peralatanApi = () => {
  const [peralatanList, setPeralatanList] = useState<[]>([])

  const getPeralatanByPath = useCallback(async (path: string) => {
    const { data: { data } } = await Axios.get(`/peralatan/${path}`)
    setPeralatanList(data || [])
  }, [])

  return {
    getPeralatanByPath,
    peralatanList
  }
}

export default peralatanApi