import React from "react";
import top from "../../assets/images/banner/career-banner.png";

function CareerTopBanner() {
  return (
    <>
      <div className="container-fluid p-0">
        <img
          src={top}
          className="img-fluid w-100 component-top-img"
          alt="Top Banner"
        />
      </div>
    </>
  );
}

export default CareerTopBanner;
