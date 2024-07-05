import { createContext, useContext, useMemo, useState } from "react";
import { IWord } from "../types/word";

interface IDailyWordsContext {
  seenWords: IWord[];
  currentUnseenWord?: IWord;
  updateWords: (seenWords: IWord[], unseenWords: IWord[]) => void;
  moveUnseenWordToSeen: (updatedWord?: Partial<IWord>) => void;
}
const DailyWordsContext = createContext<IDailyWordsContext>({
  moveUnseenWordToSeen: () => {},
  seenWords: [],
  updateWords: () => {},
});

interface IDailyWordsProvider {
  children: React.ReactNode;
}

export const DailyWordsProvider = ({ children }: IDailyWordsProvider) => {
  const [seenWords, setSeenWords] = useState<IWord[]>([]);
  const [unseenWords, setUnseenWords] = useState<IWord[]>([]);

  const currentUnseenWord = useMemo(() => unseenWords[0], [unseenWords[0]]);

  const updateWords = (seenWords: IWord[], unseenWords: IWord[]) => {
    setSeenWords(seenWords);
    setUnseenWords(unseenWords);
  };

  const moveUnseenWordToSeen = (updatedWord?: Partial<IWord>) => {
    setSeenWords([...seenWords, { ...currentUnseenWord, ...updatedWord }]);
    setUnseenWords(unseenWords.slice(1));
  };

  return (
    <DailyWordsContext.Provider
      value={{
        moveUnseenWordToSeen,
        currentUnseenWord,
        seenWords,
        updateWords,
      }}
    >
      {children}
    </DailyWordsContext.Provider>
  );
};

export const useDailyWords = () => useContext(DailyWordsContext);
