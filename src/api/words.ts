import { api } from ".";
import { IPickDailyWordsReturn } from "../types/word";

export const pickDailyWords = (): Promise<IPickDailyWordsReturn> => {
  return api.put("/words/pick-daily");
};
