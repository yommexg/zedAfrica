import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

interface UserProps {
  gender: string;

  name: {
    title: string;
    first: string;
    last: string;
  };

  location: {
    country: string;
    city: string;
    postcode: number;
    street: {
      number: number;
      name: string;
    };
    state: string;
  };

  email: string;
  phone: string;
  cell: string;

  picture: {
    large: string;
  };

  login: {
    uuid: string;
  };
  registered: {
    date: "string";
    age: number;
  };

  dob: {
    age: number;
    date: string;
  };
}

interface State {
  users: Array<UserProps>;
}

const UserDetails = () => {
  const { userId } = useParams();

  const { users } = useSelector((state: State) => state);

  const foundUser = users.find((user) => user.login.uuid === userId);

  const birthMomentDate = moment(foundUser?.dob.date);

  const birthDate = birthMomentDate.format("MM/DD/YYYY");

  const registeredMomentDate = moment(foundUser?.registered.date);

  const registeredDate = registeredMomentDate.format("MM/DD/YYYY");

  return (
    <div className="user-detail-container">
      <img
        src={foundUser?.picture.large}
        width={200}
        alt={foundUser?.name.first}
      />
      <h2>
        Name: {foundUser?.name.title} {foundUser?.name.first}{" "}
        {foundUser?.name.last}
      </h2>
      <h3>Email: {foundUser?.email}</h3>
      <h4>
        Address: {foundUser?.location.street.number},{" "}
        {foundUser?.location.street.name}, {foundUser?.location.city}{" "}
        {foundUser?.location.postcode}, {foundUser?.location.state},{" "}
        {foundUser?.location.country}
      </h4>

      <p>Gender: {foundUser?.gender}</p>
      <p>Cell: {foundUser?.cell}</p>
      <p>Phone Number: {foundUser?.phone}</p>
      <p>Age: {foundUser?.dob.age}</p>
      <p>Date of Birth:{birthDate}</p>
      <p>Date of Registration: {registeredDate}</p>
    </div>
  );
};

export default UserDetails;
