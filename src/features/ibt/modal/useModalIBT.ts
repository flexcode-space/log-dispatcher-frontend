import { useEffect } from 'react';
import { useSnapshot } from 'valtio'
import { subsistemApi } from 'src/api/subsistem'
import { garduIndukApi } from 'src/api/gardu-induk'
import { rasioTeganganApi, mvaApi } from 'src/api/master'
import { modal } from 'src/state/modal'

export const useModalIBt = () => {
  const modalSnap = useSnapshot(modal)
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getRasioTeganganList, rasioTeganganList } = rasioTeganganApi()
  const { getMvaList, mvaList } = mvaApi()

  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const rasioTeganganOptions = rasioTeganganList.map(({ id, nama }) => ({ value: id, label: `${nama} KV` }))
  const mvaOptions = mvaList.map(({ id, nama }) => ({ value: id, label: `${nama} KV` }))

  useEffect(() => {
    if (modalSnap.isOpen) {
      getSubsistemList()
      getGarduIndukList()
      getRasioTeganganList()
      getMvaList()
    }
  }, [modalSnap.isOpen])

  return {
    subsistemOptions,
    garduIndukOptions,
    rasioTeganganOptions,
    mvaOptions,
  };
};
