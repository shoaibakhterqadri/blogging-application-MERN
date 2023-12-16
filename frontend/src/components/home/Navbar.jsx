import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutube,
  FaGithubSquare,
} from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { BsListUl } from "react-icons/bs";
import { useSelector } from "react-redux";
import AdminInfo from "../dashborad/AdminInfo";

const Navbar = ({ nav }) => {
  const [profileModelShow, setProfileModelShow] = useState(false);
  const [nModelShow, setNModelShow] = useState(false);
  const { userInfo } = useSelector((state) => state.adminReducer);

  const profileModel = () => {
    if (profileModelShow) {
      setProfileModelShow(false);
    } else {
      setNModelShow(false);
      setProfileModelShow(true);
    }
  };
  const nModel = () => {
    if (nModelShow) {
      setNModelShow(false);
    } else {
      setProfileModelShow(false);
      setNModelShow(true);
    }
  };

  return (
    <div ref={nav} id="navbar" className="navbar">
      <div className="container">
        <div className="row">
          <input type="checkbox" id="toggle" />
          <div className="col-4">
            <div className="image-menubar">
              <Link className="image" to="/">
                <img
                  src="http://localhost:3000/designImage/myBlog.png"
                  alt=""
                />
              </Link>
              <label className="menu_icon" htmlFor="toggle">
                <BsListUl />
              </label>
            </div>
          </div>
          <div className="col-8">
            <ul className="link-list toggle">
              <li className="link-item">
                <Link to="/about">About</Link>
              </li>
              <li className="link-item">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="link-item">
                <Link to="/policy">Write For Us</Link>
              </li>
              <li className="link-item">
                {console.log(userInfo)}
                {userInfo && userInfo.role === "sub admin" && userInfo.accessStatus==="unblock" ? (
                  <>
                    
                    <div className="profile-details" onClick={profileModel}>
      <label htmlFor="adminInfo">
        <img src={userInfo.image} alt="user-image" />
      </label>
      <div className="name-time">
        <h3>{userInfo.name}</h3>
        <span>{moment(userInfo.createdAt).format("ll")}</span>
      </div>
      <AdminInfo profileModelShow={profileModelShow} userInfo={userInfo} />
    </div>
                  </>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>

              <div className="social-icon">
                <li className="link-item">
                  <Link to="/about">
                    <span>
                      <FaFacebookSquare />
                    </span>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/about">
                    <span>
                      <FaTwitterSquare />
                    </span>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/about">
                    <span>
                      <FaYoutube />
                    </span>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/about">
                    <span>
                      <FaGithubSquare />
                    </span>
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="/about">
                    <span>
                      <ImLinkedin />
                    </span>
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
