import { Fade } from "react-awesome-reveal";
import aboutMyCompany1 from "../../../../../assets/aboutMyCompany1.png";
import aboutMyCompany2 from "../../../../../assets/aboutMyCompany2.jpeg";
import click from "../../../../../assets/click.svg";
import { motion } from "framer-motion";

const AboutMyCompany = () => {
  return (
    <div className="  overflow-hidden mt-1 py-11 grid lg:grid-cols-2 items-center gap-16 lg:gap-24">
      <Fade direction="left">
        <div className="relative  w-3/4 mx-auto  lg:w-full mb-10 lg:mb-20">
          <img
            loading="lazy"
            className="rounded-full"
            src={aboutMyCompany1}
            alt=""
          />
          <img
            loading="lazy"
            className="absolute bottom-0 right-0 transform translate-x-12 translate-y-6 border-[10px] border-white rounded-full w-3/4 lg:w-1/2"
            src={aboutMyCompany2}
            alt=""
          />
        </div>
      </Fade>

      <Fade direction="right">
        <div>
          <h2 className="text-[#0B63E5] text-xl font-bold mb-6 tracking-widest">
            About Our Company
          </h2>
          <h1 className="text-[#061C3D] text-5xl font-extrabold mb-6">
            We Execute Our ideas From The Start to Finish
          </h1>
          <p className="text-[#566B84] text-lg font-normal">
            Our Online shopping is a haven for tech enthusiasts, offering a
            curated selection of the latest and most innovative electronic
            devices and gadgets. Whether you're in search of state-of-the-art
            smartphones, sleek wearable tech, or eco-friendly and
            energy-efficient options, ElectricGadget has you covered.
          </p>
          <ul className="space-y-4 mt-6">
            <div className="flex gap-[6px] items-center">
              <img
                loading="lazy"
                src={click}
                className="size-4 bg-[#0B63E5] p-1"
                alt=""
              />
              <p className="text-[#454545] font-medium text-lg font-inter">
                Large Number of Electric Gadgets
              </p>
            </div>
            <div className="flex gap-[6px] items-center">
              <img
                loading="lazy"
                src={click}
                className="size-4 bg-[#0B63E5] p-1"
                alt=""
              />
              <p className="text-[#454545] font-medium text-lg font-inter">
                World best costumer service
              </p>
            </div>
            <div className="flex gap-[6px] items-center">
              <img
                loading="lazy"
                src={click}
                className="size-4 bg-[#0B63E5] p-1"
                alt=""
              />
              <p className="text-[#454545] font-medium text-lg font-inter">
                Industry professionals with a global mindset
              </p>
            </div>
          </ul>
          <motion.button
            whileHover={{ y: -2, x: 2 }}
            className="bg-[#3461FF] py-3 px-10 mt-12 tracking-wider font-plus-jakarta-sans text-base font-bold text-white"
          >
            Read details
          </motion.button>
        </div>{" "}
      </Fade>
    </div>
  );
};

export default AboutMyCompany;
