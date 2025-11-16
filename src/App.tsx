import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--color-bgLight)] text-[var(--color-textPrimary)]">
        <Navbar />
        <main className="mx-auto max-w-md pb-8">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
