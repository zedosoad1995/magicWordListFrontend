import "./UnseenWordCard.css";
import { IWord } from "../../../../types/word";
import { WordCard } from "../../../../components/WordCard/WordCard";
import { useState } from "react";
import { editWord } from "../../../../api/words";

interface ListOfWordsProps {
  word: IWord;
  handleClickNext: () => void;
}

export const UnseenWordCard = ({ word, handleClickNext }: ListOfWordsProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleClickShow = () => {
    setShowAll(true);
  };

  const handleClickNextInner = async () => {
    await editWord(word.id, { isSeen: true });
    handleClickNext();
    setShowAll(false);
  };

  return (
    <>
      <WordCard
        word={word}
        showAll={showAll}
        handleClickShow={handleClickShow}
      />
      {showAll && <button onClick={handleClickNextInner}>Next</button>}
    </>
  );
};
