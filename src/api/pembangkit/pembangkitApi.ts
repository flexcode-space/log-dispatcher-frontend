import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/pembangkit'

const pembangkitApi = () => {
  const [pembangkitList, setPembangkitList] = useState<[]>([])
  const [jenisPembangkit, setJenisPembangkit] = useState<[]>([])
  const [bahanBakar, setBahanBakar] = useState<[]>([])
  const [kategoriPembangkit, setKategoriPembangkit] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getPembangkitList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setPembangkitList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getPembangkitDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const getPembangkitBySubsistemId = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const { data: { data } } = await Axios.get(`${endpoint}/sub-sistem/${id}`)
      setPembangkitList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getBahanBakar = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/jenis`)
      setJenisPembangkit(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getJenisPembangkit = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/bahan-bakar`)
      setBahanBakar(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getKategoriPembangkit = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/kategori`)
      setKategoriPembangkit(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createPembangkit = useCallback(async (payload: any) => {
    try {
      await Axios.post(endpoint, payload)
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePembangkit = useCallback(async (payload: any) => {
    console.log('payload', payload)
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    pembangkitList,
    jenisPembangkit,
    bahanBakar,
    kategoriPembangkit,
    getPembangkitList,
    getPembangkitBySubsistemId,
    getJenisPembangkit,
    getBahanBakar,
    getKategoriPembangkit,
    createPembangkit,
    updatePembangkit,
    deletePembangkit,
    getPembangkitDetail
  }
}

export default pembangkitApi