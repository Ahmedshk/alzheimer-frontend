import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../../Components/Button/Button";
import SearchLocation from "./SearchLocation/SearchLocation";
import Quote from "../../../Components/Quote/Quote";
import Testimonials from "./Testimonials/Testimonials";
import './Home.scss';
import {useNavigate} from "react-router-dom";
import {getHomeSections} from "../../../api/CMS";
import Skeleton from 'react-loading-skeleton'
import useAuth from "../../../hooks/useAuth";
import {USER_ROLE} from "../../../interfaces";

const Home = () => {
    const navigate = useNavigate();
    const { auth} = useAuth()
    const [getHomeData, setGetHomeData] = useState<any>(null)

    useEffect(() => {
        getHomeSections()
            .then((res) => {
                setGetHomeData(res.data.home[0])
            })
    }, [])

    return (
        <React.Fragment>
            {
                getHomeData ? (
                    <React.Fragment>
                        <Container>
                            <Row className='align-items-center my-5'>
                                <Col md={7} className={'d-flex justify-content-center align-items-center flex-column'}>
                                    <div className={'get_touch'}>
                                        <h1>{getHomeData.section_1.heading} </h1>
                                        <p>{getHomeData.section_1.text}</p>
                                        {!auth ? (
                                            <div className={'lawyer_join'}>
                                                <Button type="button" onClick={() => navigate('/lawyer/register')}>
                                                    Join now to offer your legal services
                                                </Button>
                                            </div>
                                        ) : null}
                                    </div>
                                    <SearchLocation />
                                </Col>
                                <Col md={5} className={'home_img'}>
                                    <img src={getHomeData.section_1.image.url} alt="Home" />
                                </Col>
                            </Row>
                        </Container>
                        <Container fluid>
                            <Row>
                                <Col md={6} className={'homeSection2_img'}>
                                    <img src={getHomeData.section_2.image.url} alt={'home'} />
                                </Col>
                                <Col md={6} className={'homeSection2_text'}>
                                    <div>
                                        <h5>{getHomeData.section_2.heading}</h5>
                                        <h4>{getHomeData.section_2.subHeading}</h4>
                                        <p>{getHomeData.section_2.text}</p>
                                        <hr />
                                        <h5>{getHomeData.section_2.heading_2}</h5>
                                        <p>{getHomeData.section_2.text_2}</p>
                                        <Button type={'button'} onClick={() => navigate('/about')}>
                                            Read More
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container className='legal_container mb-4'>
                            <Row>
                                <Col md={5} className={'legal_professional_desc d-flex align-items-center'}>
                                    <div>
                                        <h1 style={{
                                            fontWeight: '700'
                                        }}>{getHomeData.section_3.heading}</h1>
                                        <h4>{getHomeData.section_3.subHeading}</h4>
                                        <p>{getHomeData.section_3.text}</p>
                                        <Button type="button" onClick={() => navigate('/lawyer/register')}>
                                            Find Out More
                                        </Button>
                                    </div>
                                </Col>

                                <Col md={7} className='legal_professional'>
                                    <div>
                                        <img src={getHomeData.section_3.image.url} alt='legal' />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Quote />
                        <Testimonials />
                    </React.Fragment>
                ) : <Container style={{ maxWidth: "1500px" }} ><Skeleton height={'100vh'} /></Container>
            }
        </React.Fragment>
    );
};
export default Home;
