import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <h1>Weclome To Learnify</h1>
            <p>Best Online Education Expertise</p>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
            <div className="button">
              <button className="primary-btn">
                GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
              </button>
              <button>
                VIEW COURSE <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default HeroSection;
