import { proxy } from 'valtio'

interface Modal {
  name?: string
  isOpen: boolean
  id?: string
  isReloadData?: boolean
  target?: string
}

const initialModal = {
  isOpen: false,
  id: "",
  isReloadData: false,
  target: ""
}

export const modal = proxy<Modal>(initialModal)

export const openModal = (target?: string, id?: string,): void => {
  modal.isOpen = true
  modal.id = id || ""
  modal.target = target
}

export const openModalUPT = (): void => {
  modal.isOpen = false
}

export const closeModalUPT = (): void => {
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