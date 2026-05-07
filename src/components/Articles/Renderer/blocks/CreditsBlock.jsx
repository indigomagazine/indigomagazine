import React from 'react';

/**
 * CreditsBlock — renders author / reporter / editor credits at the bottom of an article.
 *
 * Props:
 *  - author   : string
 *  - reporter : string
 *  - editor   : string
 */
export const CreditsBlock = ({ author, reporter, editor, photographer }) => {
    const wrapperStyle = {
        borderTop: '1px solid #ddd',
        marginTop: '4rem',
        paddingTop: '2rem',
        fontSize: '0.85rem',
        color: '#555',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        lineHeight: 2,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    };

    return (
        <div className="block-credits" style={wrapperStyle}>
            {author && <p><strong>Written & Reported by</strong> {author}</p>}
            {photographer && <p><strong>Photography by</strong> {photographer}</p>}
            {editor && <p><strong>Edited by</strong> {editor}</p>}
        </div>
    );
};
