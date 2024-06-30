import "./Word.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createWord, deleteWord, editWord, getWord } from "../../api/words";
import { ICreateWordBody } from "../../types/word";
import { WORD_FIELD_NAMES } from "../../constants.ts/word";

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
      case WORD_FIELD_NAMES.WORD:
        setWord((word) => ({ ...word, original: value }));
        break;
      case WORD_FIELD_NAMES.TRANSLATION:
        setWord((word) => ({ ...word, translation: value }));
        break;
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

  const handleClickDelete = async () => {
    if (!wordId) {
      return;
    }

    await deleteWord(wordId);
    navigate("/");
  };

  const handleClickBack = () => {
    navigate("/");
  };

  return (
    <>
      <button onClick={handleClickBack}>Back</button>
      <h2>{isCreatingWord ? "Add Word" : "Edit Word"}</h2>
      {isSet && (
        <div className="word-container">
          <div className="word-field">
            <label>Word</label>
            <input
              value={word.original}
              onChange={handleWordChange}
              id={WORD_FIELD_NAMES.WORD}
            />
          </div>
          <div className="word-field">
            <label>Translation</label>
            <input
              value={word.translation}
              onChange={handleWordChange}
              id={WORD_FIELD_NAMES.TRANSLATION}
            />
          </div>
          <div className="word-field">
            <label>Knowledge (1-5)</label>
            <input
              value={word.knowledge}
              onChange={handleWordChange}
              type="number"
              min={1}
              max={5}
              id={WORD_FIELD_NAMES.KNOWLEDGE}
            />
          </div>
          <div className="word-field">
            <label>Relevance (1-5)</label>
            <input
              value={word.relevance}
              onChange={handleWordChange}
              type="number"
              min={1}
              max={5}
              id={WORD_FIELD_NAMES.RELEVANCE}
            />
          </div>
          <div className="word-buttons-group">
            <button onClick={handleClickSave}>Save</button>
            {!isCreatingWord && (
              <button onClick={handleClickDelete}>Delete</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
