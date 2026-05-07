'use client';

import NotFound from "@/pages/NotFound.tsx";
import { Route, Switch } from "wouter";
import { HelmetProvider } from 'react-helmet-async';
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import OpportunityDetail from "./pages/OpportunityDetail";
import RecruitersInterface from "./pages/RecruitersInterface";
import RecruitersTokens from "./pages/RecruitersTokens";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/opportunities"} component={Opportunities} />
      <Route path={"/opportunities/:id"} component={OpportunityDetail} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/about"} component={About} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/recruiters/interface"} component={RecruitersInterface} />
      <Route path={"/recruiters/tokens"} component={RecruitersTokens} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <div className="bg-black min-h-screen text-white">
        <main>
          <Router />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
