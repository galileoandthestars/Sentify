import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavBar } from './components/NavBar';
import {Banner} from './components/Banner'
import {About} from './components/About';
import {Features} from './components/Features';
import {Creators} from './components/Creators';
import {Contact} from './components/Contact';

function App() {
  return (
<div className="App">
  <NavBar/>
  <Banner/>
  <About/>
  <Features/>
  <Creators/>
  <Contact/>
  
</div>
  );
}
export default App;
