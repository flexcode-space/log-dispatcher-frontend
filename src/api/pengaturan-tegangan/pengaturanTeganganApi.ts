import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

export type ParamsKonfigurasi = Params & {
  tipe: string
}

const endpoint = '/dispatch/switching-khusus'

const pengaturanTeganganApi = () => {
  const [pengaturanTeganganList, setPengaturanTeganganList] = useState<[]>([])
  const [konfigurasiList, setKonfigurasiList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getPengaturanTeganganList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setPengaturanTeganganList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getKonfigurasiList = useCallback(async (params: ParamsKonfigurasi) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(`${endpoint}/konfigurasi`, { params })
      setKonfigurasiList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createPengaturanTegangan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Data')
    } catch (error) {
      toast.error('Gagal menambahkan Data')
    } finally {
      setLoading(false)
    }
  }, [])

  const createKonfigurasi = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/konfigurasi`, payload)
      toast.success('Berhasil menambahkan Data')
    } catch (error) {
      toast.error('Gagal menambahkan Data')
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePengaturanTegangan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Data')
    } catch (error) {
      toast.error('Gagal mengubah Data')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateKonfigurasi = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(`${endpoint}/konfigurasi`, payload)
      toast.success('Berhasil mengubah Data')
    } catch (error) {
      toast.error('Gagal mengubah Data')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteKonfigurasi = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.delete(`${endpoint}/konfigurasi`, { data: payload })
      toast.success('Berhasil menghapus Data')
    } catch (error) {
      toast.error('Gagal menghapus Data')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    loading,
    konfigurasiList,
    getKonfigurasiList,
    pengaturanTeganganList,
    getPengaturanTeganganList,
    createPengaturanTegangan,
    updatePengaturanTegangan,
    createKonfigurasi,
    updateKonfigurasi,
    deleteKonfigurasi
  }
}

export default pengaturanTeganganApi