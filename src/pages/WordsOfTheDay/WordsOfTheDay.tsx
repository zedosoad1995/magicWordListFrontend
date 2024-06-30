import "./WordsOfTheDay.css";
import { useEffect, useMemo, useState } from "react";
import { pickDailyWords } from "../../api/words";
import { IWord } from "../../types/word";
import { ListOfWords } from "./components/ListOfWords/ListOfWords";
import { UnseenWordCard } from "./components/UnseenWordCard/UnseenWordCard";

export const WordsOfTheDay = () => {
  const [seenWords, setSeenWords] = useState<IWord[]>([]);
  const [unseenWords, setUnseenWords] = useState<IWord[]>([]);

  useEffect(() => {
    pickDailyWords().then(({ seenWords, unseenWords }) => {
      setSeenWords(seenWords);
      setUnseenWords(unseenWords);
    });
  }, []);

  const handleClickNextWord = () => {
    setSeenWords([...seenWords, unseenWords[0]]);
    setUnseenWords(unseenWords.slice(1));
  };

  const hasUnseenWords = useMemo(
    () => Boolean(unseenWords.length),
    [unseenWords.length]
  );

  return (
    <>
      {!hasUnseenWords && <h1>Words of the Day</h1>}
      <button className="add-word-button">Add Word</button>
      {hasUnseenWords && (
        <UnseenWordCard
          word={unseenWords[0]}
          handleClickNext={handleClickNextWord}
        />
      )}
      {!hasUnseenWords && <ListOfWords words={seenWords} />}
    </>
  );
};
