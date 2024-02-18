import Container from "../../../../Shared/Container";
import customer from "../../../../../assets/customer.webp";
import { FaQuoteLeft } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const CustomerSupport = () => {
  return (
    <Container>
      <div className=" py-14 mt-7   overflow-hidden">
        <div className="grid grid-cols-1 place-items-center place-content-center md:grid-cols-2 ">
          <Fade direction="left">
            <div data-aos="zoom-in-right">
              <img loading="lazy" src={customer} alt="managment" />
            </div>
          </Fade>
          <Fade direction="right">
            <div data-aos="zoom-out-left">
              <h2 className="text-3xl sm:text-5xl mb-8 font-bold">
                <span className="text-[#01DBF7]">24/7</span> Customer Support{" "}
              </h2>
              <div className="flex items-center mt-8">
                <div className=" border border-dotted  mr-5 h-[150px] bg-white"></div>
                <div>
                  <div className="flex relative ">
                    <FaQuoteLeft
                      size={40}
                      className="-z-2   -top-8 relative z-0 opacity-15 "
                    />
                    <p className="z-[99] italic max-w-[50ch] leading-7 -ml-8">
                      We were really thrilled with the steps the team took to
                      hold our hands as first-time customers, and we really felt
                      that level of support.
                    </p>
                  </div>
                  <div className="mt-3">
                    <h1 className="text-xl text-red-500 font-bold">
                      Rezoanul Hasan{" "}
                    </h1>
                    <p className="text-sm">Admin</p>
                  </div>
                </div>
              </div>
            </div>{" "}
          </Fade>
        </div>
      </div>{" "}
    </Container>
  );
};

export default CustomerSupport;
