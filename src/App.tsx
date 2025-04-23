
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FantasyLeagueProvider } from "@/contexts/FantasyLeagueContext";
import Index from "./pages/Index";
import LiveResults from "./pages/LiveResults";
import News from "./pages/News";
import Schedule from "./pages/Schedule";
import Standings from "./pages/Standings";
import F1History from "./pages/F1History";
import RaceDetails from "./pages/RaceDetails";
import NotFound from "./pages/NotFound";
import Circuits from "./pages/Circuits";
import CircuitDetails from "./pages/CircuitDetails";
import FantasyStats from "./pages/FantasyStats"; // Import the new page
import { supabase } from "./lib/supabase";

const queryClient = new QueryClient();

const App = () => {
  const isSupabaseConfigured = supabase !== null;

  // If Supabase isn't configured properly and we're not in development, show warning
  if (!isSupabaseConfigured && import.meta.env.MODE === 'production') {
    console.warn("Supabase is not configured. Please check your environment variables.");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FantasyLeagueProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ThemeToggle />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/live" element={<LiveResults />} />
                <Route path="/news" element={<News />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/history" element={<F1History />} />
                <Route path="/races/:season/:round" element={<RaceDetails />} />
                <Route path="/circuits" element={<Circuits />} />
                <Route path="/circuits/:circuitId" element={<CircuitDetails />} />
                <Route path="/fantasy" element={<FantasyStats />} /> {/* Add the new route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FantasyLeagueProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
