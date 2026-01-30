import styles from './keyboards.module.css';

export default function ChoiceButtons({ choices, onChoice }) {
  return (
    <div className={styles.choicesContainer}>
      {choices.map((choice, index) => (
        <button
          key={index}
          className={styles.choiceButton}
          onClick={() => onChoice(choice.value)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
