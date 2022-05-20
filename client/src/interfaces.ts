interface IDate {
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
  is_active?: boolean,
  email_verified_at?: string,
  password?: string,
}

