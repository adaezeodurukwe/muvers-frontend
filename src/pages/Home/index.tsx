import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import Delivery from "../../assets/delivery.svg";
import { Button } from "@material-ui/core";
import SignUP from "./SignUp";
import SignIn from "./SignIn";
import { useLocation } from "react-router-dom";
import "./index.scss";

const Home = () => {
  const {pathname} = useLocation()
  const [openSignUpModal, setOpenSignUpModal] = useState(false)
  const [openSignInModal, setOpenSignInModal] = useState(false)

  useEffect(() => {
    if (pathname.includes("login")) {
      setOpenSignInModal(true)
    }
  }, [pathname])

  const closeSignUp = () => {
    setOpenSignUpModal(false)
  }
  const openSignUp = () => {
    setOpenSignUpModal(true)
  }

  return (
    <Layout>
      <div className="home d-flex align-items-center">
        <img src={Delivery} height="450" className="mr-5" alt="delivery" />
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <h1 className="text-center">Let us move you!</h1>
          <Button onClick={openSignUp} color="secondary" variant="contained">Get Started</Button>
        </div>
        <SignUP open={openSignUpModal} handleClose={closeSignUp} />
        <SignIn handleClose={() => setOpenSignInModal(false)} open={openSignInModal} />
      </div>
    </Layout>
  );
};

export default Home;
