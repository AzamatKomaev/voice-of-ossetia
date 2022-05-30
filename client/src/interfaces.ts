interface IDate {
  id: number,
  created_at: string | Date,
  updated_at: string | Date
}

export interface IFile extends IDate {
  path: string,
  post_id: number
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

export interface IPost extends IDate {
  title: string,
  description: string,
  location: string,
  user_id: number,
  category_id: number,
  user: IUser,
  category: ICategory,
  files: Array<IFile>
}
