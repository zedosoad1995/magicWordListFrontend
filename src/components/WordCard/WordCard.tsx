import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IWord } from "../../types/word";
import "./WordCard.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IEditWordValuesSchema,
  editWordValuesSchema,
} from "../../schemas/word/editWordValues";
import { useEffect } from "react";

interface WordCardProps {
  word: IWord;
  showAll?: boolean;
  editRatingInCard?: boolean;
  handleClickShow?: () => void;
  formId?: string;
  onSubmit?: (data: IEditWordValuesSchema) => void;
}

export const WordCard = ({
  word,
  showAll = true,
  editRatingInCard = false,
  handleClickShow,
  formId,
  onSubmit,
}: WordCardProps) => {
  const { register, handleSubmit, reset } = useForm<IEditWordValuesSchema>({
    resolver: zodResolver(editWordValuesSchema),
    defaultValues: {
      knowledge: word.knowledge,
      relevance: word.relevance,
      isLearned: word.is_learned,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    reset({
      knowledge: word.knowledge,
      relevance: word.relevance,
      isLearned: word.is_learned,
    });
  }, [word, reset]);

  const handleClickEdit = () => {
    navigate(`/word/${word.id}`, {
      state: { from: window.location.pathname },
    });
  };

  return (
    <div className="card">
      <form
        className="card-content"
        id={formId}
        onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
      >
        <div>{word.original}</div>
        {!showAll && <button onClick={handleClickShow}>Show</button>}
        {showAll && (
          <>
            <div>{word.translation}</div>
            <div className="rating">
              <label className="rating-label">
                Knowledge{editRatingInCard ? " (1-5)" : ":"}
              </label>
              {editRatingInCard ? (
                <input
                  type="number"
                  min={1}
                  max={5}
                  {...register("knowledge", { valueAsNumber: true })}
                />
              ) : (
                <div>{word.knowledge}</div>
              )}
            </div>
            <div className="rating">
              <label className="rating-label">
                Relevance{editRatingInCard ? " (1-5)" : ":"}
              </label>
              {editRatingInCard ? (
                <input
                  type="number"
                  min={1}
                  max={5}
                  {...register("relevance", { valueAsNumber: true })}
                />
              ) : (
                <div>{word.relevance}</div>
              )}
            </div>
            {editRatingInCard && (
              <div>
                <input
                  type="checkbox"
                  className="wordCard-learned-checkbox"
                  {...register("isLearned")}
                />
                <label className="wordCard-learned-label">Learned</label>
              </div>
            )}
          </>
        )}
      </form>
      {showAll && (
        <FontAwesomeIcon
          className="card-edit-icon"
          icon={faEdit}
          onClick={handleClickEdit}
        />
      )}
    </div>
  );
};
