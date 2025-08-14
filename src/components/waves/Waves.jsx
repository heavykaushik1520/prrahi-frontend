import React from "react";
import waveA from "../../assets/images/waves/wave-bot-col_02.png";
import waveB from "../../assets/images/waves/wave-mid-col_01.png";
import waveC from "../../assets/images/waves/wave-top.png";

function Waves() {
  return (
    <div className="waveWrapper waveAnimation">
      <div className="waveWrapperInner bgTop">
        <div
          className="wave waveTop"
             style={{ backgroundImage: `url(${waveB})` }}
        //   style={{ backgroundImage: { waveB } }}
           
        />
      </div>
      <div className="waveWrapperInner bgMiddle">
        <div
          className="wave waveMiddle"
         style={{ backgroundImage: `url(${waveA})` }}
        //   style={{ backgroundImage: { waveA } }}
        />
      </div>
      <div className="waveWrapperInner bgBottom">
        <div
          className="wave waveBottom"
       style={{ backgroundImage: `url(${waveC})` }}
        //   style={{ backgroundImage: { waveC } }}
        />
      </div>
    </div>
  );
}

export default Waves;
