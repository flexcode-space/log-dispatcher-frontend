import { proxy } from 'valtio'

interface ReloadPage {
  id: string
  target: string
}

const initialValues = {
  id: '',
  target: ''
}

export const reloadPage = proxy<ReloadPage>(initialValues)

export const setReloadPage = (target: string) => {
  reloadPage.id = (Math.random() + 1).toString(36).substring(2)
  reloadPage.target = target
}