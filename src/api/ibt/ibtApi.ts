import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/ibt'

const ibtApi = () => {
  const [ibtList, setIbtList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);


  const getIbtList = useCallback(async (id?: string, params: Params = {}) => {
    setLoading(true)

    try {
      const { path = 'sub-sistem', ...restParams } = params

      const url = !!id ? `${endpoint}/${path}/${id}` : endpoint
      const { data: { data, total } } = await Axios.get(url, { params: restParams })
      setIbtList(data || [])
      setTotalData(total)
    } catch (error) { }
    finally {
      setLoading(false)
    }
  }, [])

  const getIbtDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])


  const createIbt = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan IBT')
    } catch (error) {
      toast.error('Gagal menambahkan IBT')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateIbt = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah IBT')
    } catch (error) {
      toast.error('Gagal mengubah IBT')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteIbt = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus IBT')
    } catch (error) {
      toast.error('Gagal mengubah IBT')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    ibtList,
    totalData,
    loading,
    getIbtList,
    createIbt,
    updateIbt,
    deleteIbt,
    getIbtDetail
  }
}

export default ibtApi