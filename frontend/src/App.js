import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import { Home } from './Pages/Home';
import { toggleScroll } from './components/toggleScroll';

function App() {
  const { scroll, setScroll } = toggleScroll();

  if (!scroll) {
    setScroll(false);
  }

  return (
    <div className="App">
      <Home />
      <Outlet />
    </div>
  );
}
export default App;
