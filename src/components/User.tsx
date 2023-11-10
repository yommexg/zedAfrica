import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setPageSize, setPage } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

import { useEffect, FC } from "react";

import "./User.css";

interface UserProps {
  id: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  email: string;
  phone: string;
  login: {
    uuid: string;
  };
}

interface State {
  users: Array<UserProps>;
  loading: boolean;
  error: Error | null;
  currentPage: number;
  pageSize: number;
}

const User: FC<State> = () => {
  const dispatch = useDispatch();
  const { users, loading, error, currentPage, pageSize } = useSelector(
    (state: State) => state
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersFunction = fetchUsers();
    fetchUsersFunction(dispatch);
  }, [dispatch]);

  const handleNextPageClick = () => {
    if (currentPage < 50 / pageSize) dispatch(setPage(currentPage + 1));
  };

  const handlePreviousPageClick = () => {
    if (currentPage - 1 >= 1) dispatch(setPage(currentPage - 1));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    dispatch(setPageSize(newPageSize));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    handlePageSizeChange(newPageSize);
  };

  return (
    <div className="users-container">
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <select value={pageSize} onChange={handleSelectChange}>
            <option value="5">5 Users per Page</option>
            <option value="10">10 Users per Page</option>
          </select>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Email Address</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((user: UserProps, index: number) => (
                  <tr key={index}>
                    <td
                      width="30%"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => navigate(`/user/${user.login.uuid}`)}
                    >
                      {user.name.title}
                      {user.name.first}
                      {user.name.last}
                    </td>

                    <td width="20%">{user.location.country}</td>
                    <td width="30%">{user.email}</td>
                    <td width="20%">{user.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="buttons">
            <button onClick={handlePreviousPageClick}>Prev</button>
            <button onClick={handleNextPageClick}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
