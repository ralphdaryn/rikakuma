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
import ShippingInfo from "./components/ShippingInfo/ShippingInfo";
import Stickers from "./components/Stickers/Stickers";
import Charms from "./components/Charm/Charms";
import StickersDetail from "./components/StickersDetail/StickersDetail";
import CharmsDetail from "./components/CharmsDetail/CharmsDetail";
import Cart from "./components/Cart/Cart";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";
import Admin from "./pages/Admin/Admin";

const App = () => {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <div className="app">
        <ShippingInfo />
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
                  <Stickers />
                  <Charms />
                  <div ref={contactRef}>
                    <Contact />
                  </div>
                </>
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/stickers" element={<Stickers />} />
            <Route path="/charms" element={<Charms />} />
            <Route path="/stickers/:id" element={<StickersDetail />} />
            <Route path="/charms/:id" element={<CharmsDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/admin" element={<Admin />} />
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
