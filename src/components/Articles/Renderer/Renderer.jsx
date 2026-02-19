import React from 'react';
import { StandardTemplate } from '../Templates/StandardTemplate';
import { EditorialTemplate } from '../Templates/EditorialTemplate';
import { ValentineTemplate } from '../Templates/ValentineTemplate';

// wraps templates to an object 
const templates = {
  standard: StandardTemplate,
  editorial: EditorialTemplate,
  valentine: ValentineTemplate,
};

export function Renderer({ article }) {
  if (!article) return null;

  // Select template based on article layout, fallback to standard
  const Template = templates[article.layout] || templates.standard;

  return <Template article={article} />;
}
