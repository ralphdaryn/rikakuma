import "./App.scss";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Hero from "../src/components/Hero/Hero";
import Card from "../src/components/Card/Card";
import Contact from "../src/components/Contact/Contact";
import Search from "../src/components/Search/Search";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="background">
        <Search />
        <Hero />
        <Card />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
