import { useCallback, useState } from 'react'
import { Axios } from '../axios'

const endpoint = '/beranda'

const berandaApi = () => {
  const [pengaturanSistem, setPengaturanSistem] = useState<{}>({})
  const [penghantarList, setPenghantarList] = useState<[]>([])
  const [ibtList, setIbtList] = useState<[]>([])
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

  const getMonitoringPenghantar = useCallback(async (params: { tanggal: string, limit: number }) => {
    setLoading(true)

    try {
      const { data } = await Axios.get('/beban/analisa/monitor/penghantar', { params })
      setPenghantarList(data ? data.slice(0, 20) : [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getMonitoringIBT = useCallback(async (params: { tanggal: string }) => {
    setLoading(true)

    try {
      const { data } = await Axios.get('/beban/analisa/monitor/ibt', { params })
      setIbtList(data ? data.slice(0, 20) : [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    loading,
    ibtList,
    pengaturanSistem,
    penghantarList,
    getMonitoringIBT,
    getPengaturanSistem,
    getMonitoringPenghantar,
  }
}

export default berandaApi