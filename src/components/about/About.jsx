import React from "react";
import WavesAnimation from "../waves/WavesAnimation";

function About() {
  return (
    <>
     <WavesAnimation/>
    <section className="about-section text-center">
     
      <div className="container mt-4">
        <div className="container mt-4">
          <h3 className="about-title poppins-semibold">
            Discover PrRaHi Agarbatti – Your Divine Companion for Inner Peace
            and Spiritual Well-Being
          </h3>
          <p className="lead poppins-regular">
            Life is a beautiful journey, filled with growth, reflection, and
            transformation. In today’s fast-paced world, we all long for moments
            of calm, clarity, and emotional balance. That’s where{" "}
            <b>PrRaHi Agarbatti</b> – your premium <b>incense stick brand</b> –
            becomes more than just a fragrance. It becomes a{" "}
            <b>soulful companion,</b> guiding you toward{" "}
            <b>inner peace, mindfulness,</b> and spiritual awakening.
          </p>

          <p className="lead poppins-regular">
            <b> Crafted with purity and devotion,</b> each{" "}
            <b>PrRaHi incense stick</b> is made from natural ingredients and
            enriched with divine aromas that calm the mind, soothe the senses,
            and purify the air. Whether you're beginning your day with prayer,
            deepening your meditation practice, or simply creating a serene home
            environment, PrRaHi fills your space with <b>positive energy</b> and
            sacred vibrations.
          </p>
          <h3 className="about-title poppins-semibold">
            Why Choose PrRaHi Agarbatti?
          </h3>
          <ul className="text-justify poppins-medium">
            <li>100% natural, long-lasting fragrances</li>
            <li>
              Ideal for daily rituals, yoga, meditation & spiritual practices
            </li>
            <li>Available in soothing floral, woody, and traditional blends</li>
            <li>Enhances mood, focus, and emotional harmony</li>
          </ul>
          <p className="lead poppins-regular">
            PrRaHi is not just incense — it’s <b>your spiritual partner,</b>{" "}
            helping you reconnect with your higher self. Let every stick bring
            you closer to peace, clarity, and divine light.
          </p>
          <p className="lead poppins-semibold">
            <b>
              PrRaHi – The soul-soothing incense that silently supports your
              spiritual journey.
            </b>
          </p>
        </div>
      </div>
    </section>
    </>
  );
}

export default About;
