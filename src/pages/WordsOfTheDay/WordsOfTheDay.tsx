import "./WordsOfTheDay.css";
import { useEffect } from "react";
import { pickDailyWords } from "../../api/words";
import { ListOfWords } from "../../components/ListOfWords/ListOfWords";
import { UnseenWordCard } from "./components/UnseenWordCard/UnseenWordCard";
import { useNavigate } from "react-router-dom";
import { useDailyWords } from "../../contexts/dailyWords";
import { useLoadingCallback } from "../../hooks/useLoadingCallback";

export const WordsOfTheDay = () => {
  const navigate = useNavigate();
  const { seenWords, updateWords, currentUnseenWord } = useDailyWords();

  const { callback: handlePickDailyWords, isLoading } = useLoadingCallback(
    async () => {
      const { seenWords, unseenWords } = await pickDailyWords();
      updateWords(seenWords, unseenWords);
    }
  );

  useEffect(() => {
    handlePickDailyWords();
  }, []);

  const handleClickAddWord = () => {
    navigate("/word/add-word");
  };

  return (
    <>
      {!currentUnseenWord && <h1>Words of the Day</h1>}
      <button className="add-word-button" onClick={handleClickAddWord}>
        Add Word
      </button>
      {isLoading && <div>Loading...</div>}
      {currentUnseenWord && !isLoading && (
        <UnseenWordCard word={currentUnseenWord} />
      )}
      {!currentUnseenWord && !isLoading && <ListOfWords words={seenWords} />}
    </>
  );
};
