// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter"; // Import AppRouter from its own file

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
