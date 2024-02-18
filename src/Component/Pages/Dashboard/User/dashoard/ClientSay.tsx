import c1 from "../../../../../assets/c1.jpeg";
import c2 from "../../../../../assets/c2.jpeg";
import c3 from "../../../../../assets/c3.jpeg";

import netflix from "../../../../../assets/netflix.svg";
import google from "../../../../../assets/google.svg";
import youtube from "../../../../../assets/youtube.svg";
import { motion } from "framer-motion";
import Container from "../../../../Shared/Container";
import { Fade } from "react-awesome-reveal";
const ClientSay = () => {
  return (
    <Container>
      <div className="  overflow-hidden grid lg:grid-cols-2 justify-items-end items-end">
        <Fade direction="left">
          <div className="mt-7">
            <h1 className="text-[#01DBF7]  text-5xl font-extrabold mb-6">
              What client says
            </h1>
            <p className="text-[#566B84] text-lg font-normal">
              Ut posuere felis arcu tellus tempus in in ultricies. Gravida id
              nibh ornare viverra. Ultrices faucibus neque velit risus ac id
              lorem.Ut
            </p>
          </div>{" "}
        </Fade>
      </div>

      <div className="mt-[70px] grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-10 bg-[#FFF9EE] rounded-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img loading="lazy" src={c1} alt="" />
              </div>
            </div>

            <div>
              <h2 className="text-[#061C3D] font-inter text-base font-medium">
                Annette Black
              </h2>
              <p className="text-[#42526B] font-inter text-sm font-medium">
                Product Officer of <br></br>
                <span className="text-[#7534FF]">Netflix</span>
              </p>
            </div>
          </div>
          <p className="mt-6 text-[#061C3D] text-lg font-normal font-inter">
            “I amy very Happy to use you product and ypur service”
          </p>
          <img loading="lazy" className="mt-10" src={netflix} alt="" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-10 bg-[#f0f5e7] rounded-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img loading="lazy" src={c2} alt="" />
              </div>
            </div>

            <div>
              <h2 className="text-[#061C3D] font-inter text-base font-medium">
                Limay Uzal
              </h2>
              <p className="text-[#42526B] font-inter text-sm font-medium">
                Manager of <br></br>
                <span className="text-[#7534FF]">Google</span>
              </p>
            </div>
          </div>
          <p className="mt-6 text-[#061C3D] text-lg font-normal font-inter">
            “his is one of the BEST shopping platform ”
          </p>
          <img className="mt-10" src={google} alt="" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-10 bg-red-100 rounded-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img loading="lazy" src={c3} alt="" />
              </div>
            </div>

            <div>
              <h2 className="text-[#061C3D] font-inter text-base font-medium">
                Jack Harry
              </h2>
              <p className="text-[#42526B] font-inter text-sm font-medium">
                Region Head of <br></br>
                <span className="text-[#7534FF]">Youtube</span>
              </p>
            </div>
          </div>
          <p className="mt-6 text-[#061C3D] text-lg font-normal font-inter">
            “This is one of the BEST shop I've ever worked with ”
          </p>
          <img className="mt-10" src={youtube} alt="" />
        </motion.div>
      </div>
    </Container>
  );
};

export default ClientSay;
