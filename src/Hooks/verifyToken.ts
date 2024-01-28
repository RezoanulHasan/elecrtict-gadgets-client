import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyToken = (token: string | undefined | null): any => {
  try {
    if (!token || typeof token !== "string") {
      console.error("Invalid token format: must be a string", token);
      throw new Error("Invalid token format: must be a string");
    }

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken); // Log the decoded token
    return decodedToken;
  } catch (error) {
    console.error("Token verification error:", error);
    throw new Error("Invalid token specified");
  }
};
