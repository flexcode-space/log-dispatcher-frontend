import { useCallback, useState } from 'react'
import { Axios } from '../axios'

const endpoint = '/beranda'

type MonitorList = {
  id: string,
  gardu_induk: string,
  jam: string,
  peralatan: string,
  tegangan: number,
  subsistem: string
}

const berandaApi = () => {
  const [pengaturanSistem, setPengaturanSistem] = useState<{}>({})
  const [penghantarList, setPenghantarList] = useState<[]>([])
  const [statusPembangkitanList, setStatusPembangkitanList] = useState<[]>([])
  const [monitorAnalisaBeban, setMonitorAnalisaBeban] = useState<{
    tertinggi: MonitorList[],
    terendah: MonitorList[]
  }>({ tertinggi: [], terendah: [] })
  const [ibtList, setIbtList] = useState<[]>([])
  const [pieChart, setPieChat] = useState<{}>({})
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

  const getStatusPembangkitan = useCallback(async (params: { tanggal: string }) => {
    setLoading(true)

    try {
      const { data } = await Axios.get('/beranda/status-pembangkitan', { params })
      setStatusPembangkitanList(data ? data.slice(0, 20) : [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getMonitorAnalisaBeban = useCallback(async (params: { tanggal: string }) => {
    setLoading(true)

    try {
      const { data } = await Axios.get('/beban/analisa/monitor/busbar', { params })
      const tertinggi = data?.tertinggi ? [...data?.tertinggi.slice(0, 20)] : []
      const terendah = data?.terendah ? [...data?.terendah.slice(0, 20)] : []

      setMonitorAnalisaBeban({ tertinggi, terendah } || {})
    } finally {
      setLoading(false)
    }
  }, [])

  const getPieChart = useCallback(async (params: { tanggal: string }) => {
    setLoading(true)
    try {
      const { data } = await Axios.get('/beranda/pie-chart', { params })
      return data
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    loading,
    ibtList,
    pengaturanSistem,
    penghantarList,
    statusPembangkitanList,
    monitorAnalisaBeban,
    getMonitoringIBT,
    getPengaturanSistem,
    getMonitoringPenghantar,
    getStatusPembangkitan,
    getMonitorAnalisaBeban,
    getPieChart,
    // pieChart
  }
}

export default berandaApi