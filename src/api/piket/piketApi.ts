import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  tanggal?: string;
}

export interface PiketList {
  id: string;
  user: User;
  posisi: string;
}
export interface User {
  id: string;
  nama: string;
  jabatan: string;
  photo: string;
}


const endpoint = '/piket'

const piketApi = () => {
  const [piketList, setPiketList] = useState<PiketList[]>([] as PiketList[])
  const [loading, setLoading] = useState<boolean>(false);

  const getPiketList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setPiketList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createPiket = useCallback(async (payload: any) => {
    setLoading(true)

    await Axios.post(endpoint, payload)
  }, [])

  const updatePiket = useCallback(async (payload: any) => {
    await Axios.put(endpoint, payload)
  }, [])

  const deletePiket = useCallback(async (payload: any) => {
    await Axios.delete(endpoint, { data: payload })
  }, [])


  return {
    piketList,
    loading,
    getPiketList,
    createPiket,
    updatePiket,
    deletePiket
  }
}

export default piketApi