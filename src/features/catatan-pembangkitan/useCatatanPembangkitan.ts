import { useEffect } from 'react'
import { pembangkitApi } from 'src/api/pembangkit'
import { STATUS } from './CatatanPembangkitan.constant'

export const useCatatanPembangkitan = () => {
  const { getPembangkitList, pembangkitList } = pembangkitApi()

  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))
  const statusOptions = STATUS.map((value) => ({ value: value, label: value }))

  useEffect(() => {
    getPembangkitList()
  }, [])

  return {
    pembangkitOptions,
    statusOptions
  }
}