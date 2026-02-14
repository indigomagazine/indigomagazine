
import { createFileRoute } from "@tanstack/react-router";
import QuizContainer from "../components/Quiz/QuizContainer";
// import "../../legacy/css/style.css";
import "../components/Quiz/css/quiz.css";
import quizData from "../components/Quiz/data/valentine-quiz.json";
import { useEffect } from "react";
import SerialPromo from "../components/Quiz/SerialPromo";

export const Route = createFileRoute("/quiz")({
    component: QuizPage,
});

function QuizPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="quiz-wrapper">
            <div className="quiz-header">
                <h1>Valentine's Quiz</h1>
                <p>{quizData.title}</p>
            </div>

            <main>
                <QuizContainer />
            </main>

            <SerialPromo />

            <footer className="mt-16 text-center text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} Indigo Magazine</p>
            </footer>
        </div>
    );
}
