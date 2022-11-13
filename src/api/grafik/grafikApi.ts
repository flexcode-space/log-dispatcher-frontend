import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params, MWandMVAR } from '../types'
import { BebanSubsistem, MonitorBusbar } from './type'
import { TIME } from 'src/constants/time'


const endpoint = '/beban/grafik'

type ParamsGrafik = Params & {
  tanggal?: string
}

const grafikApi = () => {
  // const [grafikList, setGrafikList] = useState<{ time: any, value: string }[]>()

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

  return {
    // grafikList,
    getGrafik,
  }
}

export default grafikApi