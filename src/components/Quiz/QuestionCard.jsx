
const QuestionCard = ({ question }) => {
    return (
        <div className="question-card">
            <h2 className="question-text">
                {question}
            </h2>
        </div>
    );
};

export default QuestionCard;
