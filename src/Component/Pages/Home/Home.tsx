/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";
import useTitle from "../../../Hooks/useTitle";
import { useNavigate } from "react-router-dom";

//<ElectricGadgets></ElectricGadgets>
//import ElectricGadgets from "./Sells/ElectricGadgets";
//import ElectricGadgetsList from "./Management/ElectricGadgetsList";

const Home = () => {
  useTitle("Home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/registration");
  };

  return (
    <div>
      <div className="card-actions bg-red-700 mt-5 justify-center">
        <button
          className="btn btn-wide  front-bold  hover:text-black  bg-black text-white"
          onClick={handleButtonClick}
        >
          Show Product List Click Here
        </button>{" "}
      </div>
      <div className="hero min-h-screen bg-black text-white my-10">
        <div className="hero-content flex-col lg:flex-row">
          <div className="lg:w-1/2 relative">
            <img
              src="https://i.ibb.co/PTdzhqS/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet.png"
              className="w-3/4  rounded-lg shadow-2xl"
            />
            <img
              src="https://i.ibb.co/wCmRV8T/Blog-Image-Wordpress-2.png"
              className="w-1/2 absolute right-5 top-1/2 rounded-lg border-8 border-base-200 shadow-2xl"
            />
          </div>

          <div className="lg:w-1/2 space-y-5 p-4">
            <h3 className="text-3xl text-orange-500 font-bold">About...</h3>
            <h1 className="text-5xl   text-red-100 font-bold">
              Join the ElectricGadget community <br /> Embrace the future of
              <br /> technology with ElectricGadget
            </h1>
            <p className="py-6">
              Welcome to ElectricGadget, where cutting-edge technology meets
              unparalleled convenience. Our shop is a haven for tech
              enthusiasts, offering a curated selection of the latest and most
              innovative electronic devices and gadgets. Whether you're in
              search of state-of-the-art smartphones, sleek wearable tech, or
              eco-friendly and energy-efficient options, ElectricGadget has you
              covered. We take pride in staying ahead of the curve, consistently
              updating our inventory with the newest arrivals in the tech world.
              Our commitment to customer satisfaction goes beyond providing a
              diverse range of high-quality products; our knowledgeable staff is
              dedicated to offering expert advice and personalized
              recommendations. Located for your convenience, ElectricGadget is
              more than just a store – it's a community. Join us and experience
              the future of technology through exclusive events, promotions, and
              product launches. Elevate your lifestyle with ElectricGadget, your
              trusted partner in the ever-evolving world of electronic
              innovation..{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
