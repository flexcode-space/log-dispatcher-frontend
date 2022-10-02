import { proxy } from 'valtio'

interface Modal {
  isOpen: boolean
  id?: string
  isReloadData?: boolean
}

const initialModal = {
  isOpen: false,
  id: "",
  isReloadData: false
}

export const modal = proxy<Modal>(initialModal)

export const openModal = (id?: string): void => {
  modal.isOpen = true
  modal.id = id || ""
}

export const closeModal = (): void => {
  modal.isOpen = initialModal.isOpen
  modal.id = initialModal.id
}

export const reloadPage = (): void => {
  modal.isReloadData = true
}