import { api } from ".";
import { ILoginBody, IRegisterBody, IUser } from "../types/user";

export const createUser = (body: IRegisterBody): Promise<IUser> => {
  return api.post("/users", body);
};

export const login = (body: ILoginBody): Promise<IUser> => {
  return api.put("/auth/login", body);
};

export const logout = (): Promise<IUser> => {
  return api.put("/auth/logout");
};
