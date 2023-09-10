import axios from 'axios';
import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { authActions } from '../store';
axios.defaults.withCredentials = true;

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.username);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  return (
    <div><><nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand text-white" to="/">News Aggregator</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {isLoggedIn &&<>  <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
          </li>

        
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/business">Business</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/entertainment">Entertainment</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/health">Health</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/science">Science</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/sports">Sports</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/technology">Technology</Link>
          </li> 
          <li className="nav-item">
                <span className="nav-link active text-white" aria-current="page">
                 {username} {/* Display the username */}
                </span>
              </li>
          </>}{" "}
{!isLoggedIn &&
        ( <> {" "} <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active text-white" aria-current="page" to="/signup">signup</Link>
          </li> </>)}
    {isLoggedIn &&  (<li className="nav-item">
            <Link                   onClick={handleLogout}
className="nav-link active text-white" aria-current="page" to="/">logout</Link>
          </li>)}  {" "}  
        </ul>
       
      </div>
    </div>
  </nav></></div>
  )
}

export default Navbar