import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, SmilePlus, Frown, Flame, Minus } from "lucide-react";
import { toast } from "sonner";

type MoodType = "happy" | "sad" | "angry" | "neutral";

interface MoodResult {
  mood: MoodType;
  confidence: number;
  text: string;
  timestamp: Date;
}

const moodConfig = {
  happy: {
    icon: SmilePlus,
    label: "Happy",
    color: "mood-happy",
    bgColor: "mood-happy-bg",
    borderColor: "mood-happy-border",
    description: "Positive and joyful emotions detected",
  },
  sad: {
    icon: Frown,
    label: "Sad",
    color: "mood-sad",
    bgColor: "mood-sad-bg",
    borderColor: "mood-sad-border",
    description: "Melancholic or sorrowful feelings present",
  },
  angry: {
    icon: Flame,
    label: "Angry",
    color: "mood-angry",
    bgColor: "mood-angry-bg",
    borderColor: "mood-angry-border",
    description: "Strong negative emotions or frustration",
  },
  neutral: {
    icon: Minus,
    label: "Neutral",
    color: "mood-neutral",
    bgColor: "mood-neutral-bg",
    borderColor: "mood-neutral-border",
    description: "Balanced or factual emotional state",
  },
};

export const MoodAnalyzer = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<MoodResult | null>(null);
  const [history, setHistory] = useState<MoodResult[]>([]);

  const analyzeMood = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    if (text.trim().length < 5) {
      toast.error("Please enter at least 5 characters");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call - in production this would call Lovable AI
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple sentiment analysis logic for demo
      const lowerText = text.toLowerCase();
      let predictedMood: MoodType = "neutral";
      let confidence = 0.7;

      const happyWords = ["happy", "joy", "great", "awesome", "wonderful", "love", "excited", "amazing", "fantastic", "smiling", "smile", "good", "excellent", "perfect", "beautiful", "delighted", "cheerful", "glad", "pleased", "thrilled", "blessed", "grateful", "loving", "enjoyable", "fun", "yay", "brilliant", "superb", "fabulous", "terrific"];
      const sadWords = ["sad", "down", "depressed", "unhappy", "miserable", "terrible", "awful", "disappointed", "crying", "cry", "upset", "hurt", "lonely", "heartbroken", "gloomy", "sorrowful", "melancholy", "blue", "hopeless", "devastated"];
      const angryWords = ["angry", "mad", "furious", "hate", "annoyed", "frustrated", "rage", "irritated", "outraged", "enraged", "livid", "irate", "pissed", "resentful", "hostile"];

      const happyScore = happyWords.filter(word => lowerText.includes(word)).length;
      const sadScore = sadWords.filter(word => lowerText.includes(word)).length;
      const angryScore = angryWords.filter(word => lowerText.includes(word)).length;

      if (happyScore > sadScore && happyScore > angryScore && happyScore > 0) {
        predictedMood = "happy";
        confidence = Math.min(0.95, 0.7 + happyScore * 0.1);
      } else if (sadScore > happyScore && sadScore > angryScore && sadScore > 0) {
        predictedMood = "sad";
        confidence = Math.min(0.95, 0.7 + sadScore * 0.1);
      } else if (angryScore > happyScore && angryScore > sadScore && angryScore > 0) {
        predictedMood = "angry";
        confidence = Math.min(0.95, 0.7 + angryScore * 0.1);
      }

      const result: MoodResult = {
        mood: predictedMood,
        confidence,
        text: text.trim(),
        timestamp: new Date(),
      };

      setCurrentResult(result);
      setHistory(prev => [result, ...prev].slice(0, 5));
      toast.success(`Mood detected: ${moodConfig[predictedMood].label}`);
    } catch (error) {
      toast.error("Failed to analyze mood. Please try again.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      analyzeMood();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Card className="p-6 border-2 shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Enter your text for mood analysis
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type how you're feeling... (Press Ctrl+Enter to analyze)"
              className="min-h-[120px] resize-none text-base"
              disabled={isAnalyzing}
            />
            <p className="text-xs text-muted-foreground mt-2">
              {text.length} characters · Minimum 5 characters required
            </p>
          </div>

          <Button
            onClick={analyzeMood}
            disabled={isAnalyzing || text.trim().length < 5}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Mood
              </>
            )}
          </Button>
        </div>
      </Card>

      {currentResult && (
        <Card 
          className={`p-6 border-2 shadow-lg animate-fade-in bg-${moodConfig[currentResult.mood].bgColor} border-${moodConfig[currentResult.mood].borderColor}`}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              {(() => {
                const Icon = moodConfig[currentResult.mood].icon;
                return (
                  <div className={`p-3 rounded-full bg-${moodConfig[currentResult.mood].bgColor}`}>
                    <Icon className={`h-8 w-8 text-${moodConfig[currentResult.mood].color}`} />
                  </div>
                );
              })()}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">
                  {moodConfig[currentResult.mood].label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {moodConfig[currentResult.mood].description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Confidence</span>
                <span className="font-semibold">{(currentResult.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-${moodConfig[currentResult.mood].color} transition-all duration-500`}
                  style={{ width: `${currentResult.confidence * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-foreground/80 italic">"{currentResult.text}"</p>
            </div>
          </div>
        </Card>
      )}

      {history.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Recent Analysis</h3>
          <div className="space-y-2">
            {history.map((result, index) => {
              const Icon = moodConfig[result.mood].icon;
              return (
                <Card
                  key={index}
                  className="p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 text-${moodConfig[result.mood].color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{result.text}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-medium text-${moodConfig[result.mood].color}`}>
                        {moodConfig[result.mood].label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(result.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
