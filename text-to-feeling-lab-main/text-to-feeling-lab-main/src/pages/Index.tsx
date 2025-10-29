import { MoodAnalyzer } from "@/components/MoodAnalyzer";
import { Brain, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Brain className="h-10 w-10 text-primary" />
            </div>
            <Sparkles className="h-6 w-6 text-primary animate-pulse-gentle" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mood Prediction API
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyze emotions in text using advanced NLP and machine learning. 
            Detect Happy, Sad, Angry, or Neutral moods instantly.
          </p>
        </header>

        <MoodAnalyzer />

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-16 bg-border" />
            <p>Powered by AI Sentiment Analysis</p>
            <div className="h-px w-16 bg-border" />
          </div>
          <p>Enter text to discover the emotional tone and sentiment</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
