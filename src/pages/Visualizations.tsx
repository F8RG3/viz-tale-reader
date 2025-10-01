import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Visualization {
  id: string;
  text: string;
}

const Visualizations = () => {
  const [visualizations, setVisualizations] = useState<Visualization[]>(() => {
    const saved = localStorage.getItem("visualizations");
    return saved ? JSON.parse(saved) : [];
  });
  const [newVisualization, setNewVisualization] = useState("");

  const saveVisualizations = (vis: Visualization[]) => {
    localStorage.setItem("visualizations", JSON.stringify(vis));
    setVisualizations(vis);
  };

  const addVisualization = () => {
    if (!newVisualization.trim()) {
      toast.error("Please enter a visualization");
      return;
    }

    const newVis: Visualization = {
      id: Date.now().toString(),
      text: newVisualization.trim(),
    };

    saveVisualizations([...visualizations, newVis]);
    setNewVisualization("");
    toast.success("Visualization added");
  };

  const deleteVisualization = (id: string) => {
    saveVisualizations(visualizations.filter((v) => v.id !== id));
    toast.success("Visualization removed");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Visualizations</h1>
          <p className="text-muted-foreground">Create and manage your visualization practices</p>
        </div>

        <Card className="p-6 space-y-4">
          <Textarea
            placeholder="Enter your visualization here..."
            value={newVisualization}
            onChange={(e) => setNewVisualization(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <Button onClick={addVisualization} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Visualization
          </Button>
        </Card>

        <div className="space-y-4">
          {visualizations.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No visualizations yet. Add your first one above.</p>
            </Card>
          ) : (
            visualizations.map((vis) => (
              <Card key={vis.id} className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <p className="flex-1 whitespace-pre-wrap">{vis.text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteVisualization(vis.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizations;
