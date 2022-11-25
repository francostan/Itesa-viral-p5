import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/reducers/userSlice";
import axios from 'axios';

const Persistence = () => {
    const dispatch = useDispatch();
    const userRedux = useSelector((state) => state.user);


    React.useEffect(() => {
        axios.get("/me").then((user) => dispatch(login(user.data)));
      }, []);

  return (
    <div>
    </div>
  )
}

export default Persistence