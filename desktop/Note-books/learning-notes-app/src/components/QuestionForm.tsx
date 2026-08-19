import { useState } from "react";

interface QuestionFormProps {
  onAddQuestion: (question: string, answer: string) => void;
}

function QuestionForm({ onAddQuestion }: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      return;
    }

    onAddQuestion(question.trim(), answer.trim());

    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">

      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <textarea
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={5}
      />

      <button type="submit">
        Add Question
      </button>

    </form>
  );
}

export default QuestionForm;