import "./Word.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editWord, getWord } from "../../api/words";
import { IWord } from "../../types/word";

const FIELD_NAMES = {
  WORD: "word",
  TRANSLATION: "translation",
  KNOWLEDGE: "knowledge",
  RELEVANCE: "relevance",
} as const;

export const Word = () => {
  const { wordId } = useParams();
  const [word, setWord] = useState<IWord>();

  useEffect(() => {
    if (wordId) {
      getWord(wordId).then((word) => setWord(word));
    }
  }, [wordId]);

  const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();

    switch (event.currentTarget.id) {
      case FIELD_NAMES.WORD:
        setWord((word) => (word ? { ...word, original: value } : undefined));
        break;
      case FIELD_NAMES.TRANSLATION:
        setWord((word) => (word ? { ...word, translation: value } : undefined));
        break;
      case FIELD_NAMES.KNOWLEDGE:
        const knowledge = Number(value);
        if (knowledge >= 1 && knowledge <= 5) {
          setWord((word) => (word ? { ...word, knowledge } : undefined));
        }
        break;
      case FIELD_NAMES.RELEVANCE:
        const relevance = Number(value);
        if (relevance >= 1 && relevance <= 5) {
          setWord((word) => (word ? { ...word, relevance } : undefined));
        }
        break;
    }
  };

  const handleClickSave = async () => {
    if (!wordId || !word) {
      return;
    }

    const { original, translation, knowledge, relevance } = word;
    await editWord(wordId, { original, translation, knowledge, relevance });
  };

  return (
    word && (
      <div className="word-container">
        <div className="word-field">
          <label>Word</label>
          <input
            value={word?.original}
            onChange={handleWordChange}
            id={FIELD_NAMES.WORD}
          />
        </div>
        <div className="word-field">
          <label>Translation</label>
          <input
            value={word?.translation}
            onChange={handleWordChange}
            id={FIELD_NAMES.TRANSLATION}
          />
        </div>
        <div className="word-field">
          <label>Knowledge (1-5)</label>
          <input
            value={word?.knowledge}
            onChange={handleWordChange}
            type="number"
            min={1}
            max={5}
            id={FIELD_NAMES.KNOWLEDGE}
          />
        </div>
        <div className="word-field">
          <label>Relevance (1-5)</label>
          <input
            value={word?.relevance}
            onChange={handleWordChange}
            type="number"
            min={1}
            max={5}
            id={FIELD_NAMES.RELEVANCE}
          />
        </div>
        <button className="word-save-button" onClick={handleClickSave}>
          Save
        </button>
      </div>
    )
  );
};
