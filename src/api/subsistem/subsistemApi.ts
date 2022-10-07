import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/sub-sistem'

const subsistemApi = () => {
  const [subsistemList, setSubsistemList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getSubsistemList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setSubsistemList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getSubsistemDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const createSubsistem = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSubsistem = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteSubsistem = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    subsistemList,
    loading,
    getSubsistemList,
    getSubsistemDetail,
    createSubsistem,
    updateSubsistem,
    deleteSubsistem
  }
}

export default subsistemApi