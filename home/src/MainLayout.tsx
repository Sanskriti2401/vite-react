import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import "./MainLayout.css"; // Update the path to the CSS file


import PDPContent from "pdp/PDPContent";
import HomeContent from "home/HomeContent";
import CartContent from "cart/CartContent";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout(){
  return (
    <Router>
      <div className="main-layout">
        <Header />
        <main className="main-content">
          <Routes>
            <Route exact path="/" component={HomeContent} />
            <Route path="/product/:id" component={PDPContent} />
            <Route path="/cart" component={CartContent} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default MainLayout;
