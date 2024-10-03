import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../features/index";
import { useState } from "react";
import { Spinner, Button } from "../index";

export const Logout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const logoutUser = () => {
    setLoading(true);
    try {
      authService.logout().then(() => {
        dispatch(logout());
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={logoutUser}
      className="bg-orange-600/10 hover:bg-orange-600/20 text-gray-900"
    >
      {loading ? <Spinner /> : "Logout"}
    </Button>
  );
};
