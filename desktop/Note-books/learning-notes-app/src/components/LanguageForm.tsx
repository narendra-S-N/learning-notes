import { useState } from "react";

interface LanguageFormProps {
  onAddLanguage: (name: string) => void;
}

function LanguageForm({ onAddLanguage }: LanguageFormProps) {
  const [languageName, setLanguageName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!languageName.trim()) {
      return;
    }

    onAddLanguage(languageName.trim());

    setLanguageName("");
  };

  return (
    <form onSubmit={handleSubmit} className="language-form">
      <input
        type="text"
        placeholder="Enter language / technology"
        value={languageName}
        onChange={(e) => setLanguageName(e.target.value)}
      />

      <button type="submit">
        Add Language
      </button>
    </form>
  );
}

export default LanguageForm;