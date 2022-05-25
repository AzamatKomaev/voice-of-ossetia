interface IDate {
  id: number,
  created_at: string,
  updated_at: string
}

export interface IUser extends IDate {
  name: string,
  email: string,
  locality: string,
  age: number | null,
  first_name: string | null,
  last_name: string | null,
  description: string | null,
  is_active: boolean,
  is_superuser: boolean,
  email_verified_at?: string,
  password?: string,
}

export interface ICategory extends IDate {
  name: string,
  description: string,
  avatar: string
}

