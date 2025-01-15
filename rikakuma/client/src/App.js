import "./App.scss";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Hero from "../src/components/Hero/Hero";
import Card from "../src/components/Card/Card";
import Contact from "../src/components/Contact/Contact";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="background">
        <Hero />
        <Card />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
