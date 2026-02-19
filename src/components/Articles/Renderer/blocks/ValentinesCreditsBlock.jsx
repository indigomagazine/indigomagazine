import React from 'react';

export const ValentinesCreditsBlock = ({
  designers,
  photographers,
  graphics,
  styling,
  quiz,
  socialsEvents,
  models,
}) => {
  const hasCredits =
    designers || photographers || graphics || styling || quiz || socialsEvents || models;
  if (!hasCredits) return null;

  return (
    <footer className="block-valentines-credits">
      {designers && <p className="credits-line">Designed by {designers}</p>}
      {photographers && <p className="credits-line">Photographed by {photographers}</p>}
      {graphics && <p className="credits-line">Graphics and Creative Direction by {graphics}</p>}
      {styling && <p className="credits-line">Styling by {styling}</p>}
      {quiz && <p className="credits-line">Quiz by {quiz}</p>}
      {socialsEvents && <p className="credits-line">Socials and Events by {socialsEvents}</p>}
      {models && <p className="credits-line">Models: {models}</p>}
    </footer>
  );
};
