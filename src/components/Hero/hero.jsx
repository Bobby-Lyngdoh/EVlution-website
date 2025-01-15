import "./hero.css"
import arrow_btn from "../../assets/arrow_btn.png";
import pause_icon from "../../assets/pause_icon.png";
import play_icon from "../../assets/play_icon.png";
import Background from "../Background/background";

function Hero({ heroData, setHeroCount, heroCount, setPlayStatus,playStatus }) {
  return (
    <div className="hero">
      <Background playStatus={playStatus} heroCount={heroCount} />
      <div className="hero_text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <div className="hero_explore">
        <p>Explore the features</p>
        <img src={arrow_btn} alt="Arrow Button" />
      </div>
      <div className="hero_dot_play">
        <ul className="hero_dots">
          <li
            onClick={() => setHeroCount(0)}
            className={heroCount === 0 ? "hero_dot orange" : "hero_dot"}
          ></li>
          <li
            onClick={() => setHeroCount(1)}
            className={heroCount === 1 ? "hero_dot orange" : "hero_dot"}
          ></li>
          <li
            onClick={() => setHeroCount(2)}
            className={heroCount === 2 ? "hero_dot orange" : "hero_dot"}
          ></li>
        </ul>
      </div>
      <div className='hero_play'>
            <img onClick={()=>setPlayStatus(!playStatus)} src={playStatus?pause_icon:play_icon} alt=''/>
            <p>See the vedio</p>
        </div>
    </div>
  );
}

export default Hero;
