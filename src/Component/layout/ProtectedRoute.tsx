import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../Hooks/verifyToken";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { logout, useCurrentToken } from "../../Redux/features/auth/authSlice";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
