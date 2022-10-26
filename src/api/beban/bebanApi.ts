import { useCallback, useState } from 'react'
// import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

interface ParamsBebanList extends Params {
  tanggal?: string
}

const endpoint = '/beban'

const bebanApi = () => {
  const [bebanList, setBebanList] = useState<[]>([])
  const [bebanIBTList, setbebanIBTList] = useState<[]>([])
  const [bebanTrafoList, setBebanTrafoList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const getBebanList = useCallback(async (params: ParamsBebanList = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setBebanList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const getBebanIBTList = useCallback(async (params: ParamsBebanList = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(`${endpoint}/ibt`, { params })
      setbebanIBTList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const getBebanTrafoList = useCallback(async (params: ParamsBebanList = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(`${endpoint}/trafo`, { params })
      setBebanTrafoList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    bebanList,
    bebanIBTList,
    bebanTrafoList,
    loading,
    totalData,
    getBebanList,
    getBebanIBTList,
    getBebanTrafoList
  }
}

export default bebanApi