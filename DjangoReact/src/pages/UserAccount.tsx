import useUserData from "../hooks/useUserData";

const UserAccount = () => {
  const { data, isLoading, isError, error } = useUserData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <div>
        <h2>User data:</h2>
        <p>Email: {data.email}</p>
        <p>First Name: {data.first_name}</p>
        <p>Last Name: {data.last_name}</p>
      </div>
    );
  }

  return null;
};

export default UserAccount;
