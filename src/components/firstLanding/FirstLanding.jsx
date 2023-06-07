import React from "react";
import "../style.css";
function FirstLanding() {
  return (
    <div className="firstLanding text-light ">
      <div  className="pt-5 ms-5">
        <p className="fw-normal fs-3">
            Protecting your digital assets.
        </p>
      </div>
        <div  className="pt-1 ms-5 fw-bold fs-3" style={{lineHeight:"20px"}}>
            <p>Funding Public Goods & Rewarding you</p>
            <p>Non-custodial & Open-source</p>
        </div>
    </div>
  );
}

export default FirstLanding;
