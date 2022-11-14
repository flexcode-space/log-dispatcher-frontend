import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params, MWandMVAR } from '../types'
import { BebanSubsistem, MonitorBusbar } from './type'
import { TIME } from 'src/constants/time'


const endpoint = '/beban/grafik'

type ParamsGrafik = Params & {
  tanggal?: string
}

type GrafikData = {
  time: string;
  beban: any;
  rencana: any;
}[]

const grafikApi = () => {
  const [grafikSubsistem, setGrafikSubsistem] = useState<GrafikData>([] as GrafikData)
  const [grafikPembangkit, setGrafikPembangkit] = useState<GrafikData>([] as GrafikData)

  const getGrafik = useCallback(async (params: ParamsGrafik = {}) => {
    const { data: { data } } = await Axios.get(endpoint, { params })

    if (data) {
      return Object.values(TIME).map((time) => {
        const mw = "mw_" + time.replace(".", "");

        return {
          time,
          value: (data as any)[mw]! || 0
        }
      })
    }
    return []
  }, [])


  const getGrafikSubsistem = useCallback(async (id?: string, params: ParamsGrafik = {}) => {
    const { data: { data, rencana } } = await Axios.get(`${endpoint}/subsistem/${id}`, { params })

    if (data && rencana) {
      const result = Object.values(TIME).map((time) => {
        const mw = "mw_" + time.replace(".", "");

        return {
          time,
          beban: (data as any)[mw]! || 0,
          rencana: (rencana as any)[mw]! || 0
        }
      })
      setGrafikSubsistem(result)
    } else {
      setGrafikSubsistem([])
    }
  }, [])

  const getGrafikPembangkit = useCallback(async (id?: string, params: ParamsGrafik = {}) => {
    const { data: { data, rencana } } = await Axios.get(`${endpoint}/kategori-pembangkit/${id}`, { params })

    if (data && rencana) {
      const result = Object.values(TIME).map((time) => {
        const mw = "mw_" + time.replace(".", "");

        return {
          time,
          beban: (data as any)[mw]! || 0,
          rencana: (rencana as any)[mw]! || 0
        }
      })
      setGrafikPembangkit(result)
    } else {
      setGrafikPembangkit([])
    }
  }, [])

  return {
    getGrafikSubsistem,
    getGrafikPembangkit,
    getGrafik,
    grafikSubsistem,
    grafikPembangkit,
  }
}

export default grafikApi