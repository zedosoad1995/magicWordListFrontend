import { createContext, useContext, useMemo, useState } from "react";
import { IWord } from "../types/word";

interface IDailyWordsContext {
  seenWords: IWord[];
  nextUnseenWord?: IWord;
  updateWords: (seenWords: IWord[], unseenWords: IWord[]) => void;
  moveUnseenWordToSeen: () => void;
  updateUnseenWord: (word: IWord | ((prevState: IWord) => IWord)) => void;
}
const DailyWordsContext = createContext<IDailyWordsContext>({
  moveUnseenWordToSeen: () => {},
  seenWords: [],
  updateWords: () => {},
  updateUnseenWord: () => {},
});

interface IDailyWordsProvider {
  children: React.ReactNode;
}

export const DailyWordsProvider = ({ children }: IDailyWordsProvider) => {
  const [seenWords, setSeenWords] = useState<IWord[]>([]);
  const [unseenWords, setUnseenWords] = useState<IWord[]>([]);

  const updateWords = (seenWords: IWord[], unseenWords: IWord[]) => {
    setSeenWords(seenWords);
    setUnseenWords(unseenWords);
  };

  const moveUnseenWordToSeen = () => {
    setSeenWords([...seenWords, unseenWords[0]]);
    setUnseenWords(unseenWords.slice(1));
  };

  const updateUnseenWord = (word: IWord | ((prevState: IWord) => IWord)) => {
    if (typeof word === "function") {
      const wordCallback = word;
      setUnseenWords((words) => [wordCallback(words[0]), ...words.slice(1)]);
    } else {
      setUnseenWords((words) => [word, ...words.slice(1)]);
    }
  };

  const nextUnseenWord = useMemo(() => unseenWords[0], [unseenWords[0]]);

  return (
    <DailyWordsContext.Provider
      value={{
        moveUnseenWordToSeen,
        nextUnseenWord,
        seenWords,
        updateWords,
        updateUnseenWord,
      }}
    >
      {children}
    </DailyWordsContext.Provider>
  );
};

export const useDailyWords = () => useContext(DailyWordsContext);
