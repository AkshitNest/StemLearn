import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { StudentProvider } from "@/contexts/StudentContext";
import Index from "./pages/Index";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import LearningPage from "./pages/LearningPage";
import ModuleReaderPage from "./pages/ModuleReaderPage";
import BlogReaderPage from "./pages/BlogReaderPage";
import QuestsPage from "./pages/QuestsPage";
import Leaderboard from "./pages/Leaderboard";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <StudentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Student Routes */}
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/learning" element={<LearningPage />} />
              <Route path="/student/learning/modules/:moduleId" element={<ModuleReaderPage />} />
              <Route path="/student/learning/blogs/:blogId" element={<BlogReaderPage />} />
              <Route path="/student/quests" element={<QuestsPage />} />
              <Route path="/student/subjects/:subject" element={<QuestsPage />} />
              <Route path="/student/leaderboard" element={<Leaderboard />} />
              
              {/* Teacher Routes */}
              <Route path="/teacher/login" element={<TeacherLogin />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </StudentProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
