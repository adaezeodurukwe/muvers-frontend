import React, { useState } from "react";
import "./index.scss";
import Layout from "../../Layout";
import Delivery from "../../assets/delivery.svg";
import { Button } from "@material-ui/core";
import SignUP from "./SignUp";

const Home = () => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false)
  const closeSIgnUp = () => {
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
        <SignUP open={openSignUpModal} handleClose={closeSIgnUp} />
      </div>
    </Layout>
  );
};

export default Home;
