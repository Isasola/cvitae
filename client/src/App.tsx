'use client';
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DotGridBackground } from "./components/ui/dot-grid-background";
import { WhatsAppButton } from "./components/ui/whatsapp-button";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import RecruitersInterface from "./pages/RecruitersInterface";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import OpportunityDetail from "./pages/OpportunityDetail";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/opportunities"} component={Opportunities} />
      <Route path={"/recruiters/interface"} component={RecruitersInterface} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/opportunities/:id"} component={OpportunityDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <DotGridBackground>
              <Router />
              <Footer />
              <WhatsAppButton />
            </DotGridBackground>
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
