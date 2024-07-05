import "./Word.css";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createWord, deleteWord, editWord, getWord } from "../../api/words";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IWordSchema, wordSchema } from "../../schemas/word/word";

export const Word = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IWordSchema>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      knowledge: 3,
      relevance: 3,
      original: "",
      translation: "",
      isLearned: false,
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const previousURL = location.state?.from;

  const { wordId } = useParams();
  const isCreatingWord = useMemo(() => wordId === "add-word", [wordId]);
  const [isSet, setIsSet] = useState(isCreatingWord);

  useEffect(() => {
    if (wordId && !isCreatingWord) {
      getWord(wordId).then(
        async ({ knowledge, original, relevance, translation }) => {
          reset({
            knowledge,
            original,
            relevance,
            translation,
            isLearned: false,
          });
          setIsSet(true);
        }
      );
    }
  }, [wordId]);

  const handleClickSave = async (word: IWordSchema) => {
    if (!wordId || !word) {
      return;
    }

    const { original, translation, knowledge, relevance, isLearned } = word;
    if (isCreatingWord) {
      await createWord({
        original,
        translation,
        knowledge,
        relevance,
      });
      navigate(previousURL ?? "/");
    } else {
      await editWord(wordId, {
        original,
        translation,
        knowledge,
        relevance,
        is_learned: isLearned,
      });
    }
  };

  const handleClickDelete = async () => {
    if (!wordId) {
      return;
    }

    await deleteWord(wordId);
    navigate(previousURL ?? "/");
  };

  const handleClickBack = () => {
    navigate(previousURL ?? "/");
  };

  return (
    <>
      <button onClick={handleClickBack}>Back</button>
      <h2>{isCreatingWord ? "Add Word" : "Edit Word"}</h2>
      {isSet && (
        <form
          className="word-container"
          onSubmit={handleSubmit(handleClickSave)}
        >
          <div className="word-field">
            <label>Word</label>
            <input {...register("original")} />
          </div>
          <div className="word-field">
            <label>Translation</label>
            <input {...register("translation")} />
          </div>
          <div className="word-field">
            <label>Knowledge (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              {...register("knowledge", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="word-field">
            <label>Relevance (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              {...register("relevance", {
                valueAsNumber: true,
              })}
            />
          </div>
          {!isCreatingWord && (
            <div>
              <input
                type="checkbox"
                className="word-learned-checkbox"
                {...register("isLearned")}
              />
              <label className="word-learned-label">Learned</label>
            </div>
          )}
          <div className="word-buttons-group">
            <button type="submit" disabled={!isValid}>
              Save
            </button>
            {!isCreatingWord && (
              <button onClick={handleClickDelete}>Delete</button>
            )}
          </div>
        </form>
      )}
    </>
  );
};
