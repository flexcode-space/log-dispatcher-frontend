import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

const endpoint = '/kit-lur/energize-peralatan'

const energizePeralatanApi = () => {
  const [energizePeralatanList, setEnergizePeralatanList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getEnergizePeralatanList = useCallback(async () => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint)
      setEnergizePeralatanList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  // const createUPT = useCallback(async (payload: any) => {
  //   setLoading(true)

  //   try {
  //     await Axios.post(endpoint, payload)
  //     toast.success('Berhasil menambahkan UPT')
  //   } catch (error) {
  //     toast.error('Gagal menambahkan UPT')
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [])


  return {
    energizePeralatanList,
    loading,
    getEnergizePeralatanList,
    // createUPT,
  }
}

export default energizePeralatanApi