import React from 'react';
import { StandardTemplate } from '../Templates/StandardTemplate';
import { EditorialTemplate } from '../Templates/EditorialTemplate';
import { ValentinesTemplate } from '../Templates/Valentines';

const templates = {
  standard: StandardTemplate,
  editorial: EditorialTemplate,
  valentines: ValentinesTemplate,
};

export function Renderer({ article }) {
  if (!article) return null;

  // Select template based on article layout, fallback to standard
  const Template = templates[article.layout] || templates.standard;

  return <Template article={article} />;
}
