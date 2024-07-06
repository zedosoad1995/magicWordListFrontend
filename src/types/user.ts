export interface IUser {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IRegisterBody {
  email: string;
  password: string;
  words_per_day: number;
}
