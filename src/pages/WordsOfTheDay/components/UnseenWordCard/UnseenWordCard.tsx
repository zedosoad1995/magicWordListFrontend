import "./UnseenWordCard.css";
import { IWord } from "../../../../types/word";
import { WordCard } from "../../../../components/WordCard/WordCard";
import { useState } from "react";
import { editWord } from "../../../../api/words";
import { WORD_FIELD_NAMES } from "../../../../constants.ts/word";

interface ListOfWordsProps {
  word: IWord;
  setWord: React.Dispatch<React.SetStateAction<IWord>>;
  handleClickNext: () => void;
}

export const UnseenWordCard = ({
  word,
  setWord,
  handleClickNext,
}: ListOfWordsProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleClickShow = () => {
    setShowAll(true);
  };

  const handleClickNextInner = async () => {
    await editWord(word.id, {
      relevance: word.relevance,
      knowledge: word.knowledge,
      isSeen: true,
    });
    handleClickNext();
    setShowAll(false);
  };

  const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    switch (event.currentTarget.id) {
      case WORD_FIELD_NAMES.KNOWLEDGE:
        const knowledge = Number(value);
        if (knowledge >= 1 && knowledge <= 5) {
          setWord((word) => ({ ...word, knowledge }));
        }
        break;
      case WORD_FIELD_NAMES.RELEVANCE:
        const relevance = Number(value);
        if (relevance >= 1 && relevance <= 5) {
          setWord((word) => ({ ...word, relevance }));
        }
        break;
    }
  };

  return (
    <>
      <WordCard
        word={word}
        showAll={showAll}
        handleClickShow={handleClickShow}
        editRatingInCard
        handleChangeWord={handleWordChange}
      />
      {showAll && <button onClick={handleClickNextInner}>Next</button>}
    </>
  );
};
