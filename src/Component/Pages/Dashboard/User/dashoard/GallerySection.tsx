//import { HiOutlineCheck } from "react-icons/hi";

import gallery1 from "../../../../../assets/images/gallery1.png";
import gallery2 from "../../../../../assets/images/gallery2.png";
import gallery3 from "../../../../../assets/images/gallery3.png";
import gallery4 from "../../../../../assets/images/gallery4.png";
import gallery5 from "../../../../../assets/images/gallery5.webp";
import gallery6 from "../../../../../assets/images/gallery6.jpeg";
import gallery7 from "../../../../../assets/images/gallery7.png";
import gallery8 from "../../../../../assets//images/gallery8.jpg";
import gallery9 from "../../../../../assets/images/gallery9.webp";
import gallery10 from "../../../../../assets/images/gallery10.jpg";
import gallery11 from "../../../../../assets/images/gallery11.jpeg";
import gallery12 from "../../../../../assets/images/gallery12.jpeg";
import gallery13 from "../../../../../assets/images/gallery13.webp";
import { easeInOut, motion } from "framer-motion";

const GallerySection = () => {
  const galleryAnimation = {
    hidden: {
      scale: 0,
      opacity: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "linear",
        duration: 2,
      },
    },
    hover: {
      scale: 2,
      x: -150,
      transition: {
        ease: easeInOut,
      },
    },
  };

  return (
    <>
      <div className="lg:mx-20 md:mx:20 mx-1 flex items-center justify-center">
        <div className=" card-actions justify-center overflow-hidden ">
          <h2 className="text-3xl sm:text-[64px] font-bold text-[#01DBF7] mb-10 ">
            {" "}
            Our Product Gallery{" "}
          </h2>
          <div className="grid grid-cols-12   place-items-center gap-5 lg:gap-1 ">
            <div className="col-span-12   space-y-5 ">
              <div className="grid grid-cols-6 justify-center p  place-items-center lace-content-center ">
                <div>
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery1}
                    alt="https://pngimg.com/d/headphones_PNG7642.png"
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery2}
                    alt="https://www.freeiconspng.com/thumbs/camera-photo-png/png-ico-icns-48x48-png-ico-icns-32x32-png-ico-icns-16x16-14.png"
                  />
                </div>
                <div>
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery3}
                    alt="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1700503182-q34t43t34t343-655b9e869846c.png?crop=1xw:1xh;center,top&resize=980:*"
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery4}
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRywb08YvH80QtxhG0zFE6WEBCaRxo3r8RuO2zVJXcHSlsRCtg7xP8W5FMA6zc42RcO0Ec&usqp=CAU"
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery5}
                    alt="https://static.vecteezy.com/system/resources/thumbnails/010/161/601/small/cctv-3d-illustration-png.png"
                  />
                </div>

                <div>
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery6}
                    alt="https://5.imimg.com/data5/ECOM/Default/2023/5/310019165/YC/SU/YL/4924047/1684756223319-2.jpeg"
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery7}
                    alt="https://pngimg.com/d/headphones_PNG7650.png"
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery8}
                    alt="https://m.media-amazon.com/images/I/61+FUtX5AtL._AC_UF894,1000_QL80_.jpg"
                  />
                </div>

                <div>
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery9}
                    alt="https://static.vecteezy.com/system/resources/thumbnails/024/513/086/small/3d-rendering-of-security-camera-free-png.png"
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery10}
                    alt="https://1000logos.net/wp-content/uploads/2023/11/Roberts-Revival-Petite-Pop-Digital-Radio.jpg"
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery11}
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQoh2uJWvw-IrJMoIA27p0ZDz7CQU41LU1ptZYqUAhdtrazdNjOPXJoS9ggF8NLKAUfo&usqp=CAU"
                  />
                </div>

                <div className="p-4">
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSblRglWLqo_QEcN5TlyF9i6aEFT3Enlog908OKRr5CXfnXTtXGpI2pWP73rLbyJx2StYI&usqp=CAU"
                    src={gallery12}
                  />
                  <motion.img
                    loading="lazy"
                    variants={galleryAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    src={gallery13}
                    alt="https://cdn.shopify.com/s/files/1/2689/5080/t/133/assets/best-gadgets-for-kids-cool-presents-for-children_3266.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default GallerySection;
