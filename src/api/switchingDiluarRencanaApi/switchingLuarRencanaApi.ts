import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
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

  const createSwitchingLuarRencana = useCallback(async (payload: any) => {
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


  return {
    switchingLuarRencana,
    loading,
    getSwitchingLuarRencanaList,
    createSwitchingLuarRencana,
    updateSwitchingLuarRencana
  }
}

export default switchingLuarRencanaApi