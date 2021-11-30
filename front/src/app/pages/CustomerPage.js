import React, { useEffect, useState } from "react";
import { getAllCustomers,deleteUserById } from "../actions/customers/customersActions";
import {connect} from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
function CustomerPage(props) {
  const [users, setUsers] = useState([]);
  const displayUsers = () => {
    return users.map((user, index) => {
      return (
        <tbody key={index}>
          <tr className="text-center border-3 m-auto">
            <td className="px-3">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {index + 1}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex flex-column">
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {user.username}
                </span>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex flex-column">
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {user.email}
                </span>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex flex-column">
                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                  {user.role}
                </span>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column w-100">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {user.telephone}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-3">
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column w-100">
                  <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                    {user.mobile}
                  </span>
                </div>
              </div>
            </td>
            <td className="border text-center">
              <FaEdit
                className="cursor-pointer text-primary mx-3"
                style={{ fontSize: "18px" }}
              />
              <AiFillDelete
                className="text-danger cursor-pointer"
                style={{ fontSize: "18px" }}
                onClick = {()=> props.deleteUser(user._id)}
              />
            </td>
          </tr>
        </tbody>
      );
    });
  };
  useEffect(() => {
    props.getAll()
    setUsers(props.customers.users)
  }, [props])
  return (
    <div className="card-body py-3">
      <div className="table-responsive rounded">
        <table className="table table-hover align-middle gs-0 gy-4">
          <thead>
            <tr>
              <td className="min-w-125px">ID</td>
              <td className="min-w-125px text-center">UserName</td>
              <td className="min-w-125px text-center">Email</td>
              <td className="min-w-125px text-center">Role</td>
              <td className="min-w-125px text-center">Telephone</td>
              <td className="min-w-125px text-center">Mobile</td>
              <td className="min-w-125px text-center">Action</td>
            </tr>
          </thead>
          <>{displayUsers()}</>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return {
    customers: state.customer
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getAll: () => dispatch(getAllCustomers()),
    deleteUser: (id) => dispatch(deleteUserById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
