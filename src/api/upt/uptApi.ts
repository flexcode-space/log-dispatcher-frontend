import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

const endpoint = '/gardu-induk/upt'

const uptApi = () => {
  const [uptList, setUptList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getUPTList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint)
      setUptList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createUPT = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan UPT')
    } catch (error) {
      toast.error('Gagal menambahkan UPT')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    uptList,
    loading,
    getUPTList,
    createUPT,
  }
}

export default uptApi