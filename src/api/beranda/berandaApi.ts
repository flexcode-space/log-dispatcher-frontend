import { useCallback, useState } from 'react'
import { Axios } from '../axios'

const endpoint = '/beranda'

const berandaApi = () => {
  const [pengaturanSistem, setPengaturanSistem] = useState<{}>({})
  const [loading, setLoading] = useState<boolean>(false);

  const getPengaturanSistem = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/pengaturan-sistem`)
      setPengaturanSistem(data)
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    loading,
    pengaturanSistem,
    getPengaturanSistem,
  }
}

export default berandaApi