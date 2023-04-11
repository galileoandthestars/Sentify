import './App.css';
import {NavBar} from './components/NavBar';
import {Banner} from './components/Banner';
import {About} from './components/About';
import {Contact} from './components/Contact';
import { Features } from './components/Features';
import {Creators} from './components/Creators';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/*Routes and router */}
      <Banner/>
      <About />
      <Features/>
      <Creators />
      <Contact/> 
    </div>
  );
}
export default App;
