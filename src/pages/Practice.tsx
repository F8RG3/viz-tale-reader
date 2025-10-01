import { useState, useEffect, useCallback } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Visualization {
  id: string;
  text: string;
}

const Practice = () => {
  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("visualizations");
    if (saved) {
      setVisualizations(JSON.parse(saved));
    }
  }, []);

  const handleTripleClick = useCallback(() => {
    if (!isActive || visualizations.length === 0) return;

    setClickCount((prev) => {
      const newCount = prev + 1;

      if (clickTimer) {
        clearTimeout(clickTimer);
      }

      const timer = setTimeout(() => {
        setClickCount(0);
      }, 500);

      setClickTimer(timer);

      if (newCount === 3) {
        setCurrentIndex((prev) => (prev + 1) % visualizations.length);
        setClickCount(0);
      }

      return newCount;
    });
  }, [isActive, visualizations.length, clickTimer]);

  useEffect(() => {
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
    };
  }, [clickTimer]);

  const startPractice = () => {
    if (visualizations.length === 0) return;
    setIsActive(true);
    setCurrentIndex(0);
  };

  const stopPractice = () => {
    setIsActive(false);
    setCurrentIndex(0);
  };

  if (!isActive) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-3xl font-bold">Practice</h1>
          <p className="text-muted-foreground">
            {visualizations.length === 0
              ? "Add visualizations first to begin your practice"
              : `Ready to practice ${visualizations.length} visualization${visualizations.length === 1 ? "" : "s"}`}
          </p>
          {visualizations.length > 0 && (
            <Button onClick={startPractice} size="lg" className="w-full">
              <Play className="mr-2 h-5 w-5" />
              Start Practice
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center p-8 cursor-pointer select-none"
      onClick={handleTripleClick}
    >
      <div className="max-w-3xl w-full">
        <p className="text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed text-center whitespace-pre-wrap">
          {visualizations[currentIndex]?.text}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          stopPractice();
        }}
        className="fixed top-4 right-4 text-white/50 hover:text-white text-sm"
      >
        Exit
      </button>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-sm">
        {currentIndex + 1} / {visualizations.length}
      </div>
    </div>
  );
};

export default Practice;
