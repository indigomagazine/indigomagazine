import React from 'react';

/**
 * QuoteBlock — a large pull-quote component.
 *
 * Props (all optional except `text`):
 *  - text        : string   — the quote body (required)
 *  - speaker     : string   — attribution line shown below the quote
 *  - fontSize    : string   — CSS font-size for the quote text  (default: clamp(1.8rem, 4.5vw, 3.5rem))
 *  - fontFamily  : string   — CSS font-family                    (default: 'Georgia, serif')
 *  - color       : string   — text color for the quote           (default: '#000')
 *  - accentColor : string   — color for the speaker name         (default: '#555')
 *  - className   : string   — extra class name for the wrapper
 */
export const QuoteBlock = ({
    text,
    speaker,
    fontSize,
    fontFamily,
    color,
    accentColor,
    className = '',
}) => {
    const quoteStyle = {
        fontSize: fontSize || 'clamp(1.8rem, 4.5vw, 3.5rem)',
        fontFamily: fontFamily || 'Georgia, serif',
        color: color || '#ca92f0ff',
        lineHeight: 1.3,
        fontWeight: 30,
        textAlign: 'center',
        margin: '0 auto',
        maxWidth: '900px',
    };

    const speakerStyle = {
        color: accentColor || '#555',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginTop: '1.5rem',
        fontFamily: 'sans-serif',
    };

    return (
        <div className={`block-quote ${className}`} style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <blockquote style={quoteStyle}>
                &ldquo;{text}&rdquo;
            </blockquote>
            {speaker && (
                <p style={speakerStyle}>{speaker}</p>
            )}
        </div>
    );
};
