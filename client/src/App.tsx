'use client';

import NotFound from "@/pages/NotFound.tsx";
import { Route, Switch } from "wouter";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
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
      <Route path={"/opportunities/:id"} component={OpportunityDetail} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <div className="bg-black min-h-screen text-white">
        <Router />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
