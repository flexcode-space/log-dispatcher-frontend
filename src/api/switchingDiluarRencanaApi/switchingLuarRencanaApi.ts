import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { PayloadSwitchingLuarRencana } from 'src/features/switching-diluar-rencana/types';
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

const endpoint = '/dispatch/luar-rencana'

const switchingLuarRencanaApi = () => {
  const [switchingLuarRencana, setSwitchingLuarRencanaList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getSwitchingLuarRencanaList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setSwitchingLuarRencanaList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createSwitchingLuarRencana = useCallback(async (payload: PayloadSwitchingLuarRencana[]) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Kapsitor Reaktor')
    } catch (error) {
      toast.error('Gagal menambahkan Kapsitor Reaktor')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSwitchingLuarRencana = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Kapsitor Reaktor')
    } catch (error) {
      toast.error('Gagal mengubah Kapsitor Reaktor')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteSwitchingLuarRencana = useCallback(async (payload: any) => {
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
    switchingLuarRencana,
    loading,
    getSwitchingLuarRencanaList,
    createSwitchingLuarRencana,
    updateSwitchingLuarRencana,
    deleteSwitchingLuarRencana
  }
}

export default switchingLuarRencanaApi