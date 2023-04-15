import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { SignUp } from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <Home />
      <Outlet />
    </div>
  );
}
export default App;
