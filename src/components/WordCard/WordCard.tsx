import { IWord } from "../../types/word";
import "./WordCard.css";

interface WordCardProps {
  word: IWord;
  showAll?: boolean;
  handleClickShow?: () => void;
}

export const WordCard = ({
  word,
  showAll = true,
  handleClickShow,
}: WordCardProps) => {
  return (
    <div className="card">
      <div>{word.original}</div>
      {!showAll && <button onClick={handleClickShow}>Show</button>}
      {showAll && (
        <>
          <div>{word.translation}</div>
          <div className="rating">
            <label className="rating-label">Knowledge:</label>
            <div>{word.knowledge}</div>
          </div>
          <div className="rating">
            <label className="rating-label">Relevance:</label>
            <div>{word.relevance}</div>
          </div>
        </>
      )}
    </div>
  );
};
