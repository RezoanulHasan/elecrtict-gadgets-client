import { motion, useScroll } from "framer-motion";
import "./scroll.css";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className=" progress-bar   "
      />
      <h1 className="text-4xl">navber</h1>
    </div>
  );
};

export default Navbar;
