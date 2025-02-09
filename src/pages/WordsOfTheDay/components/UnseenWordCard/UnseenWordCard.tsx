import "./UnseenWordCard.css";
import { IWord } from "../../../../types/word";
import { WordCard } from "../../../../components/WordCard/WordCard";
import { useState } from "react";
import { editWord } from "../../../../api/words";
import { useDailyWords } from "../../../../contexts/dailyWords";
import { IEditWordValuesSchema } from "../../../../schemas/word/editWordValues";
import { Button } from "../../../../components/Button/Button";
import { useLoadingCallback } from "../../../../hooks/useLoadingCallback";

const FORM_ID = "unseen-word";

interface ListOfWordsProps {
  word: IWord;
}

export const UnseenWordCard = ({ word }: ListOfWordsProps) => {
  const { moveUnseenWordToSeen } = useDailyWords();

  const [showAll, setShowAll] = useState(false);

  const handleClickShow = () => {
    setShowAll(true);
  };

  const { callback: handleClickNext, isLoading: isLoadingNext } =
    useLoadingCallback(
      async ({ isLearned, knowledge, relevance }: IEditWordValuesSchema) => {
        await editWord(word.id, {
          relevance: relevance,
          knowledge: knowledge,
          is_learned: isLearned,
          isSeen: true,
        });
        moveUnseenWordToSeen({ knowledge, relevance, is_learned: isLearned });
        setShowAll(false);
      }
    );

  return (
    <>
      <WordCard
        word={word}
        showAll={showAll}
        handleClickShow={handleClickShow}
        editRatingInCard
        formId={FORM_ID}
        onSubmit={handleClickNext}
      />
      {showAll && (
        <Button type="submit" form={FORM_ID} isLoading={isLoadingNext}>
          Next
        </Button>
      )}
    </>
  );
};
