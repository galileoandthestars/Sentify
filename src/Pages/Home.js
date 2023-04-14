import {NavBar} from '../components/NavBar';
import {About} from '../components/About';
import {Features} from '../components/Features';
import {Creators} from '../components/Creators';
import {Contact} from '../components/Contact';

export const Home = ()=>{
    return(
    <div className="home" id="/">
        <NavBar/>
        <About/>
        <Features/>
        <Creators/>
        <Contact/>

    </div>
    )

    
}