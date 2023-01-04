import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  tipe: string
}

const endpoint = '/kit-lur/catatan-pembangkit'

const catatanPembangkitanApi = () => {
  const [catatanPembangkitanList, setCatatanPembangkitan] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getCatatanPembangkitanList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setCatatanPembangkitan(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createCatatanPembangkitan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Catatan Pembangkitan')
    } catch (error) {
      toast.error('Gagal menambahkan Catatan Pembangkitan')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCatatanPembangkitan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Catatan Pembangkitan')
    } catch (error) {
      toast.error('Gagal mengubah Catatan Pembangkitan')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteCatatanPembangkitan = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus')
    } catch (error) {
      toast.error('Gagal menghapus')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    catatanPembangkitanList,
    loading,
    getCatatanPembangkitanList,
    createCatatanPembangkitan,
    updateCatatanPembangkitan,
    deleteCatatanPembangkitan
  }
}

export default catatanPembangkitanApi