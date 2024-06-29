import { api } from ".";
import { IEditWordBody, IPickDailyWordsReturn, IWord } from "../types/word";

export const pickDailyWords = (): Promise<IWord> => {
  return api.put("/words/pick-daily");
};

export const editWord = (
  id: string,
  body: IEditWordBody
): Promise<IPickDailyWordsReturn> => {
  return api.patch(`/words/${id}`, body);
};
