import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Dtaes43 from "./pages/DtaesFourThree";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import Wings from "./pages/Wings";
import { createRoot } from "react-dom/client";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import About from "./pages/About";
import Error from "./pages/Error";
import Help from "./pages/Help";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/section/4-3" element={<Dtaes43 />} />
          <Route path="/wing/:name" element={<Wings />}></Route>
          <Route path="/api/attachments/:id" element={<Error />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/About" element={<About />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
