import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  tipe: string
}

const endpoint = '/report/laporan-scada'

const laporanScadaApi = () => {
  const [laporanScadaList, setLaporanScadaList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getLaporanScadaList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setLaporanScadaList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createLaporanScada = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Laporan Scada')
    } catch (error) {
      toast.error('Gagal menambahkan Laporan Scada')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateLaporanScada = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Laporan Scada')
    } catch (error) {
      toast.error('Gagal mengubah Laporan Scada')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteLaporanScada = useCallback(async (payload: any) => {
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
    laporanScadaList,
    loading,
    getLaporanScadaList,
    createLaporanScada,
    updateLaporanScada,
    deleteLaporanScada
  }
}

export default laporanScadaApi