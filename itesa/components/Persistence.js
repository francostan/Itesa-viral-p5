import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/reducers/userSlice";
import axios from "../config/axios";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";

const Persistence = () => {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.user);
  const router = useRouter();

  React.useEffect(() => {
    axios
      .get("/me")
      .then((user) => dispatch(login(user.data)))
      .catch((error) => {
        axios.post("/logout").then((result) => router.push("/home"));
      });
  }, []);

  return <div></div>;
};

export default Persistence;
