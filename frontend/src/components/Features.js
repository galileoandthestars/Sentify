import playlist from "../Assets/img/playlist-feature.png";
import spotify from "../Assets/img/spotify-feature.png";
import playback from "../Assets/img/playback-feature.png";
import likdislike from "../Assets/img/liked-disliked-feature.png"
import fer from "../Assets/img/fer.jpg"
import Carousel from 'react-multi-carousel';
import {Image} from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';

export const Features = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="features" id="features">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="features-bx wow zoomIn">
                        <h2>Features</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br></br> Lorem Ipsum has been the industry's standard dummy text.</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme features-slider">
                            <div className="item">
                                <Image src={playlist} alt="Image" fluid />
                                <h5>Create custom playlist</h5>
                            </div>
                            <div className="item">
                                <Image src={fer} alt="Image" fluid/>
                                <h5>Personalized and emotion-based recommendation</h5>
                            </div>
                            <div className="item">
                                <Image src={spotify} alt="Image" fluid />
                                <h5>Link to Spotify personal account</h5>
                            </div>
                            <div className="item">
                                <Image src={playback} alt="Image" fluid/>
                                <h5>Like and Dislike Songs</h5>
                            </div>
                            <div className="item">
                                <Image src={likdislike} alt="Image" fluid/>
                                <h5>Forward and Backward <br/>Songs</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}