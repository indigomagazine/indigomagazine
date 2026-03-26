# How to Build Custom Layouts and Blocks

The Indigo Magazine article system is designed to be highly extensible. If the default layouts and content blocks do not meet your design needs, you can easily create your own custom blocks and apply fully personalized layouts.

---

## 1. Creating Custom Content Blocks

A "Block" is an individual piece of content within an article (e.g., a text paragraph, an image, a video player, or a custom interactive widget).

### Step 1: Create the Component
Create a new React component file in `src/components/Articles/Renderer/blocks/`.
For example, `MyCustomBlock.jsx` might look like:

```jsx
import React from 'react';

// The props destructured here should match the fields you define in your JSON file.
export const MyCustomBlock = ({ text, highlightColor }) => (
    <div className="custom-block" style={{ backgroundColor: highlightColor }}>
        <h3>{text}</h3>
    </div>
);
```

### Step 2: Update Typings 
If your project enforces TypeScript types for the API, update `src/services/api.ts`. Add your new block type to the `ContentBlock` union type:

```typescript
export type ContentBlock =
  // ... existing block types
  | { type: 'myCustom'; text: string; highlightColor: string };
```

### Step 3: Register the Block in a Template
To actually render your block when it's used in a JSON file, you need to add it to the rendering logic of a layout template (e.g., `src/components/Articles/Templates/StandardTemplate.jsx` or your own custom template).

Import your block component and add it to the switch statement inside the `article.content.map` function:

```jsx
import { MyCustomBlock } from '../Renderer/blocks/MyCustomBlock';

// Inside your template's mapping function:
switch (block.type) {
    // ... existing cases
    case 'myCustom':
        // Pass the block's properties as props
        return <MyCustomBlock key={index} text={block.text} highlightColor={block.highlightColor} />;
    default:
        return null;
}
```

Now, you can use `"type": "myCustom"` inside any article's `"content"` array!

---

## 2. Creating Custom Layout Templates

A "Layout" dictates the overall page structure (header, footer, background, and how blocks are arranged).

### Step 1: Create the Template
Create a new React component in `src/components/Articles/Templates/`.
For example, `MyNewTemplate.jsx`:

```jsx
import React from 'react';
// Import any blocks you intend to support in this layout
import { TextBlock } from '../Renderer/blocks/TextBlock';
import { ImageBlock } from '../Renderer/blocks/ImageBlock';
// ... import your CSS files

export function MyNewTemplate({ article }) {
    return (
        <div className="my-custom-layout-wrapper">
            <header>
                {/* Custom styling for the title/author */}
                <h1>{article.title}</h1>
            </header>
            
            <main>
                {/* Map through the content blocks */}
                {article.content.map((block, index) => {
                    switch (block.type) {
                        case 'text':
                            return <TextBlock key={index} value={block.value} />;
                        case 'image':
                            return <ImageBlock key={index} {...block} />;
                        // Add mapping for any custom blocks this layout supports
                        default:
                            return null;
                    }
                })}
            </main>
        </div>
    );
}
```

### Step 2: Register the Layout
You must register your new template so the dynamic renderer knows which component to load when it sees your layout string in the JSON data.

Open `src/components/Articles/Renderer/Renderer.jsx` and add your template to the `templates` object:

```jsx
// 1. Import your template
import { MyNewTemplate } from '../Templates/MyNewTemplate';

// 2. Add it to the templates mapping
const templates = {
  standard: StandardTemplate,
  editorial: EditorialTemplate,
  valentines: ValentinesTemplate,
  myNewDesign: MyNewTemplate, // <-- New layout registered here
};
```

### Step 3: Use the New Layout
In your new article's JSON file (`src/data/posts/my-article.json`), simply specify your new layout key:

```json
{
  "slug": "my-article",
  "title": "Welcome to my Custom Layout",
  "layout": "myNewDesign",
  "content": [
      // ... your blocks
  ]
}
```

The system will automatically load `MyNewTemplate.jsx` to render your article!
