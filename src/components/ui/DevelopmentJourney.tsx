"use client";

import { useState } from "react";
import { 
  Code, 
  Sparkles, 
  Zap, 
  GitBranch, 
  LayoutDashboard, 
  Bot, 
  AudioLines, 
  TreePine,
  BookOpen,
  Gift,
  Star,
  Snowflake,
  MessageCircle,
  LayoutTemplate,
  Globe,
  Wrench,
  Heart,
  Trophy,
  Coffee,
  Rocket,
  Lightbulb
} from "lucide-react";
import RadialOrbitalTimeline from "./RadialOrbitalTimeline";

const DevelopmentJourney = () => {
  const [timelineData] = useState([
    {
      id: 1,
      title: "Project Init",
      date: "Dec 2024",
      content: "Initial Christmas Wish Exchange project setup with React, TypeScript, and Tailwind CSS. Created basic project structure and component hierarchy.",
      category: "Foundation",
      icon: Code,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 90
    },
    {
      id: 2,
      title: "UI Foundation",
      date: "Dec 2024",
      content: "Implemented shadcn/ui components, created the basic UI structure with Christmas-themed styling, and established the component library.",
      category: "UI/UX",
      icon: LayoutDashboard,
      relatedIds: [1, 3, 4],
      status: "completed" as const,
      energy: 85
    },
    {
      id: 3,
      title: "Wish Form",
      date: "Dec 2024",
      content: "Developed the wish input form with enhanced UI/UX, including character counter, auto-resizing textarea, and decorative elements.",
      category: "Features",
      icon: MessageCircle,
      relatedIds: [2, 5],
      status: "completed" as const,
      energy: 95
    },
    {
      id: 4,
      title: "AI Integration",
      date: "Dec 2024",
      content: "Integrated Bytez.js API for AI processing of wishes with three sequential agents: Polisher, Categorizer, and Santa Reply Generator.",
      category: "AI",
      icon: Bot,
      relatedIds: [3, 6],
      status: "completed" as const,
      energy: 80
    },
    {
      id: 5,
      title: "Christmas Animations",
      date: "Dec 2024",
      content: "Added festive animations including snowfall, particle effects, lighting effects, and animated book components for immersive experience.",
      category: "Animations",
      icon: Sparkles,
      relatedIds: [2, 7],
      status: "completed" as const,
      energy: 88
    },
    {
      id: 6,
      title: "Santa Character",
      date: "Dec 2024",
      content: "Created interactive Santa character with mouse tracking, facial animations, and responsive behaviors for enhanced user engagement.",
      category: "Characters",
      icon: Gift,
      relatedIds: [4, 7, 8],
      status: "completed" as const,
      energy: 92
    },
    {
      id: 7,
      title: "Sleigh Animation",
      date: "Dec 2024",
      content: "Implemented elaborate Santa sleigh animation with reindeer, light trails, and complete sequence: flying, landing, processing, celebrating.",
      category: "Animations",
      icon: Star,
      relatedIds: [5, 6, 8],
      status: "completed" as const,
      energy: 96
    },
    {
      id: 8,
      title: "Scene Transitions",
      date: "Dec 2024",
      content: "Created smooth scroll-based scene transitions with parallax effects, maintaining consistent visual elements across all scenes.",
      category: "UX",
      icon: Globe,
      relatedIds: [2, 7],
      status: "completed" as const,
      energy: 85
    },
    {
      id: 9,
      title: "Audio Integration",
      date: "Dec 2024",
      content: "Added background music and sound effects including Santa's 'Ho Ho Ho' using provided MP3 assets from the utils folder.",
      category: "Audio",
      icon: AudioLines,
      relatedIds: [6, 7],
      status: "completed" as const,
      energy: 78
    },
    {
      id: 10,
      title: "Final Polish",
      date: "Dec 2024",
      content: "Completed the project with enhanced UI elements, optimized performance, and final touches to create a cinematic experience.",
      category: "Polish",
      icon: Sparkles,
      relatedIds: [1, 9],
      status: "completed" as const,
      energy: 100
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating snowflakes */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`snow-${i}`}
            className="absolute text-white opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 8}px`,
              animationDuration: `${Math.random() * 8 + 8}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ❄
          </div>
        ))}
        
        {/* Floating stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-yellow-300 opacity-50 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 6 + 4}px`,
              animationDuration: `${Math.random() * 4 + 3}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-green-500 rounded-full blur opacity-75 animate-pulse"></div>
              <h1 className="relative text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 mb-4">
                Development Journey
              </h1>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl text-gray-200 mb-4">
              Discover the magical journey of creating our immersive Christmas platform
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-green-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center text-gray-300">
              <Heart className="w-4 h-4 mr-2 text-red-400" />
              Made with love
            </div>
            <div className="flex items-center text-gray-300">
              <Coffee className="w-4 h-4 mr-2 text-yellow-400" />
              Coded with coffee
            </div>
            <div className="flex items-center text-gray-300">
              <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
              Crafted with care
            </div>
          </div>
        </div>

        {/* Development Timeline */}
        <div className="h-[60vh] md:h-[70vh] flex items-center justify-center px-4">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>

        {/* Footer */}
        <div className="text-center py-12 text-gray-400">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
            <span>Each milestone connects to related development phases</span>
            <Lightbulb className="w-5 h-5 ml-2 text-yellow-400" />
          </div>
          <p className="text-sm">
            Crafted with <span className="text-red-400">♥</span> for the festive season
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) rotate(10deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DevelopmentJourney;