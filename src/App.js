import './App.css';
import {Login} from './Pages/Login';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route } from 'react-router-dom';
import {Home} from './Pages/Home';


function App() {
  return (
<div className="App">
  <Router>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
  </Router>
   
</div>
  );
}
export default App;
