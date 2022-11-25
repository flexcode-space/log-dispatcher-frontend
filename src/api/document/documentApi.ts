import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/dokumen'

type TypeDocument = "pemulihan" | "code" | "gi" | "dispatcher" | "scheme" | "dkikp" | "lain"

type ParamsDocument = Omit<Params, "path"> & {
  tipe?: TypeDocument
}

const documentApi = () => {
  const [garduIndukList, setDocumentList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getDocumentList = useCallback(async (params: ParamsDocument = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setDocumentList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    garduIndukList,
    loading,
    getDocumentList,
  }
}

export default documentApi