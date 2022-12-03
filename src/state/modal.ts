import { proxy } from 'valtio'

interface Modal {
  name?: string
  isOpen: boolean
  isOpenModalUPT: boolean;
  id?: string
  isReloadData?: boolean
  target?: string
}

const initialModal = {
  isOpen: false,
  isOpenModalUPT: false,
  id: "",
  isReloadData: false,
  target: ""
}

export const modal = proxy<Modal>(initialModal)

export const openModal = (id?: string, target?: string): void => {
  modal.isOpenModalUPT = false
  modal.isOpen = true
  modal.id = id || ""
  modal.target = target
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
  modal.target = initialModal.target
}

export const reloadPage = (): void => {
  modal.isReloadData = true
  setTimeout(() => {
    modal.isReloadData = false
  }, 200)
}