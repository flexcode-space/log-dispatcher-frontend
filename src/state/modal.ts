import { proxy } from 'valtio'

interface Modal {
  name?: string
  isOpen: boolean
  isOpenModalUPT: boolean;
  id?: string
  isReloadData?: boolean
}

const initialModal = {
  isOpen: false,
  isOpenModalUPT: false,
  id: "",
  isReloadData: false
}

export const modal = proxy<Modal>(initialModal)

export const openModal = (id?: string): void => {
  modal.isOpenModalUPT = false
  modal.isOpen = true
  modal.id = id || ""
}

export const openModalUPT = (): void => {
  modal.isOpen = false
  modal.isOpenModalUPT = true
}

export const closeModalUPT = (): void => {
  modal.isOpenModalUPT = false
  modal.id = initialModal.id
}

export const closeModal = (): void => {
  modal.isOpen = initialModal.isOpen
  modal.id = initialModal.id
}

export const reloadPage = (): void => {
  modal.isReloadData = true
  setTimeout(() => {
    modal.isReloadData = false
  }, 200)
}