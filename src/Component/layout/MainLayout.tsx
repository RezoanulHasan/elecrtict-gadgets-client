import { Layout } from "antd";
import Sidebar from "./Sidebar";
import "./scroll.css";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hook";
import { logout } from "../../Redux/features/auth/authSlice";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-scroll";
import { motion, useScroll } from "framer-motion";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { scrollYProgress } = useScroll();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div id="top">
      <Layout style={{ height: "100%" }}>
        <Sidebar />
        <Layout>
          <Header>
            <div className="card-actions mt-2 justify-end">
              <button
                className="bg-black btn text-white hover:text-black"
                onClick={handleLogout}
              >
                Logout
              </button>{" "}
            </div>
          </Header>

          <Content style={{ margin: "24px 16px 0" }}>
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className=" progress-bar   "
            />
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
            <div className="card-actions justify-center">
              <Link to="top" smooth={true} duration={500}>
                <button className="btn bg-black text-white  hover:btn ">
                  <FaArrowUp className=""></FaArrowUp>
                </button>
              </Link>{" "}
            </div>{" "}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
