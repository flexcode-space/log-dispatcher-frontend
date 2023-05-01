import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'
import { BebanSubsistem, MonitorBusbar } from './type'

const endpoint = '/beban/analisa'

type ParamsAnalisaBeban = Params & {
  tanggal?: string
}

const analisaBebanApi = () => {
  const [bebanSubsistemList, setBebanSubsistemList] = useState<BebanSubsistem>({} as BebanSubsistem)
  const [monitorBusbarList, setMonitorBusbarList] = useState<MonitorBusbar>({} as MonitorBusbar)
  const [monitorIbtList, setMonitorIbtList] = useState<[]>([])
  const [monitorPengahantarList, setMonitorPenghantarList] = useState<[]>([])
  const [monitorTrafoList, setMonitorTrafoList] = useState<[]>([])
  const [bebanSubsistemDetail, setBebanSubsistemDetail] = useState<[]>([])

  const getBebanSubsistemList = useCallback(async (params: ParamsAnalisaBeban = {}) => {
    const { data } = await Axios.get(`${endpoint}/subsistem`, { params })
    setBebanSubsistemList(data)
  }, [])

  const getBebanSubsistemDetailList = useCallback(async (id: string, params: ParamsAnalisaBeban = {}) => {
    const { data } = await Axios.get(`${endpoint}/subsistem/${id}`, { params })
    setBebanSubsistemDetail(data || [])
  }, [])

  const getMonitorBusbar = useCallback(async (params: ParamsAnalisaBeban = {}) => {
    const { data } = await Axios.get(`${endpoint}/monitor/busbar`, { params })
    setMonitorBusbarList(data)
  }, [])

  const getMonitorIbt = useCallback(async (params: ParamsAnalisaBeban = {}) => {
    const { data } = await Axios.get(`${endpoint}/monitor/ibt`, { params })
    if (data !== null) {
      data.forEach((item: any, index: number) => {
        item.id = index + 1
      });
    }
    setMonitorIbtList(data || [])
  }, [])

  const getMonitorPenghantar = useCallback(async (params: ParamsAnalisaBeban = {}) => {
    const { data } = await Axios.get(`${endpoint}/monitor/penghantar`, { params })
    if (data !== null) {
      data.forEach((item: any, index: number) => {
        item.id = index + 1
      });
    }
    setMonitorPenghantarList(data || [])
  }, [])

  const getMonitorTrafo = useCallback(async (params: ParamsAnalisaBeban = {}) => {
    const { data } = await Axios.get(`${endpoint}/monitor/trafo`, { params })
    if (data !== null) {
      data.forEach((item: any, index: number) => {
        item.id = index + 1
      });
    }
    setMonitorTrafoList(data || [])
  }, [])

  return {
    bebanSubsistemList,
    monitorBusbarList,
    monitorIbtList,
    monitorPengahantarList,
    monitorTrafoList,
    getBebanSubsistemList,
    getMonitorBusbar,
    getMonitorIbt,
    getMonitorPenghantar,
    getMonitorTrafo,
    getBebanSubsistemDetailList,
    bebanSubsistemDetail
  }
}

export default analisaBebanApi