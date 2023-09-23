import { useEffect } from 'react';
import { useSnapshot } from 'valtio'
import { subsistemApi } from 'src/api/subsistem'
import { garduIndukApi } from 'src/api/gardu-induk'
import { teganganApi } from 'src/api/master'
import { modal } from 'src/state/modal'

export const useModalBusbar = () => {
  const modalSnap = useSnapshot(modal)
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getTeganganList, teganganList } = teganganApi()

  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const teganganOptions = teganganList.map(({ id, nama }) => ({ value: id, label: `${nama} KV` }))

  useEffect(() => {
    if (modalSnap.isOpen) {
      getSubsistemList()
      getGarduIndukList()
      getTeganganList()
    }
  }, [modalSnap.isOpen])

  return {
    subsistemOptions,
    garduIndukOptions,
    teganganOptions
  };
};
