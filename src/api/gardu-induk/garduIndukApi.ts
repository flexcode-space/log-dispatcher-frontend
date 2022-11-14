import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/gardu-induk'

const garduIndukApi = () => {
  const [garduIndukList, setGarduIndukList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const getGarduIndukList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setGarduIndukList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const getGarduIndukDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const createGarduInduk = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan gardu induk')
    } catch (error) {
      toast.error('Gagal menambahkan gardu induk')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateGarduInduk = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah gardu induk')
    } catch (error) {
      toast.error('Gagal mengubah gardu induk')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteGarduInduk = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus gardu induk')
    } catch (error) {
      toast.error('Gagal menghapus gardu induk')
    } finally {
      setLoading(false)
    }
  }, [])

  const createUPT = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/upt`, payload)
      toast.success('Berhasil menambahkan UPT')
    } catch (error) {
      toast.error('Gagal menambahkan UPT')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    garduIndukList,
    loading,
    totalData,
    getGarduIndukList,
    getGarduIndukDetail,
    createGarduInduk,
    updateGarduInduk,
    deleteGarduInduk,
    createUPT
  }
}

export default garduIndukApi