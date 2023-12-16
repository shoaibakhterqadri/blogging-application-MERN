import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { blockUnblockSubAdmins, getSubAdmins } from "./../../store/actions/Dashborad/dashboardAction";

import Pagination from "../home/Pagination";

const AllSubAdmin = () => {
  const user = "admin";
  const history = useHistory();
  // const status = "block";
  const dispatch = useDispatch();
  
  const { subAdmins, subAdminCount } = useSelector(
    (state) => state.dashboardIndex
  );
  const { userInfo } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    // Dispatch the action to get sub-admins when the component mounts
    dispatch(getSubAdmins());
  }, [dispatch]);



  const handleBlockUnblock =async (subAdminId, accessStatus) => {
    // Dispatch the action to block/unblock sub-admin
   await dispatch(blockUnblockSubAdmins(subAdminId, accessStatus));

   const updatedSubAdmins = subAdmins.map((subAdmin) =>
   subAdmin._id === subAdminId ? { ...subAdmin, accessStatus } : subAdmin
 );
 dispatch({ type: 'GET_SUB_ADMINS_SUCCESS', payload: updatedSubAdmins });

 const newPath = `${history.location.pathname}/${subAdminId}`;
 history.push(newPath);


    // const newPath = `${history.location.pathname}/${subAdminId}`;

    // history.push(newPath);
  };

  return (
    <div className="all-sub-admin">
      <Helmet>
        <title>Sub admin</title>
      </Helmet>
      <div className="elements-numberOf-search-add_new">
        <div className="numof-search-newAdd">
          <div className="numof">
            <h2>Sub Admin ({subAdminCount})</h2>
          </div>
          <div className="searchOf">
            <div className="search">
              <input
                type="text"
                placeholder="search article"
                className="form-control"
              />
            </div>
            <span>
              <FaSearch />
            </span>
          </div>
          <div className="newAdd">
            <Link className="btn" to="/dashborad/all-user">
              User
            </Link>
          </div>
        </div>
        <div className="loading-elements">
          <div className="elements">
            <div className="table-wapper">
              <table>
                <thead>
                  <tr className="tr">
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subAdmins.map((subAdmin, index) => (
                    <tr key={subAdmin._id}>
                      <td data-label="No">{index + 1}</td>
                      <td data-label="Name">{subAdmin.userName}</td>
                      <td data-label="Email">{subAdmin.email}</td>
                      <td data-label="Image" className="image">
                        <img src={subAdmin.image} alt="image" />
                      </td>
                      <td data-label="Action">
                        {console.log(subAdmin.accessStatus)}
                        {userInfo.role === "admin" && (
                          <span
                            className={
                              subAdmin.accessStatus === "unblock" ? "unsus" : "sus"
                            }
                            onClick={() =>
                              handleBlockUnblock(
                                subAdmin._id,
                                subAdmin.accessStatus === "unblock"? "block": "unblock"
                              )
                            }
                          >
                            {subAdmin.accessStatus === "unblock"
                              ? "Block"
                              : "Unblock"}
                          </span>
                        )}
                        <Link
                          to={`/dashborad/sub-admin-profile/${subAdmin.email}`}
                        >
                          Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSubAdmin;
