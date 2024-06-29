import "./ListOfWords.css";
import { IWord } from "../../../../types/word";
import { WordCard } from "../../../../components/WordCard/WordCard";

interface ListOfWordsProps {
  words: IWord[];
}

export const ListOfWords = ({ words }: ListOfWordsProps) => {
  return (
    <div className="container">
      {words.map((word) => (
        <WordCard word={word} />
      ))}
    </div>
  );
};
