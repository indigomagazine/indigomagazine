
const ResultCard = ({ result, onRetry }) => {
    if (!result) return null;

    return (
        <div className="result-card animate-fade-in-up">

            <h2 style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.2rem', marginBottom: '1rem', fontFamily: "Garamond, serif" }}>
                You are...
            </h2>
            <h1 className="result-title" style={{ fontFamily: "Garamond, serif" }}>
                {result.title}:
            </h1>
            <p className="result-description" style={{ fontFamily: "Garamond, serif" }}>
                {result.description}
            </p>

            <button
                onClick={onRetry}
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#C91C1D',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginTop: '20px',
                    cursor: 'pointer'
                }}
            >
                Retake Quiz ↺
            </button>
        </div>
    );
};

export default ResultCard;
