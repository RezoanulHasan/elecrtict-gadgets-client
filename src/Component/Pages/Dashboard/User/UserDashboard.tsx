import AboutMyCompany from "./dashoard/AboutMyCompany";
import Banner from "./dashoard/Banner";
import ClientSay from "./dashoard/ClientSay";
import CustomerSupport from "./dashoard/CustomerSupport";
import GallerySection from "./dashoard/GallerySection";

const UserDashboard = () => {
  return (
    <div className=" overflow-hidden">
      <Banner></Banner>

      <CustomerSupport></CustomerSupport>

      <AboutMyCompany></AboutMyCompany>
      <GallerySection></GallerySection>
      <ClientSay></ClientSay>
    </div>
  );
};

export default UserDashboard;
