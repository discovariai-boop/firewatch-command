import { Flame, Bell, Shield, Radio, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Overview", path: "/" },
  { label: "Incidents", path: "/incidents" },
  { label: "Resources", path: "/resources" },
  { label: "Intelligence", path: "/intelligence" },
  { label: "Coordination", path: "/coordination" },
  { label: "Analysis", path: "/analysis" },
];

const TopBar = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-card flex items-center justify-between px-6 py-3 mx-4 mt-4 rounded-xl"
    >
      <Link to="/" className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
          <Flame className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Lesotho <span className="text-primary">Fire Command</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-mono">
            National Intelligence Safety Hub
          </p>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Radio className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-success animate-pulse-urgent" />
        </button>
        <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-urgent text-urgent-foreground">
            3
          </span>
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Shield className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-medium text-foreground">Cmd. Mokhosi</p>
            <p className="text-[10px] text-muted-foreground">Fire Commander</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;
