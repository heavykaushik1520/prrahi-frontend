/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import AllCollection from "../components/products/AllCollection";
import { Carousel } from "bootstrap";
import WavesAnimation from "../components/waves/WavesAnimation";
import bannerVideo from "../assets/videos/banner-video.mp4";
import bannerVideoMobile from "../assets/videos/banner-video-3.mp4";
import prrahiBanner1 from "../assets/images/banner/prrahi-img-banner1.png";
import prarthana from "../assets/images/banner/prrahi-img-banner2.png";
import prrahiBanner4 from "../assets/images/banner/prrahi-img-banner3.png";
import team1 from "../assets/images/team/final-team-1.png";
import team2 from "../assets/images/team/team-2.png";
import aboutImg from "../assets/images/about/1.jpeg";
import { FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import Waves from "../components/waves/Waves";
import { Link } from "react-router-dom";
import CloudComponent from "../components/cloud/CloudComponent";

function Main() {
  const carouselEl = useRef(null);
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 5;

  /*
  useEffect(() => {
    let bootstrapCarousel = null;
    let timeoutId = null;

    const initializeCarousel = () => {
      if (carouselEl.current) {
        bootstrapCarousel = new Carousel(carouselEl.current, {
          interval: false,
          ride: false,
          pause: false,
          wrap: true,
        });

        const playLoop = () => {
          if (timeoutId) clearTimeout(timeoutId);

          if (currentIndex === 0) {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();

              
              timeoutId = setTimeout(() => {
                setCurrentIndex(1);
              }, 8000); 
            }
          } else if (currentIndex === 1) {
            timeoutId = setTimeout(() => {
              // console.log("2");
              setCurrentIndex(2);
            }, 5000);
          } else if (currentIndex === 2) {
            timeoutId = setTimeout(() => {
              // console.log("3");
              setCurrentIndex(3);
            }, 5000);
          } else if (currentIndex === 3) {
            timeoutId = setTimeout(() => {
              setCurrentIndex(0);
            }, 5000);
          }
        };

        playLoop();
      }
    };

    initializeCarousel();

    return () => {
      if (bootstrapCarousel) {
        bootstrapCarousel.dispose(); 
      }
      if (timeoutId) {
        clearTimeout(timeoutId); 
      }
    };
  }, [currentIndex]); 

  */

  useEffect(() => {
    let bootstrapCarousel = null;
    let timeoutId = null;

    const isMobile = window.innerWidth < 768; // Define the breakpoint

    if (!isMobile) {
      // This code runs only on desktop (md and up)
      const initializeCarousel = () => {
        if (carouselEl.current) {
          bootstrapCarousel = new Carousel(carouselEl.current, {
            interval: false,
            ride: false,
            pause: false,
            wrap: true,
          });

          const playLoop = () => {
            if (timeoutId) clearTimeout(timeoutId);

            if (currentIndex === 0) {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                timeoutId = setTimeout(() => {
                  setCurrentIndex(1);
                }, 8000);
              }
            } else if (currentIndex === 1) {
              timeoutId = setTimeout(() => {
                setCurrentIndex(2);
              }, 5000);
            } else if (currentIndex === 2) {
              timeoutId = setTimeout(() => {
                setCurrentIndex(3);
              }, 5000);
            } else if (currentIndex === 3) {
              timeoutId = setTimeout(() => {
                setCurrentIndex(4);
              }, 5000);
            } else if (currentIndex === 4) {
              timeoutId = setTimeout(() => {
                setCurrentIndex(0);
              }, 10000);
            }
          };
          playLoop();
        }
      };
      initializeCarousel();
    }

    return () => {
      if (bootstrapCarousel) {
        bootstrapCarousel.dispose();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    if (carouselEl.current) {
      const bsCarousel = Carousel.getInstance(carouselEl.current);
      if (bsCarousel) {
        bsCarousel.to(currentIndex);
      }
    }
  }, [currentIndex]);

  return (
    <>
      {/* BANNER SECTION */}
      <section
        id="up"
        className="page-head container-fluid p-0 position-relative"
      >
        <div
          id="customCarousel"
          ref={carouselEl}
          className="carousel slide"
          data-bs-ride="false"
        >
          {/* 🔹 Carousel Indicators (dashes at bottom) */}
          <div className="carousel-indicators d-none d-md-block">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#customCarousel"
                data-bs-slide-to={idx}
                className={currentIndex === idx ? "active" : ""}
                aria-current={currentIndex === idx ? "true" : undefined}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            <div
              className={`carousel-item ${currentIndex === 0 ? "active" : ""}`}
            >
              <video
                id="introVideo"
                ref={videoRef}
                className="d-block w-100 d-none d-md-block"
                muted
                playsInline
                autoPlay
                loop
                style={{ position: "relative", zIndex: 1 }}
              >
                <source src={bannerVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <video
                id="introVideoMobile"
                ref={videoRef}
                className="d-block w-100 d-block d-md-none" // visible below md (<768px)
                muted
                playsInline
                autoPlay
                loop
              >
                <source src={bannerVideoMobile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div
              className={`carousel-item ${
                currentIndex === 1 ? "active" : ""
              } py-5`}
              style={{ position: "relative" }}
            >
              <img
                src={prarthana}
                className="d-block "
                alt="Image 1"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <div
              className={`carousel-item ${
                currentIndex === 2 ? "active" : ""
              } py-5`}
              style={{ position: "relative" }}
            >
              <img
                src={prrahiBanner4}
                className="d-block"
                alt="Image 2"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <div
              className={`carousel-item ${
                currentIndex === 3 ? "active" : ""
              } py-5`}
              style={{ position: "relative" }}
            >
              <img
                src={prrahiBanner1}
                className="d-block"
                alt="Image 3"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <div
              className={`carousel-item ${currentIndex === 4 ? "active" : ""}`}
              style={{ position: "relative" }}
            >
              <div className="position-absolute top-50 start-50 translate-middle">
                <CloudComponent />
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev d-none d-md-block"
            type="button"
            data-bs-target="#customCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon carousel-control-icon "
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next d-none d-md-block"
            type="button"
            data-bs-target="#customCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon carousel-control-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section waves-section text-center">
        <h2
          className="about-heading display-3 poppins-extrabold mb-0 mt-0 py-3"
          style={{ color: "#EC1B26" }}
        >
          ABOUT US
        </h2>

        <div className="position-relative">
          <Waves />
        </div>

        <div className="container mt-5">
          <div className="team-member-row">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 mb-4">
                <div className="team-image-container">
                  <img
                    src={aboutImg}
                    alt="Team Member 1"
                    className="about-section-image img-fluid"
                  />
                  {/* <div className="team-image-overlay"></div> */}
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-4">
                <div className="team-content">
                  <h3 className="team-member-name poppins-semibold ">
                    Discover PrRaHi Agarbatti – Your Divine Companion for Inner
                    Peace and Spiritual Well-Being
                  </h3>

                  <div className="team-member-description">
                    <p className="lead poppins-regular">
                      Life is a beautiful journey, filled with growth,
                      reflection, and transformation. In today’s fast-paced
                      world, we all long for moments of calm, clarity, and
                      emotional balance. That’s where <b>PrRaHi Agarbatti</b> –
                      your premium <b>incense stick brand</b> – becomes more
                      than just a fragrance. It becomes a{" "}
                      <b>soulful companion,</b> guiding you toward{" "}
                      <b>inner peace, mindfulness,</b> and spiritual awakening.
                    </p>

                    <p className="lead poppins-regular">
                      <b> Crafted with purity and devotion,</b> each{" "}
                      <b>PrRaHi incense stick</b> is made from natural
                      ingredients and enriched with divine aromas that calm the
                      mind, soothe the senses, and purify the air. Whether
                      you're beginning your day with prayer, deepening your
                      meditation practice, or simply creating a serene home
                      environment, PrRaHi fills your space with{" "}
                      <b>positive energy</b> and sacred vibrations.
                    </p>
                  </div>
                  <button
                    className="btn btn-primary read-more-team-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#aboutModal"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="aboutModal"
          tabIndex="-1"
          aria-labelledby="teamModal1Label"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="teamModal1Label">
                  ABOUT US
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={aboutImg}
                      alt="about image"
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-6">
                    <h4>
                      Discover PrRaHi Agarbatti – Your Divine Companion for
                      Inner Peace and Spiritual Well-Being
                    </h4>
                    <p className="lead poppins-regular">
                      Life is a beautiful journey, filled with growth,
                      reflection, and transformation. In today’s fast-paced
                      world, we all long for moments of calm, clarity, and
                      emotional balance. That’s where <b>PrRaHi Agarbatti</b> –
                      your premium <b>incense stick brand</b> – becomes more
                      than just a fragrance. It becomes a{" "}
                      <b>soulful companion,</b> guiding you toward{" "}
                      <b>inner peace, mindfulness,</b> and spiritual awakening.
                    </p>

                    <p className="lead poppins-regular">
                      <b> Crafted with purity and devotion,</b> each{" "}
                      <b>PrRaHi incense stick</b> is made from natural
                      ingredients and enriched with divine aromas that calm the
                      mind, soothe the senses, and purify the air. Whether
                      you're beginning your day with prayer, deepening your
                      meditation practice, or simply creating a serene home
                      environment, PrRaHi fills your space with{" "}
                      <b>positive energy</b> and sacred vibrations.
                    </p>

                    <h4>Why Choose PrRaHi Agarbatti?</h4>
                    <ul className="text-justify poppins-medium">
                      <li>100% natural, long-lasting fragrances</li>
                      <li>
                        Ideal for daily rituals, yoga, meditation & spiritual
                        practices
                      </li>
                      <li>
                        Available in soothing floral, woody, and traditional
                        blends
                      </li>
                      <li>Enhances mood, focus, and emotional harmony</li>
                    </ul>

                    <p className="lead poppins-regular">
                      PrRaHi is not just incense — it’s{" "}
                      <b>your spiritual partner,</b> helping you reconnect with
                      your higher self. Let every stick bring you closer to
                      peace, clarity, and divine light.
                    </p>
                    <p className="lead poppins-semibold">
                      <b>
                        PrRaHi – The soul-soothing incense that silently
                        supports your spiritual journey.
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COLLECTION */}

      <section
        className="collection-section waves-section text-center"
        id="collection"
      >
        <h2 className="about-heading poppins-extrabold mb-0 mt-0 py-3">
          OUR COLLECTION
        </h2>

        <div className="position-relative">
          <Waves />
        </div>
        <div className="collection-home">
          <AllCollection />
        </div>

        <Link
          to={"/collection"}
          className="btn btn-primary read-more-team-btn collection-read-more"
        >
          More Collection
        </Link>
      </section>

      {/* TEAM */}
      <section className="team-section waves-section text-center" id="teams">
        <h2 className="about-heading poppins-extrabold mb-0 mt-0 py-3">
          OUR TEAM
        </h2>

        <div className="position-relative">
          <Waves />
        </div>

        <div className="container mt-5">
          {/* RAJEEV */}
          <div className="team-member-row">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 mb-4 order-lg-2 order-md-1">
                <div className="team-image-container">
                  <img
                    src={team1}
                    alt="Team Member 1"
                    className="team-image img-fluid"
                  />
                  <div className="team-image-overlay">
                    <div className="team-social-links">
                      <a href="#" className="social-link">
                        <IoLogoLinkedin />
                      </a>
                      <a href="#" className="social-link">
                        <FaTwitter />
                      </a>
                      <a href="#" className="social-link">
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-4 order-lg-2 order-md-1a">
                <div className="team-content">
                  <h3 className="team-member-name poppins-semibold ">
                    Meet Rajeev – Chief Operating Officer
                  </h3>
                  <p className="team-member-position poppins-medium">
                    Co-Founder | Entrepreneur | Growth Catalyst
                  </p>
                  <div className="team-member-description">
                    <p className="lead poppins-regular">
                      Debojo Rajeev is the driving force behind our journey — a
                      seasoned entrepreneur and startup founder with over{" "}
                      <b>
                        {" "}
                        30 years of leadership experience in top blue-chip
                        companies across India.
                      </b>{" "}
                      His career began humbly as an intern in a small office in
                      Guwahati, Assam, and evolved into senior executive roles
                      in renowned multinational corporations, including in{" "}
                      <b>Mumbai, the financial capital of India.</b>
                    </p>
                  </div>
                  <button
                    className="btn btn-primary read-more-team-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#teamModal1"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* HIRANYA */}
          <div className="team-member-row">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 mb-4 order-lg-2 order-md-1">
                <div className="team-image-container">
                  <img src={team2} alt="Team Member 2" className="team-image" />
                  <div className="team-image-overlay">
                    <div className="team-social-links">
                      <a href="#" className="social-link">
                        <IoLogoLinkedin />
                      </a>
                      <a href="#" className="social-link">
                        <FaTwitter />
                      </a>
                      <a href="#" className="social-link">
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-4 order-lg-1 order-md-2">
                <div className="team-content">
                  <h3 className="team-member-name poppins-semibold">
                    Meet Hiranya – Chief Sales Officer
                  </h3>
                  <p className="team-member-position">
                    Co-Founder | Entrepreneur | FMCG Sales Expert
                  </p>
                  <div className="team-member-description">
                    <p className="lead poppins-regular">
                      With over{" "}
                      <b> 30 years of expertise in the FMCG industry </b> across
                      Northeast and Eastern India, <b>Hiranya Bora </b> is the
                      architect of our brand’s robust sales and distribution
                      network. A respected leader in{" "}
                      <b>sales, marketing, and business development,</b> Hiranya
                      has consistently delivered results, built powerful
                      go-to-market strategies, and mentored winning teams across
                      diverse product categories.
                    </p>
                  </div>
                  <button
                    className="btn btn-primary read-more-team-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#teamModal2"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="teamModal1"
        tabIndex="-1"
        aria-labelledby="teamModal1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="teamModal1Label">
                Meet Rajeev – Chief Operating Officer
                <br />
                Co-Founder | Entrepreneur | Growth Catalyst
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={team1}
                    alt="John Smith"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-6">
                  <h4>Meet Rajeev </h4>
                  <p className="lead-1 poppins-regular">
                    Debojo Rajeev is the driving force behind our journey — a
                    seasoned entrepreneur and startup founder with over{" "}
                    <b>
                      {" "}
                      30 years of leadership experience in top blue-chip
                      companies across India.
                    </b>{" "}
                    His career began humbly as an intern in a small office in
                    Guwahati, Assam, and evolved into senior executive roles in
                    renowned multinational corporations, including in{" "}
                    <b>Mumbai, the financial capital of India.</b>
                  </p>
                  <p className="lead-1 poppins-regular">
                    Rooted deeply in Assam yet shaped by global business
                    exposure, Rajeev has come full circle—returning to his
                    homeland to spark a new era of{" "}
                    <b>entrepreneurship in Northeast India.</b> As the
                    co-founder of a <b>visionary agarbatti startup,</b> he is
                    committed to creating a <b>premium incense stick brand </b>{" "}
                    that blends{" "}
                    <b>
                      traditional Indian values with world-className innovation
                      and quality.
                    </b>
                  </p>
                  <p className="lead-1 poppins-regular">
                    At the heart of the brand is Rajeev’s unwavering mission: to{" "}
                    <b>empower local youth,</b> uplift regional talent, and
                    build a business that stands for{" "}
                    <b> purpose, professionalism, and sustainable growth.</b>{" "}
                    His story reflects a unique blend of passion, resilience,
                    and impact—each stick we roll carries that legacy.
                  </p>

                  <p className="lead-1 poppins-regular">
                    Explore our journey with Rajeev — where{" "}
                    <b>tradition meets innovation,</b> and every fragrance tells
                    a story of purpose and pride.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <a href="#" className="btn btn-primary">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="teamModal2"
        tabIndex="-1"
        aria-labelledby="teamModal2Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="teamModal2Label">
                Meet Hiranya – Chief Sales Officer <br />
                Co-Founder | Entrepreneur | FMCG Sales Expert
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={team2}
                    alt="Sarah Johnson"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-6">
                  <h4>Meet Hiranya </h4>
                  <p className="lead-1 poppins-regular">
                    With over{" "}
                    <b> 30 years of expertise in the FMCG industry </b> across
                    Northeast and Eastern India, <b>Hiranya Bora </b> is the
                    architect of our brand’s robust sales and distribution
                    network. A respected leader in{" "}
                    <b>sales, marketing, and business development,</b> Hiranya
                    has consistently delivered results, built powerful
                    go-to-market strategies, and mentored winning teams across
                    diverse product categories.
                  </p>

                  <p className="lead-1 poppins-regular">
                    Today, Hiranya brings this wealth of knowledge and market
                    acumen to a new mission{" "}
                    <b>
                      {" "}
                      — co-founding a purpose-driven agarbatti brand from Assam.
                    </b>{" "}
                    Passionate about creating more than just incense, he
                    envisions each stick as a{" "}
                    <b>
                      {" "}
                      sensory experience that promotes mindfulness, peace, and
                      spiritual well-being.
                    </b>
                  </p>

                  <p className="lead-1 poppins-regular">
                    Rooted in{" "}
                    <b>
                      cultural heritage yet aligned with modern consumer needs,
                    </b>{" "}
                    Hiranya is reimagining incense as a bridge between tradition
                    and conscious living. Every product reflects his deep
                    understanding of{" "}
                    <b>
                      Indian rituals, customer preferences, and premium quality
                      standards.
                    </b>
                  </p>

                  <p className="lead-1 poppins-regular ">
                    Under his leadership, our incense brand is not just
                    growing—it's flourishing as a symbol of{" "}
                    <b> authenticity, purpose, and local pride.</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <a href="#" className="btn btn-primary">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
