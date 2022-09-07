import React, { useEffect, useState } from 'react';
import './PrivacyPolicy.scss';
import { Col, Container, Row } from "react-bootstrap";
import Quote from "../../../Components/Quote/Quote";
import { getPrivacyPolicySections } from "../../../api/CMS";
import Skeleton from 'react-loading-skeleton'

const PrivacyPolicy = () => {

    const [getPrivacyData, setGetPrivacyData] = useState<any>(null)

    useEffect(() => {
        getPrivacyPolicySections()
            .then((res) => {
                setGetPrivacyData(res.data.privacyPolicy[0])
            })
    }, [])

    return (
        <React.Fragment>
            {
                getPrivacyData ? (
                    <React.Fragment>
                        <Container fluid>
                            <Row className={'h-100'}>
                                <Col md={5} className={'about_section1'}>
                                    <div>
                                        <h1>Privacy & Policy</h1>
                                    </div>
                                </Col>
                                <Col md={7} className={'about_section1_img'}>
                                    <img src={getPrivacyData.image.url} alt={'privacy'} />
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'privacy_policy'} dangerouslySetInnerHTML={{ __html: getPrivacyData.text }}>
                        </Container>
                        <Quote />
                    </React.Fragment>
                ) : <Container style={{ maxWidth: "1500px" }} ><Skeleton height={'100vh'} /></Container>
            }
        </React.Fragment>
    );
};

export default PrivacyPolicy;
