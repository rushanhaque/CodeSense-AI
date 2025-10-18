This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> d5e05ab (Initial commit from Create Next App)
# 🤖 CodeSense AI

**Transform complex code into simple explanations with AI-powered insights**

CodeSense AI is an intelligent code explanation platform that breaks down any code snippet into easy-to-understand, line-by-line explanations. Perfect for beginners learning to code, developers exploring new languages, or anyone trying to understand unfamiliar codebases.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🤖 **AI-Powered Explanations** - Powered by Hugging Face's Llama 3.2 3B model with intelligent fallback system
- 🌐 **20+ Programming Languages** - JavaScript, TypeScript, Python, Java, C, C++, C#, HTML, CSS, PHP, Ruby, Go, Rust, Swift, Kotlin, SQL, Bash, R, MATLAB, Scala
- 🎨 **VS Code Syntax Highlighting** - Beautiful code coloring using react-syntax-highlighter
- 🎭 **Interactive 3D UI** - Stunning animations with React Three Fiber, floating particles, and futuristic design
- 📋 **Copy & Download** - Easily copy individual lines or download complete explanations
- 📊 **Code Examples** - Pre-loaded examples to get you started quickly
- ⌨️ **Keyboard Shortcuts** - Ctrl+Enter to explain code instantly
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Smart Fallback** - Automatic switch to rule-based explanations if AI is unavailable

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rushanhaque/codesense-ai.git
   cd codesense-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3001](http://localhost:3001) to see the application.

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions

### 3D Graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for 3D scenes
- **Three.js** - 3D visualization library

### AI & Code Processing
- **Hugging Face Inference API** - Meta Llama 3.2 3B model
- **react-syntax-highlighter** - Code syntax highlighting
- **prism-react-renderer** - Advanced code rendering

### UI Components
- **lucide-react** - Beautiful icon library
- **react-hot-toast** - Toast notifications

## 📁 Project Structure

```
code-explainer-app/
├── app/
│   ├── api/
│   │   └── explain/
│   │       └── route.ts          # AI explanation endpoint
│   ├── components/
│   │   ├── Background3D.tsx      # 3D animated background
│   │   ├── CodeExamples.tsx      # Pre-loaded code examples
│   │   ├── CodeInput.tsx         # Code input with language selector
│   │   ├── ExplanationDisplay.tsx # Results display component
│   │   ├── FloatingCard.tsx      # Animated card wrapper
│   │   ├── LoadingSkeleton.tsx   # Loading state UI
│   │   └── Logo3D.tsx            # 3D futuristic logo
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎨 Key Features Explained

### AI-Powered Explanations
CodeSense AI uses Hugging Face's powerful Llama 3.2 3B model to generate intelligent, context-aware explanations. The system includes:
- Smart prompt engineering for accurate explanations
- Language-specific pattern recognition
- Automatic fallback to rule-based explanations for reliability
- Support for complex code structures including functions, loops, classes, and more

### 3D Interactive Design
The application features a stunning visual experience:
- **3D Floating Logo** - Animated curly braces with AI brain core
- **Particle System** - 1,500+ particles with dynamic animations
- **Star Field** - 3,000 stars creating atmospheric depth
- **Floating Spheres** - Multiple animated 3D spheres
- **Dynamic Lighting** - Multi-layered lighting with shadows and glow effects

### Syntax Highlighting
Professional VS Code-style syntax highlighting for all supported languages:
- vscDarkPlus theme for familiar look
- Language-specific color schemes
- Line-by-line highlighting in explanations

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: OpenRouter API key (currently using free Hugging Face API)
OPENROUTER_API_KEY=your_api_key_here
```

**Note:** The application works without any API key using Hugging Face's free inference API.

## 🎯 Usage

1. **Select a Language** - Choose from 20+ programming languages using the dropdown
2. **Paste Your Code** - Enter or paste the code you want to understand
3. **Click Explain** - Or press Ctrl+Enter for quick explanation
4. **Read Explanations** - Get line-by-line breakdowns in simple language
5. **Copy or Download** - Save explanations for future reference

### Example Use Cases

- **Learning to Code** - Understand tutorial code snippets
- **Code Review** - Quickly grasp what unfamiliar code does
- **Documentation** - Generate explanations for code documentation
- **Debugging** - Understand complex logic flow
- **Language Learning** - Explore new programming languages

## 🌟 Supported Languages

JavaScript • TypeScript • Python • Java • C • C++ • C# • HTML • CSS • PHP • Ruby • Go • Rust • Swift • Kotlin • SQL • Bash • R • MATLAB • Scala

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Developed with ❤️ by **Rushan Haque**

- 💼 [LinkedIn](https://www.linkedin.com/in/rushanhaque)
- 📸 [Instagram](https://www.instagram.com/rushanhaque)
- 🐙 [GitHub](https://github.com/rushanhaque)
- 📧 [Email](mailto:rushanulhaque@gmail.com)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📮 Feedback

If you have any feedback or suggestions, please reach out through any of the social links above. Your input helps make CodeSense AI better!

---

**Made with Next.js, TypeScript, and a lot of ☕**
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> d5e05ab (Initial commit from Create Next App)
