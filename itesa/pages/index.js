import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import handleInput from "../reactHooks/handleInput";
import axios from "../config/axios";
import { login, logout } from "../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import cookieCutter from "cookie-cutter";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const user = useSelector((state) => state.user);
  const nickName = handleInput();
  const email = handleInput();
  const password = handleInput();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const router=useRouter()
  const cookieCutter = require("cookie-cutter");

  useEffect(()=>{
    router.push("/home")
  },[])
  
  return (<>
  </>
  );
}
