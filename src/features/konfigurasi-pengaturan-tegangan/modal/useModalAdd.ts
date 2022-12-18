import { useEffect } from 'react';
import { useSnapshot } from 'valtio'
import { garduIndukApi } from 'src/api/gardu-induk'
import { modal } from 'src/state/modal'
import { TABLE_LIST } from '../KonfigurasiPengaturanTegangan.constant';

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const jenisSwitchingOptions = TABLE_LIST.map(({ title, type }) => ({ value: type, label: title }))

  useEffect(() => {
    if (modalSnap.isOpen) {
      getGarduIndukList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions,
    jenisSwitchingOptions
  };
};
