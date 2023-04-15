import { NavBar } from '../components/NavBar';
import { About } from '../components/About';
import { Banner } from '../components/Banner';
import { Features } from '../components/Features';
import { Creators } from '../components/Creators';
import { Contact } from '../components/Contact';

export const Home = () => {
    return (
        <div className="home" id="/">
            <NavBar />
            <Banner />
            <About />
            <Features />
            <Creators />
            <Contact />
        </div>
    )
}