import "./Word.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createWord, editWord, getWord } from "../../api/words";
import { ICreateWordBody } from "../../types/word";

const FIELD_NAMES = {
  WORD: "word",
  TRANSLATION: "translation",
  KNOWLEDGE: "knowledge",
  RELEVANCE: "relevance",
} as const;

export const Word = () => {
  const navigate = useNavigate();

  const { wordId } = useParams();
  const isCreatingWord = useMemo(() => wordId === "add-word", [wordId]);

  const [word, setWord] = useState<ICreateWordBody>({
    knowledge: 3,
    relevance: 3,
    original: "",
    translation: "",
  });
  const [isSet, setIsSet] = useState(isCreatingWord);

  useEffect(() => {
    if (wordId && !isCreatingWord) {
      getWord(wordId).then(
        async ({ knowledge, original, relevance, translation }) => {
          setWord({ knowledge, original, relevance, translation });
          setIsSet(true);
        }
      );
    }
  }, [wordId]);

  const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    switch (event.currentTarget.id) {
      case FIELD_NAMES.WORD:
        setWord((word) => ({ ...word, original: value }));
        break;
      case FIELD_NAMES.TRANSLATION:
        setWord((word) => ({ ...word, translation: value }));
        break;
      case FIELD_NAMES.KNOWLEDGE:
        const knowledge = Number(value);
        if (knowledge >= 1 && knowledge <= 5) {
          setWord((word) => ({ ...word, knowledge }));
        }
        break;
      case FIELD_NAMES.RELEVANCE:
        const relevance = Number(value);
        if (relevance >= 1 && relevance <= 5) {
          setWord((word) => ({ ...word, relevance }));
        }
        break;
    }
  };

  const handleClickSave = async () => {
    if (!wordId || !word) {
      return;
    }

    const { original, translation, knowledge, relevance } = word;
    if (isCreatingWord) {
      const createdWord = await createWord({
        original,
        translation,
        knowledge,
        relevance,
      });
      navigate(`/word/${createdWord.id}`);
    } else {
      await editWord(wordId, { original, translation, knowledge, relevance });
    }
  };

  return (
    isSet && (
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
