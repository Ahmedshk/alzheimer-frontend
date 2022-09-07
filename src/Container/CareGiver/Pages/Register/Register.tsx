import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import CareGiverRegister1 from "../../../../Assets/lawyer-register1.jpg";
import CareGiverRegister2 from "../../../../Assets/about_section3.jpg";
import Register from "../../../Auth/Register/Register";
import Quote from "../../../../Components/Quote/Quote";
import '../../../Lawyer/Pages/Register/Register.scss';
import { useLocation } from "react-router-dom";
import Login from "../../../Auth/Login/Login";
import { USER_ROLE } from "../../../../interfaces";

import { getJoinSections } from "../../../../api/CMS";
import Skeleton from 'react-loading-skeleton'

const CareGiverRegister = () => {
    const location = useLocation();

    const [getCaregiverData, setGetCaregiverData] = useState<any>(null)

    useEffect(() => {
        getJoinSections()
            .then((res) => {
                setGetCaregiverData(res.data.join[0])
            })
    }, [])

    let showForm;
    if (location.pathname === '/caregiver/register') {
        showForm = <Register role={USER_ROLE.CAREGIVER} heading="careGiver" />
    }
    else if (location.pathname === '/caregiver/login') {
        showForm = <Login role={USER_ROLE.CAREGIVER} />
    }
    return (
        <React.Fragment>
            {
                getCaregiverData ? (
                    <>
                        <Container fluid>
                            <Row>
                                <Col md={5} className={'register_section1'}>
                                    <div>
                                        <h1>Caregivers</h1>
                                        <h5>of Alzheimer Disease</h5>
                                    </div>
                                </Col>
                                <Col md={7} className={'LawyerRegister1_img'}>
                                    <img src={getCaregiverData.section_1.image.url} alt={'home'} />
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'lawyer_section2'}>
                            <Row>
                                <Col md={5}>
                                    <img src={getCaregiverData.section_2.image.url} alt={'LawyerRegister2'} />
                                </Col>
                                <Col md={6}>
                                    <div className={'section2_desc'}>
                                        <h6>{getCaregiverData.section_2.heading}</h6>
                                        <p>{getCaregiverData.section_2.text}</p>
                                        <h6>{getCaregiverData.section_2.heading_2}</h6>
                                        <ul>
                                            <li>{getCaregiverData.section_2.point_1}</li>
                                            <li>{getCaregiverData.section_2.point_2}</li>
                                            <li>{getCaregiverData.section_2.point_3}</li>
                                            {/*<li>{getCaregiverData.section_2.point_4}</li>*/}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'caregiver_legal_professional'}>
                            <h5>{getCaregiverData.section_3.heading}</h5>
                            <ul>
                                <li>{getCaregiverData.section_3.point_1}</li>
                                <li>{getCaregiverData.section_3.point_2}</li>
                                <li>{getCaregiverData.section_3.point_3}</li>
                            </ul>
                        </Container>
                        {showForm}
                        <Quote />
                    </>
                ) : <Container style={{ maxWidth: "1500px" }} ><Skeleton height={'100vh'} /></Container>
            }
        </React.Fragment>
    );
};
export default CareGiverRegister;
