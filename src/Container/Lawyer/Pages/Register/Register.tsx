import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import LawyerRegister1 from "../../../../Assets/lawyer-register1.jpg";
import LawyerRegister2 from "../../../../Assets/lawyer-register2.jpg";
import Register from "../../../Auth/Register/Register";
import Quote from "../../../../Components/Quote/Quote";
import './Register.scss';
import Login from "../../../Auth/Login/Login";
import { useLocation } from "react-router-dom";
import { USER_ROLE } from "../../../../interfaces";

import { getLawyerJoinSections } from "../../../../api/CMS";
import Skeleton from 'react-loading-skeleton'

const LawyerRegister = () => {
    const location = useLocation();

    const [getLawyerData, setGetLawyerData] = useState<any>(null)

    useEffect(() => {
        getLawyerJoinSections()
            .then((res) => {
                setGetLawyerData(res.data.join[0])
            })
    }, [])

    let showForm;
    if (location.pathname === '/lawyer/register') {
        showForm = <Register role={USER_ROLE.LAWYER} heading={"Attorney"} />
    }
    else if (location.pathname === '/lawyer/login') {
        showForm = <Login role={USER_ROLE.LAWYER} />
    }
    return (
        <React.Fragment>
            {
                getLawyerData ? (
                    <>
                        <Container fluid>
                            <Row className={'h-100'}>
                                <Col md={5} className={'register_section1'}>
                                    <div>
                                        <h1>Estate Planning
                                            and Elder Law
                                            Attorneys</h1>
                                        <h5>Join ALZ Nexus</h5>
                                    </div>
                                </Col>
                                <Col md={7} className={'LawyerRegister1_img'}>
                                    <img src={getLawyerData.section_1.image.url} alt={'home'} />
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'lawyer_section2'}>
                            <Row>
                                <Col md={5}>
                                    <img src={getLawyerData.section_2.image.url} alt={'LawyerRegister2'} />
                                </Col>
                                <Col md={6}>
                                    <div className={'section2_desc'}>
                                        <h6>{getLawyerData.section_2.heading}</h6>
                                        <p>{getLawyerData.section_2.text}</p>
                                        <h6>{getLawyerData.section_2.heading_2}</h6>
                                        <ul>
                                            <li>{getLawyerData.section_2.point_1}</li>
                                            <li>{getLawyerData.section_2.point_2}</li>
                                            <li>{getLawyerData.section_2.point_3}</li>
                                            <li>{getLawyerData.section_2.point_4}</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        {showForm}
                        <Quote />
                    </>
                ) : <Container style={{ maxWidth: "1500px" }} ><Skeleton height={'100vh'} /></Container>
            }
        </React.Fragment>
    );
};
export default LawyerRegister;
