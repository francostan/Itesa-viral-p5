import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import handleInput from "../reactHooks/handleInput";
import axios from "../config/axios";
import { login, logout } from "../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import cookieCutter from "cookie-cutter";
import { useState, useEffect } from "react";

export default function Home() {
  const user = useSelector((state) => state.user);
  const nickName = handleInput();
  const email = handleInput();
  const password = handleInput();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const cookieCutter = require("cookie-cutter");


  useEffect(() => {
    axios.get("/me").then((user) => dispatch(login(user.data)));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nick_name: nickName.value,
      email: email.value,
      password: password.value,
    };
    const created = await axios.post("/newUser", newUser);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      nick_name: nickName.value,
      password: password.value,
    };
    const loggedUser = await axios.post("/login", user);
    if (loggedUser.status === 200) dispatch(login(loggedUser.data));
    else console.log("hay algo mal");
  };

  const secreto = handleInput();


  const LOGOUT = () => {
    axios.post("/logout")
    dispatch(logout());
  };

  const handleSecret = async (e) => {
    e.preventDefault();
    const secret = {
      id: user.id,
      secret: secreto.value,
    };
    const loggedUser = await axios.post("/2FA", secret);
    if (loggedUser.status === 200) dispatch(login(loggedUser.data));
    else console.log("hay algo mal");
  };

  return (
    <div className={styles.container}>
      <h1>PRUEBA REGISTRO</h1>
      <form onSubmit={handleSubmit}>
        <label>Nickname: </label>
        <input type={"text"} {...nickName}></input>
        <label>email: </label>
        <input type={"text"} {...email}></input>
        <label>Password: </label>
        <input type={"password"} {...password}></input>
        <button type="submit">Submit</button>
      </form>
      <h1>PRUEBA LOGIN</h1>
      <form onSubmit={handleLogin}>
        <label>Nickname: </label>
        <input type={"text"} {...nickName}></input>
        <label>Password: </label>
        <input type={"password"} {...password}></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h1>USER</h1>
        <h3>nickname: {user.nick_name}</h3>
        <h3>email: {user.email}</h3>
      </div>
      <button onClick={LOGOUT}>LOGOUT</button>
      <h1>PRUEBA SECRET </h1>
      <form onSubmit={handleSecret}>
        <label>Secret: </label>
        <input type={"text"} {...secreto}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
