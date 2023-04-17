import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

/**AUTHGAURD FOR INNER PAGES */
export const RequireAuth = (props: any) => {
  const userDetails = useSelector((state: any) => state.user)
  return userDetails?.walletAddress ? props.children : <Navigate to="/" />;
}

