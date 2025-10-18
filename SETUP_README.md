# 🚀 AI Code Explainer

An interactive, AI-powered code explanation tool that helps you understand any code line by line in simple language.

## ✨ Features

- 🤖 **AI-Powered Explanations** - Uses OpenAI GPT to explain code in simple terms
- 🎨 **Interactive 3D UI** - Beautiful 3D background with dynamic animations
- 🎯 **Line-by-Line Analysis** - Get detailed explanations for each line of code
- 🌈 **Multiple Languages** - Supports JavaScript, TypeScript, Python, Java, C++, and more
- 📋 **Copy & Download** - Easily copy code snippets or download full explanations
- 🎭 **Smooth Animations** - Framer Motion powered transitions and effects
- 🌙 **Black & Blue Theme** - Modern dark theme with blue accents

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **Three.js** - 3D graphics via React Three Fiber
- **Framer Motion** - Smooth animations
- **OpenAI API** - AI-powered code explanations

## 📦 Installation

1. Clone the repository or navigate to the project folder:
```bash
cd code-explainer-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up your OpenAI API key:
   - Open `.env.local`
   - Replace `your_api_key_here` with your actual OpenAI API key
   - Get your API key from: https://platform.openai.com/api-keys

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

1. **Select Language** - Choose your programming language from the dropdown
2. **Paste Code** - Enter or paste your code in the text area
3. **Click Explain** - Hit the "Explain Code" button
4. **Read Explanations** - View line-by-line explanations below
5. **Copy/Download** - Use the copy button for individual lines or download the full explanation

## 🎨 Features Breakdown

### Interactive UI
- Dynamic 3D spheres floating in the background
- Particle effects for visual depth
- Smooth hover and click animations
- Responsive design for all screen sizes

### Code Analysis
- Supports 12+ programming languages
- AI-generated explanations in simple terms
- Line number indicators
- Syntax preservation

### User Experience
- Real-time loading indicators
- Toast notifications for feedback
- Custom scrollbar styling
- Copy-to-clipboard functionality
- Download explanations as text files

## 🔧 Configuration

### Customizing the AI Model
Edit `app/api/explain/route.ts` to change the AI model:
```typescript
model: 'gpt-3.5-turbo', // Change to 'gpt-4' for better results
```

### Adding More Languages
Edit `app/components/CodeInput.tsx` to add languages:
```typescript
const languages = [
  'javascript',
  'typescript',
  // Add your language here
];
```

## 📝 Project Structure

```
code-explainer-app/
├── app/
│   ├── api/
│   │   └── explain/
│   │       └── route.ts         # API endpoint for AI explanations
│   ├── components/
│   │   ├── Background3D.tsx     # 3D background component
│   │   ├── CodeInput.tsx        # Code input component
│   │   └── ExplanationDisplay.tsx # Explanation display component
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── .env.local                   # Environment variables
└── package.json                 # Dependencies
```

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `OPENAI_API_KEY` as an environment variable
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- Three.js for 3D graphics
- Vercel for Next.js
- The open-source community

---

Made with ❤️ for developers who want to understand code better!
