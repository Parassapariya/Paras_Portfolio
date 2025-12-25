import Lottie from "lottie-react";
import devAnimation from "../assets/dev-animation.json";

const HeroAnimation = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie
        animationData={devAnimation}
        loop
        autoplay
        style={{ background: "transparent" }}
      />
    </div>
  );
};

export default HeroAnimation;
