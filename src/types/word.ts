export interface IWord {
  id: string;
  original: string;
  translation: string;
  relevance: number;
  knowledge: number;
  is_picked: boolean;
  last_seen: Date;
  last_training_try: number;
  created_at: Date;
  updated_at: Date;
}

export type IEditWordBody = Partial<{
  original: string;
  translation: string;
  knowledge: number;
  relevance: number;
  isSeen: boolean;
}>;

export interface IPickDailyWordsReturn {
  seenWords: IWord[];
  unseenWords: IWord[];
}
