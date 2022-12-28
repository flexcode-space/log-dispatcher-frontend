import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { modal } from "src/state/modal";
import { garduIndukApi } from "src/api/gardu-induk";
import { subsistemApi } from "src/api/subsistem";
import { trafoApi } from "src/api/trafo";
import { defenseApi } from "src/api/defense";
import { optionJenisPeralatan } from './ModalAddOGS.constant'
import { peralatanApi } from "src/api/peralatan";

export const useModalAdd = (jenisPeralatan: string) => {
  const modalSnap = useSnapshot(modal);
  const { getGarduIndukList, garduIndukList } = garduIndukApi();
  const { getSubsistemList, subsistemList } = subsistemApi();
  const { getTahapList, tahapList, getAmpList, ampList } = defenseApi();
  const { getPeralatanByPath, peralatanList } = peralatanApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }));
  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }));
  const tahapOptions = tahapList.map(({ id, nama }) => ({ value: id, label: nama }));
  const ampOptions = ampList.map(({ id, nama }) => ({ value: id, label: nama }));
  const peratanOptions = peralatanList.map(({ id, nama }) => ({ value: id, label: nama }))
  const statusOptions = [
    { value: "true", label: "ON" },
    { value: "false", label: "OFF" },
  ];

  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-add-ogs") {
      getGarduIndukList();
      getSubsistemList();
      getTahapList();
      getAmpList()
    }
  }, [modalSnap.isOpen]);

  useEffect(() => {
    if (!!jenisPeralatan) {
      getPeralatanByPath(jenisPeralatan)
    }
  }, [jenisPeralatan])

  return {
    peratanOptions,
    optionJenisPeralatan,
    garduIndukOptions,
    subsistemOptions,
    tahapOptions,
    statusOptions,
    ampOptions
  };
};
