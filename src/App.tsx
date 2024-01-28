import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Link } from "react-scroll";
import { FaArrowUp } from "react-icons/fa";
import Container from "./Component/Shared/Container";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top">
      <Container>
        <div className="mt-2 ">
          <Outlet />
        </div>
      </Container>
      <div className="card-actions justify-center">
        <Link to="top" smooth={true} duration={500}>
          <button className="btn bg-black text-white  hover:btn ">
            <FaArrowUp className=""></FaArrowUp>
          </button>
        </Link>{" "}
      </div>
    </div>
  );
};

export default App;
