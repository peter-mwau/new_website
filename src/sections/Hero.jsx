//src/sections/Hero.jsx
import WebThreeRareBG from '../backgrounds/WebThreeRareBg-dark';
import Navbar from '../components/Navbar';

const Hero = () => {
  return (
    <>
      <div className="relative w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* <img
          src={WebThreeRareBG}
          alt="Web Three Rare Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        /> */}
        <WebThreeRareBG />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to Nyota Digital Labs
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl text-center">
            We are a team of passionate developers and designers creating innovative digital experiences.
          </p>
          <Navbar />
        </div>
      </div>
    </>
  );
}
 export default Hero;
