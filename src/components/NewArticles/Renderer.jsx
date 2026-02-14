import React from 'react';
import { StandardTemplate } from './templates/StandardTemplate';
import { EditorialTemplate } from './templates/EditorialTemplate';

// wraps templates to an object 
const templates = {
  standard: StandardTemplate,
  editorial: EditorialTemplate,
};

export function Renderer({ article }) {
  if (!article) return null;

  // Select template based on article layout, fallback to standard
  const Template = templates[article.layout] || templates.standard;

  return <Template article={article} />;
}
