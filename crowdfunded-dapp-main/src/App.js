import "./App.css";

import Home from "./components/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import MyProposals from "./components/MyProposals";
import CreateProposal from "./components/CreateProposal";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home  />} />
        <Route path="/my-proposals" element={<MyProposals />} />
        <Route path="/create-proposal" element={<CreateProposal />} />
      </Routes>
    </>
  );
}

export default App;
