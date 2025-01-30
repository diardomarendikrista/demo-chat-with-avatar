import Home from "pages/Home/index";
import Deepseek from "pages/Deepseek";
import OpenAI from "pages/OpenAI";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="deepseek"
            element={<Deepseek />}
          />
          <Route
            path="openai"
            element={<OpenAI />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
