import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import Delivery from "../../assets/delivery.svg";
import { Button } from "@material-ui/core";
import SignUP from "./SignUp";
import SignIn from "./SignIn";
import { useHistory, useLocation } from "react-router-dom";
import "./index.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { clearSuccess } from "../../redux/Actions";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const { userCreated } = useSelector((store: RootStateOrAny) => store.auth);

  useEffect(() => {
    if (userCreated) {
      history.push("/login");
    }
  }, [history, userCreated]);

  useEffect(() => {
    if (pathname.includes("login")) {
      dispatch(clearSuccess());
      setOpenSignInModal(true);
    }
  }, [dispatch, pathname]);

  const closeSignUp = () => {
    setOpenSignUpModal(false);
  };
  const openSignUp = () => {
    setOpenSignUpModal(true);
  };

  return (
    <Layout>
      <div className="home d-flex align-items-center">
        <img src={Delivery} height="450" className="mr-5" alt="delivery" />
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <h1 className="text-center">Let us move you!</h1>
          <Button onClick={openSignUp} color="secondary" variant="contained">
            Get Started
          </Button>
        </div>
        <SignUP open={openSignUpModal} handleClose={closeSignUp} />
        <SignIn
          handleClose={() => setOpenSignInModal(false)}
          open={openSignInModal}
        />
      </div>
    </Layout>
  );
};

export default Home;
