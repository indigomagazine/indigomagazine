import React from 'react';
import Taskbar from '../../Home/Taskbar';
import { ValentinesTitleBlock } from '../Renderer/blocks/ValentinesTitleBlock';
import { ValentinesCreditsBlock } from '../Renderer/blocks/ValentinesCreditsBlock';
import { ValentinesParaTitleBlock } from '../Renderer/blocks/ValentinesParaTitleBlock';
import { ValentinesParagraphBlock } from '../Renderer/blocks/ValentinesParagraphBlock';
import { HScrollGalleryBlock } from '../Renderer/blocks/HScrollGalleryBlock';
import { ValentinesHScrollGalleryBlock } from '../Renderer/blocks/ValentinesHScrollGalleryBlock';
import { VideoGalleryBlock } from '../Renderer/blocks/VideoGalleryBlock';
import '../../../styles/homepage.css';
import '../../../styles/articles/look-valentines.css';

export function ValentinesTemplate({ article }) {
  return (
    <div className="look-valentines">
      <Taskbar />
      <article className="article-container">
        <ValentinesTitleBlock author={article.author} />

        <main>
          {article.content.map((block, index) => {
            switch (block.type) {
              case 'valentinesParaTitle':
                return <ValentinesParaTitleBlock key={index} value={block.value} />;
              case 'valentinesParagraph':
                return <ValentinesParagraphBlock key={index} value={block.value} />;
              case 'hScrollGallery':
                return <HScrollGalleryBlock key={index} images={block.images} />;
              case 'valentinesHScrollGallery':
                return (
                  <ValentinesHScrollGalleryBlock
                    key={index}
                    images={block.images}
                    textBlurb={block.textBlurb}
                  />
                );
              case 'videoGallery':
                return <VideoGalleryBlock key={index} url={block.url} />;
              default:
                return null;
            }
          })}
        </main>

        <ValentinesCreditsBlock
          designers={article.designers}
          photographers={article.photographers}
          graphics={article.graphics}
          styling={article.styling}
          quiz={article.quiz}
          socialsEvents={article.socialsEvents}
          models={article.models}
        />
      </article>
    </div>
  );
}
