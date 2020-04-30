import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

class Parent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: null,
      forwardValue: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleClick() {
    this.setState({ forwardValue: this.state.input });
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange} type="number" />
        <button onClick={this.handleClick}>Propagate to child</button>
        {this.state.forwardValue && <Child value={this.state.forwardValue}/>}
      </div>
    );
  }
}

class Child extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromParent: Number(props.value),
      current: Number(props.value)
    }

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.fromParent) {
      this.setState({
        fromParent: Number(nextProps.value),
        current: Number(nextProps.value),
      })
    }
  }
  
  handleIncrement() {
    this.setState({ current: this.state.current + 1 })
  }
  
  handleDecrement() {
    this.setState({ current: this.state.current - 1 })
  }
  
  render() {
    return(
      <div>
        <label>{this.state.current}</label>
        <button onclick="{this.handleIncrement}">+</button>
        <button onclick="{this.handleDecrement}">-</button>
      </div>
    );
    }
}

class NameSurname extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      surname: ""
    }
  }

  inputStr(e) {
    const inputName = e.currentTarget.name;
    this.setState({ [inputName]: e.currentTarget.value });
  }

  render() {
    return (
      <div>
        <input type="text" name="name" onInput={(e)=>this.inputStr(e)}/>
        <input type="text" name="surname" onInput={(e)=>this.inputStr(e)} />
        <output>{this.state.name} {this.state.surname}</output>
      </div>
    )
   }
}

class AppHeader extends React.Component {
  render() {
    return (
      <header className="ui fixed menu">
        <nav className="ui container">
          <a href="#" className="header item">
            <img
              className="logo"
              src="https://typeofweb.com/wp-content/uploads/2017/08/cropped-typeofweb_logo-04-white-smaller-1-e1504359870362.png"
            />
            Lista kontaktów
          </a>
          <div className="header item">
            <button className="ui button">Dodaj</button>
          </div>
        </nav>
      </header>
    );
  };
}

function ContactsList() {
  return (
    <ul className="ui relaxed divided list selection">
      <ContactItem
        login="typeofweb1"
        name="Lena"
        department="JavaScript Developer"
      />
      <ContactItem
        login="typeofweb2"
        name="Brian"
        department="Human Resources"
      />
      <ContactItem
        login="typeofweb3"
        name="Rick"
        department="QA"
      />
    </ul>
  );
}

function ContactItem({ login, name, department }) {
  const imgUrl = `https://api.adorable.io/avatars/55/${login}.png`;
  return (
    <li className="item">
      <img src={imgUrl} className="ui mini rounded image" />
      <div className="content">
        <h4 className="header">{name}</h4>
        <div className="description">{department}</div>
      </div>
    </li>
  );
}

const allUsers = ['Michal', 'Kasia', 'Jacek', 'Marta', 'Tomek', 'Ania'];
const MyUsersList = ({users}) => {
  if (users.length > 0) {
    return(
      <ul>
        {users.map(u => <li key={u}>{u}</li>)}
      </ul>
    )
  }

  return(
    <p>No users!!</p>
  )
}

class Users extends React.Component {

  constructor() {
    super();
    this.state = {
      filteredUsers: allUsers
    }
  }

  getFileterdUsersForText(text) {
    return allUsers.filter(u => u.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
  }

  filterUsers(e) {
    const text = e.target.value;
    const filteredUsers = this.getFileterdUsersForText(text);
    this.setState({filteredUsers});
  }

  render() {
    return(
      <div>
        <input onChange={this.filterUsers.bind(this)}></input>
        <MyUsersList users={this.state.filteredUsers}/>
      </div>
      
    )
  }

}

function App() {
  return (
    <div>
      <AppHeader />
      <main className="ui main text container">
        <ContactsList />
      </main>
      <div>
      <NameSurname/><br/>
      <Parent/><br/>
      <Users/>
    </div>
    </div>
    
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

