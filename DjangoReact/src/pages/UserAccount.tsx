import { useEffect } from "react";
import useUserData from "../hooks/useUserData";

const UserAccount = () => {
  const userData = useUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      await userData();
    };

    fetchUserData();
  }, [userData]);

  return <div>UserAccount</div>;
};

export default UserAccount;
