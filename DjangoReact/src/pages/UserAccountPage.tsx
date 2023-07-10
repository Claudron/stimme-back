import ChangeEmail from "../components/ChangeEmail";
import ChangePassword from "../components/ChangePassword";
import UserData from "../components/UserData";

const UserAccountPage = () => {
  return (
    <>
      <UserData />
      <ChangePassword />
      <ChangeEmail />
    </>
  );
};

export default UserAccountPage;
