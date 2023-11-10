import User from "./components/User";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";

function App(): JSX.Element {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <User
              users={[]}
              loading={false}
              error={null}
              currentPage={0}
              pageSize={0}
            />
          }
        />
        <Route path="/user/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
