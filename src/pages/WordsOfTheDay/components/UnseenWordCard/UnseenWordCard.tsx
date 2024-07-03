import "./UnseenWordCard.css";
import { IWord } from "../../../../types/word";
import { WordCard } from "../../../../components/WordCard/WordCard";
import { useState } from "react";
import { editWord } from "../../../../api/words";
import { WORD_FIELD_NAMES } from "../../../../constants.ts/word";
import { useDailyWords } from "../../../../contexts/dailyWords";

interface ListOfWordsProps {
  word: IWord;
}

export const UnseenWordCard = ({ word }: ListOfWordsProps) => {
  const { moveUnseenWordToSeen, updateUnseenWord } = useDailyWords();

  const [showAll, setShowAll] = useState(false);

  const handleClickShow = () => {
    setShowAll(true);
  };

  const handleClickNext = async () => {
    await editWord(word.id, {
      relevance: word.relevance,
      knowledge: word.knowledge,
      is_learned: word.is_learned,
      isSeen: true,
    });
    moveUnseenWordToSeen();
    setShowAll(false);
  };

  const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    switch (event.currentTarget.id) {
      case WORD_FIELD_NAMES.KNOWLEDGE:
        const knowledge = Number(value);
        if (knowledge >= 1 && knowledge <= 5) {
          updateUnseenWord((word) => ({ ...word, knowledge }));
        }
        break;
      case WORD_FIELD_NAMES.RELEVANCE:
        const relevance = Number(value);
        if (relevance >= 1 && relevance <= 5) {
          updateUnseenWord((word) => ({ ...word, relevance }));
        }
        break;
    }
  };

  const handleClickIsLearned = () => {
    updateUnseenWord((word) => ({ ...word, is_learned: !word.is_learned }));
  };

  return (
    <>
      <WordCard
        word={word}
        showAll={showAll}
        handleClickShow={handleClickShow}
        editRatingInCard
        handleChangeWord={handleWordChange}
        handleClickIsLearned={handleClickIsLearned}
      />
      {showAll && <button onClick={handleClickNext}>Next</button>}
    </>
  );
};
