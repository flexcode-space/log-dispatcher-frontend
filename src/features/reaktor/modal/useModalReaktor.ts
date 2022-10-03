import { useEffect } from 'react';
import { subsistemApi } from 'src/api/subsistem'
import { garduIndukApi } from 'src/api/gardu-induk'
import { teganganApi, mvaApi } from 'src/api/master'

export const useModalReaktor = () => {
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getTeganganList, teganganList } = teganganApi()

  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const teganganOptions = teganganList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    getSubsistemList()
    getGarduIndukList()
    getTeganganList()
  }, [])

  return {
    subsistemOptions,
    garduIndukOptions,
    teganganOptions,
  };
};
