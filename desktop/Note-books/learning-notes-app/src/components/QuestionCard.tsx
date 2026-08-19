import { useState } from "react";
import type { Question } from "../types/notes";

interface QuestionCardProps {
  question: Question;
  onEdit: (
    questionId: string,
    question: string,
    answer: string
  ) => void;
  onDelete: (questionId: string) => void;
}

function QuestionCard({
  question,
  onEdit,
  onDelete,
}: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editQuestion, setEditQuestion] = useState(
    question.question
  );

  const [editAnswer, setEditAnswer] = useState(
    question.answer
  );

  const handleUpdate = () => {
    if (!editQuestion.trim() || !editAnswer.trim()) {
      return;
    }

    onEdit(
      question.id,
      editQuestion.trim(),
      editAnswer.trim()
    );

    setIsEditing(false);
  };

  return (
    <div className="question-card">

      <div
        className="question-header"
        onClick={() => {
          if (!isEditing) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <span>{question.question}</span>

        <span>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {isOpen && (
        <div className="answer">

          {isEditing ? (
            <div className="edit-question-form">

              <input
                type="text"
                value={editQuestion}
                onChange={(e) =>
                  setEditQuestion(e.target.value)
                }
              />

              <textarea
                value={editAnswer}
                onChange={(e) =>
                  setEditAnswer(e.target.value)
                }
                rows={5}
              />

              <div className="action-buttons">

                <button onClick={handleUpdate}>
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

              </div>

            </div>
          ) : (
            <>
              <p>{question.answer}</p>

              <div className="action-buttons">

                <button
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(question.id)}
                >
                  Delete
                </button>

              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default QuestionCard;