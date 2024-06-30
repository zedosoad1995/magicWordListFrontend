import { api } from ".";
import { IEditWordBody, IPickDailyWordsReturn, IWord } from "../types/word";

export const getWord = (id: string): Promise<IWord> => {
  return api.get(`/words/${id}`);
};

export const pickDailyWords = (): Promise<IPickDailyWordsReturn> => {
  return api.put("/words/pick-daily");
};

export const editWord = (id: string, body: IEditWordBody): Promise<IWord> => {
  return api.patch(`/words/${id}`, body);
};
