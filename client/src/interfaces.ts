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
  avatar: string | null,
  notification_count: number
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

export interface IComment extends IDate {
  description: string,
  user_id: number,
  post_id: number,
  user: IUser,
  post: IPost
}

export interface INotification extends IDate {
  type: string,
  notifiable_type: string,
  notifiable_id: number,
  data: {
    sender: IUser,
    receiver: IUser,
    text: string
  },
  read_at: string | null
}


