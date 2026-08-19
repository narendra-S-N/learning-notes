import { useState } from "react";
import type { Language } from "../types/notes";
import QuestionForm from "./QuestionForm";
import QuestionCard from "./QuestionCard";

interface LanguageCardProps {
  language: Language;

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

function LanguageCard({
  language,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onEditLanguage,
  onDeleteLanguage,
}: LanguageCardProps) {

  const [isOpen, setIsOpen] = useState(false);

  const [isEditingLanguage, setIsEditingLanguage] =
    useState(false);

  const [languageName, setLanguageName] =
    useState(language.name);

  const handleAddQuestion = (
    question: string,
    answer: string
  ) => {
    onAddQuestion(
      language.id,
      question,
      answer
    );
  };

  const handleEditLanguage = () => {
    if (!languageName.trim()) {
      return;
    }

    onEditLanguage(
      language.id,
      languageName.trim()
    );

    setIsEditingLanguage(false);
  };

  return (
    <div className="language-card">

      <div className="language-header">

        {isEditingLanguage ? (
          <input
            type="text"
            value={languageName}
            onChange={(e) =>
              setLanguageName(e.target.value)
            }
            onClick={(e) =>
              e.stopPropagation()
            }
          />
        ) : (
          <h2
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >
            {language.name}
          </h2>
        )}

        <div className="language-actions">

          {isEditingLanguage ? (
            <>
              <button
                onClick={handleEditLanguage}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setIsEditingLanguage(false)
                }
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  setIsEditingLanguage(true)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  onDeleteLanguage(language.id)
                }
              >
                Delete
              </button>

              <button
                className="arrow-btn"
                onClick={() =>
                  setIsOpen(!isOpen)
                }
              >
                {isOpen ? "▲" : "▼"}
              </button>
            </>
          )}

        </div>

      </div>

      {isOpen && !isEditingLanguage && (
        <div className="language-content">

          <QuestionForm
            onAddQuestion={handleAddQuestion}
          />

          <div className="question-list">

            {language.questions.length === 0 ? (
              <p className="no-questions">
                No questions added yet.
              </p>
            ) : (
              language.questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  onEdit={(
                    questionId,
                    questionText,
                    answer
                  ) =>
                    onEditQuestion(
                      language.id,
                      questionId,
                      questionText,
                      answer
                    )
                  }
                  onDelete={(questionId) =>
                    onDeleteQuestion(
                      language.id,
                      questionId
                    )
                  }
                />
              ))
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default LanguageCard;