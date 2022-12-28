import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
}

const endpoint = '/report/laporan-posko'

const laporanPoskoApi = () => {
  const [laporanPoskoList, setLaporanPoskoList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getLaporanPoskoList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setLaporanPoskoList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createLaporanPosko = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Laporan Posko APD')
    } catch (error) {
      toast.error('Gagal menambahkan Laporan Posko APD')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateLaporanPosko = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Laporan Posko APD')
    } catch (error) {
      toast.error('Gagal mengubah Laporan Posko APD')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    laporanPoskoList,
    loading,
    getLaporanPoskoList,
    createLaporanPosko,
    updateLaporanPosko
  }
}

export default laporanPoskoApi