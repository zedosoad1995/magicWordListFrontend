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
  handleChangeWord?: React.ChangeEventHandler<HTMLInputElement>;
}

export const WordCard = ({
  word,
  showAll = true,
  editRatingInCard = false,
  handleClickShow,
  handleChangeWord,
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
                Knowledge (1-5){editRatingInCard ? "" : ":"}
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
                Relevance (1-5){editRatingInCard ? "" : ":"}
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
