import './App.css';
import NavBar from './components/navBar/navBar';
import {Outlet} from 'react-router'
import Footer from './components/footer/footer';


function App() {

  return (
    <div className="App">
      <div>
        <NavBar/>
        {<Outlet />}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
