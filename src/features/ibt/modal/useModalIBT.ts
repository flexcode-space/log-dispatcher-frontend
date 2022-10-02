import { useEffect } from 'react';
import { subsistemApi } from 'src/api/subsistem'
import { garduIndukApi } from 'src/api/gardu-induk'
import { rasioTeganganApi, mvaApi } from 'src/api/master'

export const useModalIBt = () => {
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getRasioTeganganList, rasioTeganganList } = rasioTeganganApi()
  const { getMvaList, mvaList } = mvaApi()

  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const rasioTeganganOptions = rasioTeganganList.map(({ id, nama }) => ({ value: id, label: `${nama} KV` }))
  const mvaOptions = mvaList.map(({ id, nama }) => ({ value: id, label: `${nama} KV` }))

  useEffect(() => {
    getSubsistemList()
    getGarduIndukList()
    getRasioTeganganList()
    getMvaList()
  }, [])

  return {
    subsistemOptions,
    garduIndukOptions,
    rasioTeganganOptions,
    mvaOptions,
  };
};
