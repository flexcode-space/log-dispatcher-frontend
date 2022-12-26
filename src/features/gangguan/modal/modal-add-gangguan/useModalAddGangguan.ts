import { useEffect } from 'react'
import { gangguanApi } from 'src/api/gangguan'
import { garduIndukApi } from 'src/api/gardu-induk'
import { peralatanApi } from 'src/api/peralatan'
import { optionJenisPeralatan } from './ModalAddGangguan.constant'

export const useModalAddGangguan = (jenisPeralatan: string) => {
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getJenisGangguanList, jenisGangguanList, getReleGangguanList, releGangguanList } = gangguanApi()
  const { getPeralatanByPath, peralatanList } = peralatanApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const jenisGangguanOptions = jenisGangguanList.map(({ id, name }) => ({ value: id, label: name }))
  const releOptions = releGangguanList.map(({ id, name }) => ({ value: id, label: name }))
  const peratanOptions = peralatanList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    getGarduIndukList()
    getJenisGangguanList()
    getReleGangguanList()
  }, [])

  useEffect(() => {
    if (!!jenisPeralatan) {
      getPeralatanByPath(jenisPeralatan)
    }
  }, [jenisPeralatan])

  return {
    optionJenisPeralatan,
    garduIndukOptions,
    jenisGangguanOptions,
    releOptions,
    peratanOptions
  }
}