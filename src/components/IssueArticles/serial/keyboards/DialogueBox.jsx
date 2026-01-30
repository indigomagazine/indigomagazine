import { useState, useEffect } from 'react';
import styles from './keyboards.module.css';

export default function DialogueBox({ text, type = 'normal', showCursor = false }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    typeText();
  }, [text]);

  const getTextClass = () => {
    switch (type) {
      case 'code':
        return styles.codeText;
      case 'error':
        return styles.errorText;
      default:
        return styles.dialogueText;
    }
  };

  return (
    <div className={styles.dialogueBox}>
      <div className={getTextClass()}>
        {displayedText}
        {showCursor && isTyping && <span className={styles.cursor}></span>}
      </div>
    </div>
  );
}
