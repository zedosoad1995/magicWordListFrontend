import { useEffect, useState } from "react";
import { ListOfWords } from "../../components/ListOfWords/ListOfWords";
import { IWord } from "../../types/word";
import { getWords } from "../../api/words";
import { useNavigate } from "react-router-dom";

export const Words = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    getWords().then(({ words }) => setWords(words));
  }, []);

  const handleClickAddWord = () => {
    navigate("/word/add-word", { state: { from: window.location.pathname } });
  };

  return (
    <>
      <h1>Words</h1>
      <button className="add-word-button" onClick={handleClickAddWord}>
        Add Word
      </button>
      <ListOfWords words={words} />
    </>
  );
};
