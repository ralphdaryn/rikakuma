// // import "./App.scss";
// // import Header from "../src/components/Header/Header";
// // import Footer from "../src/components/Footer/Footer";
// // import Hero from "../src/components/Hero/Hero";
// // import Card from "../src/components/Card/Card";
// // import About from "../src/components/About/About";
// // import Contact from "../src/components/Contact/Contact";
// // import Search from "../src/components/Search/Search";
// // import Shop from "../src/components/Shop/Shop";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { useRef } from "react";

// // const App = () => {
// //   const contactRef = useRef(null);

// //   const scrollToContact = () => {
// //     contactRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   return (
// //     <Router>
// //       <div className="app">
// //         <Header onContactClick={scrollToContact} />
// //         <div className="background">
// //           <Search />
// //           <Routes>
// //             <Route
// //               path="/"
// //               element={
// //                 <>
// //                   <Hero />
// //                   <Card />
// //                   <div ref={contactRef}>
// //                     <Contact />
// //                   </div>
// //                 </>
// //               }
// //             />
// //             <Route path="/shop" element={<Shop />} />
// //             <Route path="/about" element={<About />} />{" "}
// //           </Routes>
// //           <Footer />
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;

// import "./App.scss";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useRef } from "react";
// import Header from "../src/components/Header/Header";
// import Footer from "../src/components/Footer/Footer";
// import Hero from "../src/components/Hero/Hero";
// import Card from "../src/components/Card/Card";
// import About from "../src/components/About/About";
// import Contact from "../src/components/Contact/Contact";
// import Search from "../src/components/Search/Search";
// import Shop from "../src/components/Shop/Shop";

// const App = () => {
//   const contactRef = useRef(null);

//   const scrollToContact = () => {
//     contactRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Header onContactClick={scrollToContact} />
//         <div className="background">
//           <Search />
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Hero />
//                   <Card />
//                   <div ref={contactRef}>
//                     <Contact />
//                   </div>
//                 </>
//               }
//             />
//             <Route path="/shop" element={<Shop />} />
//             <Route path="/about" element={<About />} />
//             {/* Catch-all route for Netlify refresh issues */}
//             <Route
//               path="*"
//               element={<h2 className="not-found">Page Not Found</h2>}
//             />
//           </Routes>
//           <Footer />
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import { CartProvider } from "./context/CartContext"; // ✅ Import CartProvider

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
    <CartProvider>
      {" "}
      {/* ✅ Wrap entire app in CartProvider */}
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
              {/* Catch-all route for Netlify refresh issues */}
              <Route
                path="*"
                element={<h2 className="not-found">Page Not Found</h2>}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
