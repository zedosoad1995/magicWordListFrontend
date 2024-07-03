import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IWord } from "../../types/word";
import "./WordCard.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { WORD_FIELD_NAMES } from "../../constants.ts/word";

interface WordCardProps {
  word: IWord;
  showAll?: boolean;
  editRatingInCard?: boolean;
  handleClickShow?: () => void;
  handleClickIsLearned?: () => void;
  handleChangeWord?: React.ChangeEventHandler<HTMLInputElement>;
}

export const WordCard = ({
  word,
  showAll = true,
  editRatingInCard = false,
  handleClickShow,
  handleChangeWord,
  handleClickIsLearned,
}: WordCardProps) => {
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/word/${word.id}`, {
      state: { from: window.location.pathname },
    });
  };

  return (
    <div className="card">
      <div className="card-content">
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
                  value={word.knowledge}
                  onChange={handleChangeWord}
                  id={WORD_FIELD_NAMES.KNOWLEDGE}
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
                  value={word.relevance}
                  onChange={handleChangeWord}
                  id={WORD_FIELD_NAMES.RELEVANCE}
                />
              ) : (
                <div>{word.relevance}</div>
              )}
            </div>
            {editRatingInCard && (
              <div
                onClick={handleClickIsLearned}
                className="wordCard-checkbox-field"
              >
                <input
                  type="checkbox"
                  checked={word.is_learned}
                  className="wordCard-learned-checkbox"
                />
                <label className="wordCard-learned-label">Learned</label>
              </div>
            )}
          </>
        )}
      </div>
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
