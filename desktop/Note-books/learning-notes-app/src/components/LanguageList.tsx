import type { Language } from "../types/notes";
import LanguageCard from "./LanguageCard";

interface LanguageListProps {
  languages: Language[];

  onAddQuestion: (
    languageId: string,
    question: string,
    answer: string
  ) => void;

  onEditQuestion: (
    languageId: string,
    questionId: string,
    question: string,
    answer: string
  ) => void;

  onDeleteQuestion: (
    languageId: string,
    questionId: string
  ) => void;

  onEditLanguage: (
    languageId: string,
    name: string
  ) => void;

  onDeleteLanguage: (
    languageId: string
  ) => void;
}

function LanguageList({
  languages,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onEditLanguage,
  onDeleteLanguage,
}: LanguageListProps) {

  return (
    <div className="language-list">

      {languages.map((language) => (
        <LanguageCard
          key={language.id}
          language={language}
          onAddQuestion={onAddQuestion}
          onEditQuestion={onEditQuestion}
          onDeleteQuestion={onDeleteQuestion}
          onEditLanguage={onEditLanguage}
          onDeleteLanguage={onDeleteLanguage}
        />
      ))}

    </div>
  );
}

export default LanguageList;