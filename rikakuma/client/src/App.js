import "./App.scss";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Hero from "../src/components/Hero/Hero";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="background">
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default App;
