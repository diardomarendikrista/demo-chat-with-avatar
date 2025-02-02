import Home from "pages/Home/index";
import WithAI from "pages/WithAI";
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
            path="openai"
            element={<WithAI model={"openai"} />}
          />
          <Route
            path="gemini"
            element={<WithAI model={"gemini"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
