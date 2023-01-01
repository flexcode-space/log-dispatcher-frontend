import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
}

type LaporanFreegovlist = {
  combo: [];
  catatan: [];
};

const endpoint = '/report/laporan-freegov'

const laporanFreegovApi = () => {
  const [laporanFreegovList, setLaporanFreegovList] = useState<LaporanFreegovlist>({} as LaporanFreegovlist)
  const [loading, setLoading] = useState<boolean>(false);

  const getLaporanFreegovList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setLaporanFreegovList(data || {})
    } finally {
      setLoading(false)
    }
  }, [])

  const createLaporanFreegov = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Laporan Free Gov')
    } catch (error) {
      toast.error('Gagal menambahkan Laporan Free Gov')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateLaporanFreegov = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Laporan Free Gov')
    } catch (error) {
      toast.error('Gagal mengubah Laporan Free Gov')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    laporanFreegovList,
    loading,
    getLaporanFreegovList,
    createLaporanFreegov,
    updateLaporanFreegov
  }
}

export default laporanFreegovApi