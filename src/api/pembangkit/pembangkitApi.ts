import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/pembangkit'

const pembangkitApi = () => {
  const [pembangkitList, setPembangkitList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [jenisPembangkit, setJenisPembangkit] = useState<[]>([])
  const [bahanBakar, setBahanBakar] = useState<[]>([])
  const [kategoriPembangkit, setKategoriPembangkit] = useState<[]>([])
  const [tipePembangkit, setTipePembangkit] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getPembangkitList = useCallback(async (id?: string, params: Params = {}) => {
    setLoading(true)

    try {
      const { path = 'sub-sistem', ...restParams } = params

      const url = !!id ? `${endpoint}/${path}/${id}` : endpoint
      const { data: { data, total } } = await Axios.get(url, { params: restParams })
      setPembangkitList(data || [])
      setTotalData(total)
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

  const getJenisPembangkit = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/jenis`)
      setJenisPembangkit(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createJenisPembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/jenis`, payload)
      toast.success('Berhasil menambahkan jenis pembangkit')
    } finally {
      toast.success('Gagal menambahkan jenis pembangkit')
    }
  }, [])

  const getTipeJenisPembangkit = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/jenis/tipe`)
      setTipePembangkit(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createTipeJenisPembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/jenis/tipe`, payload)
      toast.success('Berhasil menambahkan jenis tipe pembangkit')
    } finally {
      toast.success('Gagal menambahkan jenis tipe pembangkit')
    }
  }, [])

  const getBahanBakar = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/bahan-bakar`)
      setBahanBakar(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createBahanBakar = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/bahan-bakar`, payload)
      toast.success('Berhasil menambahkan bahan bakar')
    } finally {
      toast.success('Gagal menambahkan bahan bakar')
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

  const createKategoriPembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/kategori`, payload)
      toast.success('Berhasil menambahkan kategori pembangkit')
    } finally {
      toast.error('Gagal menambahkan kategori pembangkit')
    }
  }, [])

  const createPembangkit = useCallback(async (payload: any) => {
    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan pembangkit')
    } catch (error) {
      toast.error('Gagal menambahkan pembangkit')
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah pembangkit')
    } catch (error) {
      toast.error('Gagal mengubah pembangkit')
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePembangkit = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus pembangkit')
    } catch (error) {
      toast.error('Gagal menghapus pembangkit')
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
    totalData,
    tipePembangkit,
    getPembangkitList,
    getJenisPembangkit,
    getBahanBakar,
    getKategoriPembangkit,
    createPembangkit,
    updatePembangkit,
    deletePembangkit,
    getPembangkitDetail,
    getTipeJenisPembangkit,
    createJenisPembangkit,
    createKategoriPembangkit,
    createBahanBakar,
    createTipeJenisPembangkit
  }
}

export default pembangkitApi