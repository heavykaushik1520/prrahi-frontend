import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import news1 from "../../assets/images/news/prrahi-premium.webp";
import TopBanner from "../top/TopBanner";
import launch1 from "../../assets/images/news/launch-1.jpg";
import launch2 from "../../assets/images/news/launch-2.jpg";
import launch3 from "../../assets/images/news/launch-3.jpg";
import launch4 from "../../assets/images/news/launch-4.jpg";
import NewsBanner from "./NewsBanner";

function News() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4, // Show 4 items on large screens
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3, // Show 3 items on desktop
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2, // Show 2 items on tablets
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Show 1 item on mobile
    },
  };

  return (
    <>
      <NewsBanner />
      <section className="team-section text-center" id="teams">
        <div className="container mt-5">
          <div className="team-member-row">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 mb-4">
                <div className="team-image-container">
                  <img
                    src={news1}
                    alt="Team Member 1"
                    className="team-image img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-4">
                <div className="team-content">
                  <h3 className="team-member-name poppins-semibold text-uppercase ">
                    Experience Luxury in Every Breath
                  </h3>
                  <p className="team-member-position poppins-medium">
                    The Premium Agarbatti Collection
                  </p>
                  <div className="team-member-description">
                    <p className="lead poppins-regular">
                      Discover the <b> PrRaHi Signature Incense Collection,</b>{" "}
                      a premium range crafted to awaken the senses and enrich
                      every space. Each fragrance is carefully curated to embody
                      artistry, purity, and soulful elegance.{" "}
                    </p>
                    <p className="lead poppins-regular">
                      <b>Velour Rose</b> - A timeless bloom of mystique roses,
                      blending passion, purity, and soulful serenity in every
                      breath.
                    </p>
                    <p className="lead poppins-regular">
                      <b>Golden Aura</b> - Precious sandalwood essence steeped
                      in tradition, exuding divine warmth and meditative
                      tranquility.
                    </p>
                    <p className="lead poppins-regular">
                      <b>Verdant Bloom</b> - A delicate carnation bouquet,
                      radiating sophistication, freshness, and uplifting floral
                      grace.
                    </p>
                    <p className="lead poppins-regular">
                      <b>Essence of Mysore</b> - Rare lavender from Karnataka,
                      offering calming elegance and refined relaxation with
                      every lingering note.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h3 className="poppins-semibold prrahi">
          PrRaHi{" "}
          <span className="team-member-name">
            Agarbatti Launches in Assam for Pan India – Premium Incense with
            Pure Fragrance & Social Purpose
          </span>
        </h3>

        <div className="container mt-5">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {/* Each of these divs is a carousel item */}
            <div className="px-2">
              <div className="carousel-image-container">
                <img
                  className="d-block w-100 carousel-image img-fluid"
                  src={launch1}
                  alt="Launch slide 1"
                />
              </div>
            </div>
            <div className="px-2">
              <div className="carousel-image-container">
                <img
                  className="d-block w-100 carousel-image img-fluid"
                  src={launch2}
                  alt="Launch slide 2"
                />
              </div>
            </div>
            <div className="px-2">
              <div className="carousel-image-container">
                <img
                  className="d-block w-100 carousel-image img-fluid"
                  src={launch3}
                  alt="Launch slide 3"
                />
              </div>
            </div>
            <div className="px-2">
              <div className="carousel-image-container">
                <img
                  className="d-block w-100 carousel-image img-fluid"
                  src={launch4}
                  alt="Launch slide 4"
                />
              </div>
            </div>
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default News;
