import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

const endpoint = '/report/laporan-neraca'

const laporanNeracaDayaApi = () => {
  const [laporanNeracaDayaList, setLaporanNeracaDayaList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getLaporanNeracaDayaList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setLaporanNeracaDayaList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createLaporanNeracaDaya = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Laporan Neraca Daya')
    } catch (error) {
      toast.error('Gagal menambahkan Laporan Neraca Daya')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateLaporanNeracaDaya = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Laporan Neraca Daya')
    } catch (error) {
      toast.error('Gagal mengubah Laporan Neraca Daya')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    laporanNeracaDayaList,
    loading,
    getLaporanNeracaDayaList,
    createLaporanNeracaDaya,
    updateLaporanNeracaDaya
  }
}

export default laporanNeracaDayaApi