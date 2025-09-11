import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import WavesAnimation from "../waves/WavesAnimation";
import team1 from '../../assets/images/team/team-1.jpg';
import team2 from '../../assets/images/team/team-2.png';
import TopBanner from "../top/TopBanner";

function Team() {
  return (
    <>
    <TopBanner/>
      <section className="team-section text-center" id="teams">            
        <div className="container mt-5">
          <div className="team-member-row">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 mb-4">
                <div className="team-image-container">
                  <img
                    src={team1}
                    alt="Team Member 1"
                    className="team-image img-fluid"
                  />
                  <div className="team-image-overlay">
                    <div className="team-social-links">
                      <a href="#" className="social-link">
                        <IoLogoLinkedin/>
                      </a>
                      <a href="#" className="social-link">
                        <FaTwitter/>
                      </a>
                      <a href="#" className="social-link">
                        <FaInstagram/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-4">
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

          <div className="team-member-row">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 mb-4 order-lg-2 order-md-1">
                <div className="team-image-container">
                  <img
                    src={team2}
                    alt="Team Member 2"
                    className="team-image"
                  />
                  <div className="team-image-overlay">
                     <div className="team-social-links">
                      <a href="#" className="social-link">
                        <IoLogoLinkedin/>
                      </a>
                      <a href="#" className="social-link">
                        <FaTwitter/>
                      </a>
                      <a href="#" className="social-link">
                        <FaInstagram/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 mb-4 order-lg-1 order-md-2">
                <div className="team-content">
                  <h3 className="team-member-name poppins-semibold">
                    Meet Hiranya - Chief Sales Officer
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
                    alt="Rajeev"
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
                      traditional Indian values with world-className innovation and
                      quality.
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

export default Team;
