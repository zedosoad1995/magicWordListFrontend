import "./WordsOfTheDay.css";
import { useEffect, useState } from "react";
import { pickDailyWords } from "../../api/words";
import { ListOfWords } from "../../components/ListOfWords/ListOfWords";
import { UnseenWordCard } from "./components/UnseenWordCard/UnseenWordCard";
import { useNavigate } from "react-router-dom";
import { useDailyWords } from "../../contexts/dailyWords";
import { useLoadingCallback } from "../../hooks/useLoadingCallback";
import { getSettings } from "../../api/settings";

export const WordsOfTheDay = () => {
  const navigate = useNavigate();
  const [hasNoWords, setHasNoWords] = useState(false);
  const [hasNoWordsToday, setHasNoWordsToday] = useState(false);
  const [wordsPerDay, setWordsPerDay] = useState(0);
  const { seenWords, updateWords, currentUnseenWord } = useDailyWords();

  const { callback: handlePickDailyWords, isLoading } = useLoadingCallback(
    async () => {
      const { seenWords, unseenWords, totalWordsToLearn } =
        await pickDailyWords();
      updateWords(seenWords, unseenWords);

      const noWords = totalWordsToLearn === 0;
      if (noWords) {
        const { words_per_day } = await getSettings();
        setWordsPerDay(words_per_day);
      }

      setHasNoWords(noWords);
      setHasNoWordsToday(
        seenWords.length === 0 &&
          unseenWords.length === 0 &&
          totalWordsToLearn > 0
      );
    }
  );

  useEffect(() => {
    handlePickDailyWords();
  }, []);

  const handleClickAddWord = () => {
    navigate("/word/add-word");
  };

  const showUnseenWord = currentUnseenWord && !isLoading;
  const showListOfSeenWord = !currentUnseenWord && !isLoading;
  const showNoWordPlaceholder = hasNoWords && !isLoading;
  const showNoWordsTodayPlaceholder = hasNoWordsToday && !isLoading;

  return (
    <>
      {!currentUnseenWord && <h1>Words of the Day</h1>}
      <button className="add-word-button" onClick={handleClickAddWord}>
        Add Word
      </button>
      {isLoading && <div>Loading...</div>}
      {showNoWordPlaceholder && (
        <>
          <div>Looks like your word list is empty.</div>
          <div>Add new words...</div>
          <div>
            And we will show you <b>{wordsPerDay}</b> different words every day.
          </div>
        </>
      )}
      {showNoWordsTodayPlaceholder && (
        <>
          <div>Wait until tomorrow!</div>
          <div>Tomorrow we will recommend you new words.</div>
        </>
      )}
      {showUnseenWord && <UnseenWordCard word={currentUnseenWord} />}
      {showListOfSeenWord && <ListOfWords words={seenWords} />}
    </>
  );
};
