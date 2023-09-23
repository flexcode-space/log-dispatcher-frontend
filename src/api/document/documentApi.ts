import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/dokumen'

type TypeDocument = "pemulihan" | "code" | "gi" | "dispatcher" | "scheme" | "dkikp" | "lain"

type ParamsDocument = Omit<Params, "path"> & {
  tipe?: TypeDocument
}

const documentApi = () => {
  const [documentList, setDocumentList] = useState<[]>([])
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

  const createDocument = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan dokumen')
    } catch (error) {
      toast.error('Gagal menambahkan dokumen')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteDocument = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus dokumen')
    } catch (error) {
      toast.error('Gagal menghapus dokumen')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    documentList,
    loading,
    getDocumentList,
    createDocument,
    deleteDocument
  }
}

export default documentApi