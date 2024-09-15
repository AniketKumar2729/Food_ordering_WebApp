import { Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";
import { ItemProvider } from "./Components/ContextReducer";
import MyOrder from "./screens/MyOrder";


function App() {
  return (
    <>
    <ItemProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<SignUp />} />
          <Route path="/myOrder" element={<MyOrder />} />

        </Routes>
    </ItemProvider>
    </>
  );
}

export default App;
