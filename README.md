# Christmas Wish Exchange 🎄

A beautiful, Christmas-themed React application where users can share their Christmas wishes and watch them be processed by AI agents.

## Features ✨

- **Christmas-themed UI**: Beautiful red, green, and gold color scheme with festive animations
- **AI Agent Processing**: Three sequential agents process each wish:
  - Wish Polisher Agent: Rewrites wishes in a warm, positive Christmas tone
  - Category Agent: Assigns one of five categories (Learning 🎓, Career 💼, Health ❤️, Family 👨‍👩‍👧, Fun 🎉)
  - Santa Reply Agent: Generates a kind, encouraging response as if from Santa
- **Wish Feed**: View all submitted wishes in a festive feed
- **Snow Animation**: CSS-based snowfall in the background
- **Animations**: Smooth entrance animations and typing effects
- **Local Storage**: Wishes persist between sessions

## Tech Stack 🛠️

- React (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion
- date-fns

## How to Run 🚀

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure 📁

```
src/
├── components/
│   ├── WishForm.tsx
│   ├── AgentPanel.tsx
│   ├── AgentCard.tsx
│   ├── WishFeed.tsx
│   └── WishCard.tsx
├── agents/
│   ├── polishWish.ts
│   ├── categorizeWish.ts
│   └── santaReply.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Usage 🎁

1. Write your Christmas wish in the text area
2. Click "Send to Santa" 
3. Watch as the AI agents process your wish sequentially
4. See your polished wish, category, and Santa's reply
5. Your wish will appear in the festive feed for others to see

## Screenshots 📸

*The application features a beautiful Christmas-themed UI with smooth animations and a festive atmosphere.*

---

Made with ❤️ for the holiday season