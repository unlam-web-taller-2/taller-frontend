export interface User {
  id: number,
  email: String,
  password: string,
  name: string,
  lastname: string,
  address: string
}

export const USER_DEFAULT = {
  id: -1,
  email: '',
  password: '',
  name: '',
  lastname: '',
  address: ''
}
