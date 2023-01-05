import { proxy } from 'valtio'
import { UserList } from '../types'


const initialValues = {
  data: {} as UserList
}

export const pengaturanUser = proxy<{ data: UserList }>(initialValues)

export const selectData = (data: UserList): void => {
  pengaturanUser.data = data
}

export const removeData = (): void => {
  pengaturanUser.data = initialValues.data
}