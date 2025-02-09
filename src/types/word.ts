import { IOrder } from "./query";

export interface IWord {
  id: string;
  original: string;
  translation: string;
  relevance: number;
  knowledge: number;
  is_picked: boolean;
  last_seen: Date;
  last_training_try: number;
  is_learned: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateWordBody {
  original: string;
  translation: string;
  knowledge: number;
  relevance: number;
}

export type IEditWordBody = Partial<{
  original: string;
  translation: string;
  knowledge: number;
  relevance: number;
  isSeen: boolean;
  is_learned: boolean;
}>;

export interface IStartTrainingReturn {
  totalWordsToLearn: number;
}

export interface IPickDailyWordsReturn {
  seenWords: IWord[];
  unseenWords: IWord[];
  totalWordsToLearn: number;
}

export interface IGetWordsReturn {
  words: IWord[];
  total: number;
}

export type IWordSortBy =
  | "original"
  | "translation"
  | "relevance"
  | "knowledge"
  | "created_at";

export interface IGetWordsQuery {
  sortBy?: IWordSortBy;
  order?: IOrder;
  search?: string;
  isLearned?: boolean;
}
