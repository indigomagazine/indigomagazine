
const OptionButton = ({ text, onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`option-button ${disabled ? 'disabled' : ''} ${className || ''}`}
        >
            {text}
        </button>
    );
};

export default OptionButton;
