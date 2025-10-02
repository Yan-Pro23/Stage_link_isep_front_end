import { useEffect, useState } from "react";
import api from "../services/api";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ul className="list-group">
      {users.map(u => (
        <li key={u.id} className="list-group-item">
          {u.name} - {u.email}
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
