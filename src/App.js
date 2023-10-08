import { useSelector } from "react-redux";
import "./App.css";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import Footer from "./components/Footer";

function App() {
  const { isLoadingLogin } = useSelector((store) => store.loginManager);
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      {isLoadingLogin && <Loading />}
      <Footer />
    </div>
  );
}

export default App;
