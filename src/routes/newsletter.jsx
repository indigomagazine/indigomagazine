import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import '../styles/newsletter.css';

export const Route = createFileRoute('/newsletter')({
    component: NewsletterPage,
});

function ZellePay() {
    const [showNumber, setShowNumber] = useState(false);
    const [copied, setCopied] = useState(false);
    const phoneNumber = "936-828-9969"; // Change this to your actual phone number

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(phoneNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!showNumber) {
        return (
            <button
                type="button"
                className="zelle-button"
                onClick={() => setShowNumber(true)}
            >
                Pay with Zelle
            </button>
        );
    }

    return (
        <button
            type="button"
            className={`zelle-button ${copied ? 'copied' : 'copyable'}`}
            onClick={handleCopy}
            title="Click to copy"
        >
            {copied ? "Number Copied!" : phoneNumber}
        </button>
    );
}

function NewsletterPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Simulate a brief delay for testing UI
            await new Promise(resolve => setTimeout(resolve, 500));

            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxbkS2qofItsjBRoZ4W6gAq4w0HpJtgG2uNXXexLgPYKgcYTIoimTMQIB8g6JcUqHiB/exec';

            const formData = new FormData();
            formData.append('email', email);
            formData.append('timestamp', new Date().toISOString());

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Use no-cors since we don't need to read the response body and it avoids CORS preflight issues
                body: formData,
            });

            // With mode: 'no-cors', the response will be 'opaque', so we assume success if no error was thrown
            setStatus('success');
        } catch (error) {
            console.error('Submission failed:', error);
            setStatus('error');
        }
    };

    // State B: Confirmation Design
    if (status === 'success') {
        return (
            <div className="newsletter-page">
                <div className="newsletter-content">
                    <div className="confirmation-container">
                        <img src="/assets/newsletter/thankYou.svg" alt="Thank You" className="thank-you-svg" />
                        <img src="/assets/newsletter/popupText1.svg" alt="Confirmation text" className="popup-text-svg" />
                        <img src="/assets/newsletter/popupText.svg" alt="Confirmation text" className="popup-text-svg" />
                        <button
                            type="button"
                            className="reset-button"
                            onClick={() => {
                                setEmail('');
                                setStatus('idle');
                            }}
                        >
                            Register another email
                        </button>
                        <ZellePay />
                    </div>
                </div>
                <div className="newsletter-footer">
                    <img src="/assets/newsletter/title1.svg" alt="LÙ-TROI" className="footer-title1" />
                    <img src="/assets/newsletter/title2.svg" alt="collection" className="footer-title2" />
                </div>
            </div>
        );
    }

    // State A: Initial Entry Design
    return (
        <div className="newsletter-page">
            <div className="newsletter-content">
                <div className="newsletter-container">
                    <img src="/assets/newsletter/mainText.svg" alt="Let Us Know Your Email" className="main-text-svg" />

                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <div className="input-wrapper">
                                <img src="/assets/newsletter/textBox.svg" alt="" className="text-box-svg" />
                                <input
                                    id="emailInput"
                                    className="newsletter-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    disabled={status === 'submitting'}
                                />
                            </div>
                        </div>

                        <div className="submit-button-wrapper">
                            {isValidEmail && (
                                <button className="custom-submit-button" type="submit" disabled={status === 'submitting'}>
                                    <img src="/assets/newsletter/submit.svg" alt="Submit" className="submit-svg" />
                                </button>
                            )}
                        </div>

                        {status === 'error' && (
                            <p className="error-message">There was an error submitting your email. Please try again.</p>
                        )}
                    </form>
                    <ZellePay />
                </div>
            </div>
            <div className="newsletter-footer">
                <img src="/assets/newsletter/title1.svg" alt="LÙ-TROI" className="footer-title1" />
                <img src="/assets/newsletter/title2.svg" alt="collection" className="footer-title2" />


            </div>
        </div>
    );
}
