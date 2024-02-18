import AboutMyCompany from "../User/dashoard/AboutMyCompany";
import Banner from "../User/dashoard/Banner";
import ClientSay from "../User/dashoard/ClientSay";
import CustomerSupport from "../User/dashoard/CustomerSupport";
import GallerySection from "../User/dashoard/GallerySection";

const SuperAdminDashboard = () => {
  return (
    <div>
      <h1> Super Admin Dashboard</h1>
      <Banner></Banner>
      <CustomerSupport></CustomerSupport>

      <AboutMyCompany></AboutMyCompany>
      <GallerySection></GallerySection>
      <ClientSay></ClientSay>
    </div>
  );
};

export default SuperAdminDashboard;
