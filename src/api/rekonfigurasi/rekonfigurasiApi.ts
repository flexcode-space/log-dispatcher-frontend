import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
}

const endpoint = '/report/laporan-rekonfigurasi'

const rekonfigurasiApi = () => {
  const [rekonfigurasiList, setRekonfigurasiList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getRekonfigurasiList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setRekonfigurasiList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createRekonfigurasi = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Laporan Rekonfigurasi')
    } catch (error) {
      toast.error('Gagal menambahkan Laporan Rekonfigurasi')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateRekonfigurasi = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Laporan Rekonfigurasi')
    } catch (error) {
      toast.error('Gagal mengubah Laporan Rekonfigurasi')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    rekonfigurasiList,
    loading,
    getRekonfigurasiList,
    createRekonfigurasi,
    updateRekonfigurasi
  }
}

export default rekonfigurasiApi