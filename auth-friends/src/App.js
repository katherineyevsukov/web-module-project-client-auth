import logo from './logo.svg';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <h1>SUP</h1>
      

    <Route path='/' component={Login}/>
    </div>
  );
}

export default App;
