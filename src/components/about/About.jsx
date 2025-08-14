import React from "react";
import WavesAnimation from "../waves/WavesAnimation";
import aboutImage from "../../assets/images/about/1.jpeg";

function About() {
  return (
    <>
      
      <div className="container mt-5">
        <div className="team-member-row">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="team-image-container">
                <img
                  src={aboutImage}
                  alt="about image"
                  className="about-section-image img-fluid"
                />
                <div className="team-image-overlay"></div>
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
                    Life is a beautiful journey, filled with growth, reflection,
                    and transformation. In today’s fast-paced world, we all long
                    for moments of calm, clarity, and emotional balance. That’s
                    where <b>PrRaHi Agarbatti</b> – your premium{" "}
                    <b>incense stick brand</b> – becomes more than just a
                    fragrance. It becomes a <b>soulful companion,</b> guiding
                    you toward <b>inner peace, mindfulness,</b> and spiritual
                    awakening.
                  </p>

                  <p className="lead poppins-regular">
                    <b> Crafted with purity and devotion,</b> each{" "}
                    <b>PrRaHi incense stick</b> is made from natural ingredients
                    and enriched with divine aromas that calm the mind, soothe
                    the senses, and purify the air. Whether you're beginning
                    your day with prayer, deepening your meditation practice, or
                    simply creating a serene home environment, PrRaHi fills your
                    space with <b>positive energy</b> and sacred vibrations.
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
      </div>

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
                    src={aboutImage}
                    alt="about image"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-6">
                  <h4>
                    Discover PrRaHi Agarbatti – Your Divine Companion for Inner
                    Peace and Spiritual Well-Being
                  </h4>
                  <p className="lead poppins-regular">
                    Life is a beautiful journey, filled with growth, reflection,
                    and transformation. In today’s fast-paced world, we all long
                    for moments of calm, clarity, and emotional balance. That’s
                    where <b>PrRaHi Agarbatti</b> – your premium{" "}
                    <b>incense stick brand</b> – becomes more than just a
                    fragrance. It becomes a <b>soulful companion,</b> guiding
                    you toward <b>inner peace, mindfulness,</b> and spiritual
                    awakening.
                  </p>

                  <p className="lead poppins-regular">
                    <b> Crafted with purity and devotion,</b> each{" "}
                    <b>PrRaHi incense stick</b> is made from natural ingredients
                    and enriched with divine aromas that calm the mind, soothe
                    the senses, and purify the air. Whether you're beginning
                    your day with prayer, deepening your meditation practice, or
                    simply creating a serene home environment, PrRaHi fills your
                    space with <b>positive energy</b> and sacred vibrations.
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
                    your higher self. Let every stick bring you closer to peace,
                    clarity, and divine light.
                  </p>
                  <p className="lead poppins-semibold">
                    <b>
                      PrRaHi – The soul-soothing incense that silently supports
                      your spiritual journey.
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
    </>
  );
}

export default About;
