import { useEffect, useState } from "react";
import { startTraining, getTrainingNextWord, editWord } from "../../api/words";
import { WordCard } from "../../components/WordCard/WordCard";
import { IWord } from "../../types/word";
import { IEditWordValuesSchema } from "../../schemas/word/editWordValues";
import { Button } from "../../components/Button/Button";
import { useLoadingCallback } from "../../hooks/useLoadingCallback";

const FORM_ID = "play-word";

export const Play = () => {
  const [word, setWord] = useState<IWord>();
  const [showAll, setShowAll] = useState(false);
  const [hasNoWords, setHasNoWords] = useState(false);

  const {
    callback: handleStartTraining,
    isLoading,
    isSet,
  } = useLoadingCallback(async () => {
    const { totalWordsToLearn } = await startTraining();
    setHasNoWords(totalWordsToLearn === 0);
    if (totalWordsToLearn === 0) {
      return;
    }

    const nextWord = await getTrainingNextWord();
    setWord(nextWord);
  });

  useEffect(() => {
    handleStartTraining();
  }, []);

  const handleClickShow = () => {
    setShowAll(true);
  };

  const { callback: handleClickNext, isLoading: isLoadingNext } =
    useLoadingCallback(
      async ({ isLearned, knowledge, relevance }: IEditWordValuesSchema) => {
        if (!word) {
          return;
        }

        await editWord(word.id, {
          relevance: relevance,
          knowledge: knowledge,
          is_learned: isLearned,
          isSeen: true,
        });
        const nextWord = await getTrainingNextWord();
        setWord(nextWord);
        setShowAll(false);
      }
    );

  const showWord = word && !isLoading && isSet;

  return (
    <>
      <h1>Play</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && hasNoWords && (
        <>
          <div>No words to show.</div>
          <div>You must add new ones to use this mode.</div>
        </>
      )}
      {showWord && (
        <>
          <WordCard
            word={word}
            handleClickShow={handleClickShow}
            editRatingInCard
            showAll={showAll}
            formId={FORM_ID}
            onSubmit={handleClickNext}
          />
          {showAll && (
            <Button type="submit" form={FORM_ID} isLoading={isLoadingNext}>
              Next
            </Button>
          )}
        </>
      )}
    </>
  );
};
