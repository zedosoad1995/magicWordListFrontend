import { useEffect, useState } from "react";
import { startTraining, getTrainingNextWord, editWord } from "../../api/words";
import { WordCard } from "../../components/WordCard/WordCard";
import { IWord } from "../../types/word";
import { WORD_FIELD_NAMES } from "../../constants.ts/word";

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

  const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    switch (event.currentTarget.id) {
      case WORD_FIELD_NAMES.KNOWLEDGE:
        const knowledge = Number(value);
        if (knowledge >= 1 && knowledge <= 5) {
          setWord((word) => (word ? { ...word, knowledge } : undefined));
        }
        break;
      case WORD_FIELD_NAMES.RELEVANCE:
        const relevance = Number(value);
        if (relevance >= 1 && relevance <= 5) {
          setWord((word) => (word ? { ...word, relevance } : undefined));
        }
        break;
    }
  };

  const handleClickIsLearned = () => {
    setWord((word) =>
      word ? { ...word, is_learned: !word.is_learned } : undefined
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
          handleChangeWord={handleWordChange}
          showAll={showAll}
          handleClickIsLearned={handleClickIsLearned}
        />
      )}
      {showAll && word && <button onClick={handleClickNext}>Next</button>}
    </>
  );
};
