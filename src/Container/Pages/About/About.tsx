import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import './About.scss';
import VectorImg1 from "../../../Assets/about_vector1.png";
import VectorImg2 from "../../../Assets/about_vector2.png";
import VectorImg3 from "../../../Assets/about_vector3.png";
import Quote from "../../../Components/Quote/Quote";
import { getAboutSections } from "../../../api/CMS";
import Skeleton from 'react-loading-skeleton'

const About = () => {

    const [getAboutData, setGetAboutData] = useState<any>(null)

    useEffect(() => {
        getAboutSections()
            .then((res) => {
                setGetAboutData(res.data.about[0])
            })
    }, [])

    return (
        <React.Fragment>
            {
                getAboutData ? (
                    <React.Fragment>
                        <Container fluid>
                            <Row className={'h-100'}>
                                <Col md={5} className={'about_section1'}>
                                    <div>
                                        <h1>ABOUT US</h1>
                                    </div>
                                </Col>
                                <Col md={7} className={'about_section1_img'}>
                                    <img src={getAboutData.section_1.image.url} alt={'home'} />
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'about_section2'}>
                            <Row>
                                <Col md={5} className={'text-center'}>
                                    <img src={getAboutData.section_2.image.url} alt={'about_section2'} />
                                </Col>
                                <Col md={6} className={'aboutSection2_desc'}>
                                    <h6>{getAboutData.section_2.heading}</h6>
                                    <ul>
                                        <li>{getAboutData.section_2.point_1}</li>
                                        <li>{getAboutData.section_2.point_2}</li>
                                        <li>{getAboutData.section_2.point_3}</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'about_section3'}>
                            <h4>{getAboutData.section_3.heading}</h4>
                            <Row className={'justify-content-center'}>
                                <Col md={2}>
                                    <div className={'about_boxSection'}>
                                        <p>{getAboutData.section_3.box_1}</p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className={'about_boxSection'}>
                                        <p>{getAboutData.section_3.box_3}</p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className={'about_boxSection'}>
                                        <p>{getAboutData.section_3.box_4}</p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className={'about_boxSection'}>
                                        <p>{getAboutData.section_3.box_5}</p>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className={'about_boxSection'}>
                                        <p>{getAboutData.section_3.box_6}</p>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                        </Container>
                        <Container className={'about_section4'}>
                            <h4>{getAboutData.section_4.heading}</h4>
                            <Row>
                                <Col md={4}>
                                    <div className="alz_nexus_section">
                                        <h5>{getAboutData.section_4.box_1.subHeading}</h5>
                                        <p>{getAboutData.section_4.box_1.text}:</p>
                                        <ul>
                                            <li>{getAboutData.section_4.box_1.point_1}</li>
                                            <li>{getAboutData.section_4.box_1.point_2}</li>
                                            <li>{getAboutData.section_4.box_1.point_3}</li>
                                            <li>{getAboutData.section_4.box_1.point_4}</li>
                                        </ul>
                                        <div className={'text-center'}>
                                            <img src={VectorImg1} alt="vector" />
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="alz_nexus_section">
                                        <h5>{getAboutData.section_4.box_2.subHeading}</h5>
                                        <p>{getAboutData.section_4.box_2.text}</p>
                                        <ul>
                                            <li>{getAboutData.section_4.box_2.point_1}</li>
                                            <li>{getAboutData.section_4.box_2.point_2}</li>
                                            <li>{getAboutData.section_4.box_2.point_3}</li>
                                            <li>{getAboutData.section_4.box_2.point_4}</li>
                                        </ul>
                                        <div className={'alz_nexus_img1'}>
                                            <img src={VectorImg2} alt="vector" />
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="alz_nexus_section">
                                        <h5>{getAboutData.section_4.box_3.subHeading}</h5>
                                        <p>{getAboutData.section_4.box_3.text}</p>
                                        <ul>
                                            <li>{getAboutData.section_4.box_3.point_1}</li>
                                            <li>{getAboutData.section_4.box_3.point_2}</li>
                                            <li>{getAboutData.section_4.box_3.point_3}</li>
                                            <li>{getAboutData.section_4.box_3.point_4}</li>
                                        </ul>
                                        <div className={'alz_nexus_img2'}>
                                            <img src={VectorImg3} alt="vector" />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'about_mission_section'}>
                            <Row>
                                <Col md={6} className={'mission_desc'}>
                                    <div>
                                        <h3>{getAboutData.section_5.heading}</h3>
                                        <ul>
                                            <li>{getAboutData.section_5.point_1}</li>
                                            <li>{getAboutData.section_5.point_2}</li>
                                            <li>{getAboutData.section_5.point_3}</li>
                                        </ul>
                                    </div>

                                </Col>
                                <Col md={6}>
                                    <img src={getAboutData.section_5.image.url} alt={'about'} />
                                </Col>
                            </Row>
                        </Container>
                        <Quote />
                    </React.Fragment>
                ) : <Container style={{ maxWidth: "1500px" }} ><Skeleton height={'100vh'} /></Container>
            }
        </React.Fragment>
    );
};
export default About;
