import "./UnseenWordCard.css";
import { IWord } from "../../../../types/word";
import { WordCard } from "../../../../components/WordCard/WordCard";
import { useState } from "react";
import { editWord } from "../../../../api/words";
import { useDailyWords } from "../../../../contexts/dailyWords";
import { IEditWordValuesSchema } from "../../../../schemas/word/editWordValues";

const FORM_ID = "unseen-word";

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

  const onSubmit = ({
    isLearned,
    knowledge,
    relevance,
  }: IEditWordValuesSchema) => {
    updateUnseenWord((word) => ({
      ...word,
      knowledge: knowledge,
      relevance: relevance,
      is_learned: isLearned,
    }));
  };

  return (
    <>
      <WordCard
        word={word}
        showAll={showAll}
        handleClickShow={handleClickShow}
        editRatingInCard
        formId={FORM_ID}
        onSubmit={onSubmit}
      />
      {showAll && <button onClick={handleClickNext}>Next</button>}
    </>
  );
};
