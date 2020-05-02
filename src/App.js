import * as React from 'react';
import UsersList from './UsersList'

const allUsers = ['Michal', 'Kasia', 'Jacek', 'Marta', 'Tomek', 'Ania'];

function App() {
  const[filteredUsers, setUsers] = React.useState(allUsers);

  function filterUsers(e) {
    const text = e.currentTarget.value;    
    setUsers(getFilteredUsersForText(text));
  }

  function getFilteredUsersForText(text) {
    return allUsers.filter(user => user.toLowerCase().includes(text.toLowerCase()))
  }
  
  return (
    <div>
      <input onInput={filterUsers} />
      <UsersList users={filteredUsers} />
    </div>
  );
  
};

export default App;