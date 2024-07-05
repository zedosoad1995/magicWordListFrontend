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

  const handleClickNext = async () => {
    if (!word) {
      return;
    }

    await editWord(word.id, {
      relevance: word.relevance,
      knowledge: word.knowledge,
      is_learned: word.is_learned,
      isSeen: true,
    });
    const nextWord = await getTrainingNextWord();
    setWord(nextWord);
    setShowAll(false);
  };

  const onSubmit = ({
    isLearned,
    knowledge,
    relevance,
  }: IEditWordValuesSchema) => {
    setWord((word) =>
      word
        ? {
            ...word,
            knowledge: knowledge,
            relevance: relevance,
            is_learned: isLearned,
          }
        : undefined
    );
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
          onSubmit={onSubmit}
        />
      )}
      {showAll && word && <button onClick={handleClickNext}>Next</button>}
    </>
  );
};
