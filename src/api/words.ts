import { api } from ".";
import {
  ICreateWordBody,
  IEditWordBody,
  IGetWordsQuery,
  IGetWordsReturn,
  IPickDailyWordsReturn,
  IStartTrainingReturn,
  IWord,
} from "../types/word";

export const getWords = (query?: IGetWordsQuery): Promise<IGetWordsReturn> => {
  return api.get("/words", {
    params: query,
  });
};

export const getWord = (id: string): Promise<IWord> => {
  return api.get(`/words/${id}`);
};

export const pickDailyWords = (): Promise<IPickDailyWordsReturn> => {
  return api.put("/words/pick-daily");
};

export const editWord = (id: string, body: IEditWordBody): Promise<IWord> => {
  return api.patch(`/words/${id}`, body);
};

export const createWord = (body: ICreateWordBody): Promise<IWord> => {
  return api.post("/words", body);
};

export const deleteWord = (id: string): Promise<void> => {
  return api.delete(`/words/${id}`);
};

export const startTraining = (): Promise<IStartTrainingReturn> => {
  return api.put("/words/training/start");
};

export const getTrainingNextWord = (): Promise<IWord> => {
  return api.post("/words/training/next-word");
};
