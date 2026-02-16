
import { createFileRoute } from "@tanstack/react-router";
import QuizContainer from "../components/Quiz/QuizContainer";
// import "../../legacy/css/style.css";
import "../components/Quiz/css/quiz.css";
import quizData from "../components/Quiz/data/valentine-quiz.json";
import { useEffect, useState } from "react";
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
            {/* Spotify Embed Section */}
            <div style={{
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto 30px auto",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
            }}>
                <p style={{
                    fontFamily: "sans-serif",
                    fontSize: "24px",
                    fontWeight: "900",
                    marginBottom: "10px",
                    color: "#C91C1D",

                    lineHeight: "1.2"
                }}>
                    Play me
                </p>
                <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/5eDmyZuTRxBJre5FCuJdT5?utm_source=generator"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
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

