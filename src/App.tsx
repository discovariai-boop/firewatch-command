import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IncidentDetail from "./pages/IncidentDetail.tsx";
import IncidentsPage from "./pages/IncidentsPage.tsx";
import ResourcesPage from "./pages/ResourcesPage.tsx";
import IntelligencePage from "./pages/IntelligencePage.tsx";
import CoordinationPage from "./pages/CoordinationPage.tsx";
import AnalysisPage from "./pages/AnalysisPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/incident/:id" element={<IncidentDetail />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/coordination" element={<CoordinationPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
