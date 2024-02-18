import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { useAppSelector } from "../../Redux/hook";
import { verifyToken } from "../../Hooks/verifyToken";
import { TUser, useCurrentToken } from "../../Redux/features/auth/authSlice";
import { managerPaths } from "../../routes/manager.routes";
import { userPaths } from "../../routes/user.routes";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { superAdminPaths } from "../../routes/superAdmin.routes";

// Destructure components from Ant Design
const { Sider } = Layout;

// Define user roles
const userRole = {
  Manager: "manager",
  User: "user",
  SuperAdmin: "superAdmin",
};

// Define the Sidebar component
const Sidebar = () => {
  // Get user token from Redux
  const token = useAppSelector(useCurrentToken);

  // Initialize user variable
  let user;

  // Verify token and extract user information
  if (token) {
    user = verifyToken(token);
  }

  // Initialize sidebarItems variable based on user role
  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.Manager:
      sidebarItems = sidebarItemsGenerator(managerPaths, userRole.Manager);
      break;
    case userRole.User:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.User);
      break;
    case userRole.SuperAdmin:
      sidebarItems = sidebarItemsGenerator(
        superAdminPaths,
        userRole.SuperAdmin
      );
      break;
    default:
      break;
  }

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>ElectricGadget</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems as ItemType<MenuItemType>[]}
        />
      </Sider>
    </>
  );
};

// Export the Sidebar component
export default Sidebar;
