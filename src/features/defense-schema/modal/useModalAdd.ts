import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { modal } from "src/state/modal";
import { subsistemApi } from "src/api/subsistem";

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal);
  const { getSubsistemList, subsistemList } = subsistemApi();

  const subsistemOptions = subsistemList.map(({ id, nama }) => ({
    value: id,
    label: nama,
  }));

  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-neraca-daya") {
      getSubsistemList();
    }
    console.log(subsistemOptions);
  }, [modalSnap.isOpen]);

  return {
    subsistemOptions,
  };
};
