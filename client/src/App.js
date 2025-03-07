import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Card from "./components/Card/Card";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Search from "./components/Search/Search";
import Shop from "./components/Shop/Shop";

const App = () => {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <div className="app">
        <Header onContactClick={scrollToContact} />
        <div className="background">
          <Search />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Card />
                  <div ref={contactRef}>
                    <Contact />
                  </div>
                </>
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={<h2 className="not-found">Page Not Found</h2>}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;