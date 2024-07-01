import { api } from ".";
import { IEditSettingsBody, ISettings } from "../types/settings";

export const getSettings = (): Promise<ISettings> => {
  return api.get("/settings");
};

export const editSettings = (body: IEditSettingsBody): Promise<ISettings> => {
  return api.patch("/settings", body);
};
