import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

const endpoint = '/dispatch/switching-pembangkit'

const switchingPembangkitApi = () => {
  const [switchingPembangkitList, setSwitchingPembangkitList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getSwitchingPembangkitList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setSwitchingPembangkitList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createSwitchingPembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Switching Pembangkit')
    } catch (error) {
      toast.error('Gagal menambahkan Switching Pembangkit')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSwitchingPembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Switching Pembangkit')
    } catch (error) {
      toast.error('Gagal mengubah Switching Pembangkit')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    switchingPembangkitList,
    loading,
    getSwitchingPembangkitList,
    createSwitchingPembangkit,
    updateSwitchingPembangkit
  }
}

export default switchingPembangkitApi