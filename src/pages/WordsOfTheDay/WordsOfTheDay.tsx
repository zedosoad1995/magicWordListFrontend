import "./WordsOfTheDay.css";
import { useEffect } from "react";
import { pickDailyWords } from "../../api/words";
import { ListOfWords } from "../../components/ListOfWords/ListOfWords";
import { UnseenWordCard } from "./components/UnseenWordCard/UnseenWordCard";
import { useNavigate } from "react-router-dom";
import { useDailyWords } from "../../contexts/dailyWords";

export const WordsOfTheDay = () => {
  const navigate = useNavigate();
  const { seenWords, updateWords, currentUnseenWord } = useDailyWords();

  useEffect(() => {
    pickDailyWords().then(({ seenWords, unseenWords }) => {
      updateWords(seenWords, unseenWords);
    });
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
      {currentUnseenWord && <UnseenWordCard word={currentUnseenWord} />}
      {!currentUnseenWord && <ListOfWords words={seenWords} />}
    </>
  );
};
