import Lottie from "react-lottie";
import animationData from "../code.json";

const CodeLottie = () => {
  const options = {
    loop: true, // Whether the animation should loop
    autoplay: true, // Whether the animation should start automatically
    animationData, // The JSON animation file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Renderer settings
    },
  };

  return <Lottie options={options} height={400} width={400} />;
};

export default CodeLottie;
