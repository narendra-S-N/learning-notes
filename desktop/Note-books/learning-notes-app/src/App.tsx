import { useEffect, useState } from "react";

import LanguageForm from "./components/LanguageForm";
import LanguageList from "./components/LanguageList";

import type { Language } from "./types/notes";

import {
  getLanguages,
  saveLanguages,
} from "./utils/storage";

import "./App.css";

function App() {

  const [languages, setLanguages] =
    useState<Language[]>([]);

  // =========================
  // Load data
  // =========================

  useEffect(() => {

    const storedLanguages = getLanguages();

    setLanguages(storedLanguages);

  }, []);


  // =========================
  // Add Language
  // =========================

  const addLanguage = (name: string) => {

    const newLanguage: Language = {
      id: crypto.randomUUID(),
      name,
      questions: [],
    };

    const updatedLanguages = [
      ...languages,
      newLanguage,
    ];

    setLanguages(updatedLanguages);

    saveLanguages(updatedLanguages);
  };


  // =========================
  // Edit Language
  // =========================

  const editLanguage = (
    languageId: string,
    name: string
  ) => {

    const updatedLanguages =
      languages.map((language) => {

        if (language.id === languageId) {

          return {
            ...language,
            name,
          };

        }

        return language;

      });

    setLanguages(updatedLanguages);

    saveLanguages(updatedLanguages);
  };


  // =========================
  // Delete Language
  // =========================

  const deleteLanguage = (
    languageId: string
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this language?"
      );

    if (!confirmed) {
      return;
    }

    const updatedLanguages =
      languages.filter(
        (language) =>
          language.id !== languageId
      );

    setLanguages(updatedLanguages);

    saveLanguages(updatedLanguages);
  };


  // =========================
  // Add Question
  // =========================

  const addQuestion = (
    languageId: string,
    question: string,
    answer: string
  ) => {

    const newQuestion = {
      id: crypto.randomUUID(),
      question,
      answer,
    };

    const updatedLanguages =
      languages.map((language) => {

        if (language.id === languageId) {

          return {
            ...language,

            questions: [
              ...language.questions,
              newQuestion,
            ],
          };

        }

        return language;

      });

    setLanguages(updatedLanguages);

    saveLanguages(updatedLanguages);
  };


  // =========================
  // Edit Question
  // =========================

  const editQuestion = (
    languageId: string,
    questionId: string,
    question: string,
    answer: string
  ) => {

    const updatedLanguages =
      languages.map((language) => {

        if (language.id !== languageId) {
          return language;
        }

        const updatedQuestions =
          language.questions.map(
            (item) => {

              if (item.id === questionId) {

                return {
                  ...item,
                  question,
                  answer,
                };

              }

              return item;

            }
          );

        return {
          ...language,
          questions: updatedQuestions,
        };

      });

    setLanguages(updatedLanguages);

    saveLanguages(updatedLanguages);
  };


  // =========================
  // Delete Question
  // =========================

  const deleteQuestion = (
    languageId: string,
    questionId: string
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this question?"
      );

    if (!confirmed) {
      return;
    }

    const updatedLanguages =
      languages.map((language) => {

        if (language.id !== languageId) {
          return language;
        }

        return {
          ...language,

          questions:
            language.questions.filter(
              (question) =>
                question.id !== questionId
            ),
        };

      });

    setLanguages(updatedLanguages);

    saveLanguages(updatedLanguages);
  };


  return (
    <div className="app">

      <header className="app-header">

        <h1>
          My Learning Notes
        </h1>

        <p>
          Save and revise your programming knowledge
        </p>

      </header>


      <main>

        <LanguageForm
          onAddLanguage={addLanguage}
        />


        <LanguageList

          languages={languages}

          onAddQuestion={addQuestion}

          onEditQuestion={editQuestion}

          onDeleteQuestion={deleteQuestion}

          onEditLanguage={editLanguage}

          onDeleteLanguage={deleteLanguage}

        />

      </main>

    </div>
  );
}

export default App;