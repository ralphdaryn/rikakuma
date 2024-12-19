import "./App.scss";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Hero from "../src/components/Hero/Hero";
import Card from "../src/components/Card/Card";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="background">
        <Hero />
        <Card />
      </div>
      <Footer />
    </div>
  );
};

export default App;
