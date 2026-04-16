# How to Update Hero Images

The Hero Section on the homepage dynamically loads images from `src/assets/heroImages/` based on configured groups. This allows you to easily switch between different sets of hero images for each new issue or promo.

## Step 1: Add Your Images

1. Navigate to the `src/assets/heroImages/` directory in your project.
2. Create a new folder for your specific issue or group (e.g., `andscene`, `valentines`, etc.).
3. Place all your hero background images into this new folder. 
   - _Note: Supported formats include `.jpg`, `.jpeg`, `.png`, and `.svg`._

## Step 2: Update the Configuration

1. Open the file located at `src/data/hero-config.json`.
2. Update the `activeGroup` value to identically match the name of the folder you created in Step 1.

```json
{
  "activeGroup": "andscene"
}
```

## How It Works

- The `HeroSection` component uses Vite's `import.meta.glob` tool to recursively discover every image living inside `src/assets/heroImages`.
- Based on `hero-config.json`, the hero logic filters out images that don't belong to the `activeGroup`'s subfolder path.
- The homepage will then automatically cycle randomly through ONLY the active group's images.
- If you ever need to cycle through **all** images simultaneously regardless of their folder, simply change `"activeGroup"` to `"all"` or `""` in the config file.
