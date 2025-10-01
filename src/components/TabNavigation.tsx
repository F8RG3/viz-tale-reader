import { NavLink } from "react-router-dom";
import { FileText, Play } from "lucide-react";

const TabNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-4 gap-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <FileText className="h-6 w-6" />
          <span className="text-xs">Visualizations</span>
        </NavLink>
        <NavLink
          to="/practice"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-4 gap-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <Play className="h-6 w-6" />
          <span className="text-xs">Practice</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default TabNavigation;
