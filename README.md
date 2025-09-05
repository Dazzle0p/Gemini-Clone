# Conversa Ai

A React-based conversational AI web app inspired by Google's Gemini, built with Vite. This project features chat history, Markdown/code rendering, voice input, and a modern UI.

## Features

- Conversational AI using Google Generative AI API
- Persistent chat history (localStorage)
- Markdown and code block rendering
- Voice-to-text input (Web Speech API)
- Responsive, modern UI with sidebar navigation

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/gemini-clone.git
   cd gemini-clone
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your API key:

   - Create a `.env` file in the root directory:
     ```
     GEMINI_API_KEY="your-google-generative-ai-api-key"
     ```

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Project Structure

```
src/
  App.jsx
  main.jsx
  index.css
  assets/
  component/
    Main/
    Sidebar/
  config/
    gemini.js
  context/
    context.jsx
public/
```

## Configuration

- The Google Generative AI API key is loaded from `.env` via `GEMINI_API_KEY`.
- Chat data is stored in `localStorage` for persistence.

## Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

---

**Note:** This project is for educational/demo purposes. Do not expose your API key in
