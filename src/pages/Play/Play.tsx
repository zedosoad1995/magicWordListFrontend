import { useEffect, useState } from "react";
import { startTraining, getTrainingNextWord, editWord } from "../../api/words";
import { WordCard } from "../../components/WordCard/WordCard";
import { IWord } from "../../types/word";
import { IEditWordValuesSchema } from "../../schemas/word/editWordValues";

const FORM_ID = "play-word";

export const Play = () => {
  const [word, setWord] = useState<IWord>();

  useEffect(() => {
    (async () => {
      await startTraining();
      const nextWord = await getTrainingNextWord();
      setWord(nextWord);
    })();
  }, []);

  const [showAll, setShowAll] = useState(false);

  const handleClickShow = () => {
    setShowAll(true);
  };

  const handleClickNext = async ({
    isLearned,
    knowledge,
    relevance,
  }: IEditWordValuesSchema) => {
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
  };

  return (
    <>
      <h1>Play</h1>
      {word && (
        <WordCard
          word={word}
          handleClickShow={handleClickShow}
          editRatingInCard
          showAll={showAll}
          formId={FORM_ID}
          onSubmit={handleClickNext}
        />
      )}
      {showAll && word && (
        <button type="submit" form={FORM_ID}>
          Next
        </button>
      )}
    </>
  );
};
