import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/laporan'

type ParamsUnggahLaporan = Params & {
  tipe?: 'amr' | 'scada'
}

const unggahLaporanApi = () => {
  const [unggahLaporanList, setUnggahLaporanList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const getUnggahLaporanList = useCallback(async (params: ParamsUnggahLaporan = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setUnggahLaporanList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    unggahLaporanList,
    totalData,
    loading,
    getUnggahLaporanList,
  }
}

export default unggahLaporanApi