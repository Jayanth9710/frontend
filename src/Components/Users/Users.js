import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import env from "../../Settings";
import { Context } from "../../Components/Context/Context";



function Users() {
  const UserIdArray = JSON.parse(window.localStorage.getItem("details"));
  const [pageCount, setPageCount] = useState(0);
  const UserId = UserIdArray.userId;
  const [userDetails, setUserDetails] = useState("");
  const [incidentId, setIncidentId] = useState("");
  const [IncidentDetails, setIncidentDetails] = useState("");

  const fetchUser = async () => {
    const res = await axios.get(`${env.api}/users/${UserId}`);
    setUserDetails(res.others);
    setIncidentDetails(res.data.incidentDetails);
    // console.log( res.data.others);
    console.log( res.data.incidentDetails);
  };

  // const fetchUserIncidentDetails = async () => {
  //   {incidentId ? incidentId.map((e,i) => {
  //     for(let i=0;i<=incidentId.length;i++) {
  //  const id = e.id;
  //    const result = await axios.get(`${env.api}/incident/${id}`);
  //   console.log(result.data.incident, "---Incident Details of the User---");
  //   setIncidentDetails(result.data.incident);
  //     }
  //   }):""}
  // };
  //   alert(incidentId);
  
  //   const result = await axios.get(`${env.api}/incident/${id}`);
  //   console.log(result.data.incident, "---Incident Details of the User---");
  //   setIncidentDetails(result.data.incident);
  // };

  const handleResolve = async (id) => {
    alert(`confirm Status as Resolved of ${id}` );
    const res = await axios.put(`${env.api}/incident/resolve/${id}`);
    fetchUser();
  };

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  useEffect(() => {
    fetchUser();
    // fetchUserIncidentDetails();
  }, []);
  return (
    <>
      <h1 class="h3 mb-2 text-gray-800">Incidents</h1>
      <p class="mb-4">All incidents assigned to you will be listed here.</p>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Incidents</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Ttile</th>
                  <th>Details</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>S.No</th>
                  <th>Ttile</th>
                  <th>Details</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {/* {IncidentDetails ? (<>
                    <tr>
                          <td>{IncidentDetails.title}</td>
                          <td>{IncidentDetails.desc}</td>
                          <td>{IncidentDetails.type}</td>
                          <td>{IncidentDetails.resolved ? "Resolved" : "Pending"}</td>
                          <td>{IncidentDetails.createdAt}</td>
                          <td>{IncidentDetails.updatedAt}</td>
                          <td>
                             <Link
                              to={`/resolve/${IncidentDetails._id}`}
                              className="btn btn-primary"
                            >
                              Mark as resolved
                            </Link> 
                            {IncidentDetails.resolved ? "Resolved" : <button
                              onClick={() => {
                                handleResolve(IncidentDetails._id);
                              }}
                              className="btn btn-primary"
                            >
                              Mark as resolved
                            </button>}
                            
                          </td>
                        </tr>
                  </>) :("")} */}

                {IncidentDetails
                  ? IncidentDetails.map((e, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{e.title}</td>
                          <td>{e.desc}</td>
                          <td>{e.type}</td>
                          <td>{e.resolved ? "Resolved" : "Pending"}</td>
                          <td>{e.createdAt}</td>
                          <td>{e.updatedAt}</td>
                          <td>
                            {/* <Link
                              to={`/resolve/${e._id}`}
                              className="btn btn-primary"
                            >
                              Mark as resolved
                            </Link>  */}
                           {e.resolved ? "Resolved" : <button
                              onClick={() => {
                                handleResolve(e._id);
                              }}
                              className="btn btn-primary"
                            >
                              Mark as resolved
                            </button>}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
