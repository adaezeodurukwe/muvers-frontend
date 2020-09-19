import React from "react";
import "./index.scss";
import Layout from "../../Layout";
import Delivery from "../../assets/delivery.svg";
import { Button } from "@material-ui/core";

const Home = () => {
  return (
    <Layout>
      <div className="home d-flex align-items-center">
        <img src={Delivery} height="500" alt="delivery" />
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <h1>Let us move you!</h1>
          <Button variant="contained">Get Started</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
