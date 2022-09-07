import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Button from "../../Button/Button";

import Loader from "../../../util/loader";
import SiteModal from "../../SiteModal/SiteModal";
import AuthApi from "../../../api/auth";
import {removeToken} from "../../../util/helper";
import useAuth from "../../../hooks/useAuth";

const DeleteProfile = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { setAuth} = useAuth()


  const EditResumeHandler = async () => {
    setLoading(true);
    await AuthApi.deleteProfileRequest();
    removeToken();
    setAuth(null);
    window.location.href = '/';
    setLoading(false);
  }


  return (
    <Container>
      <SiteModal title={"Delete Profile"} show={show} onCloseModal={() => setShow(!show)}>
        <React.Fragment>
          <p>Are you sure</p>
          <div className={'d-flex align-items-center justify-content-center'}>
            <Button type="button" onClick={() => setShow(!show)}>
              Go Back
            </Button>
            <Button type="button" onClick={EditResumeHandler}>
              {loading ? <Spinner animation="border" size="sm" /> : "Delete"}
            </Button>
          </div>
        </React.Fragment>
      </SiteModal>
      <h3>Delete Profile</h3>
      <Row>
        <Col md={12}>
          <p>Do you really want to delete your profile</p>
        </Col>
        <Col md={12} className={"d-flex justify-content-end mt-4"}>
          <Button type="button" onClick={() => setShow(!show)}>
            {loading ? <Spinner animation="border" size="sm" /> : "Delete"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default DeleteProfile;
