
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import homeScreen from './screen/home_screen'
import NavBar from './component/navbar';
import Booking_screen from './screen/Booking_screen';
import Register_screen from './screen/Register_screen';
import Login_screen from './screen/Login_screen';
import Profile_screen from './screen/Profile_screen';
import Admin_screen from './screen/Admin_screen';


function App() {


  return (
    <>
      <div className="App">
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/home" exact Component={homeScreen}>

            </Route>
            <Route path="/book/:locationId/:fromdate/:todate" exact Component={Booking_screen}/>
            <Route path="/register"exact Component ={Register_screen}/>
            <Route path = "/login"exact Component={Login_screen} />
            <Route path="/profile"exact Component={Profile_screen} />
            <Route path="/admin" exact Component={Admin_screen}/>
           
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
