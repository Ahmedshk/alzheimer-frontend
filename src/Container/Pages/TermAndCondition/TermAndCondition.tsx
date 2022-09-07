import React, {useEffect, useState} from 'react';
import {getTermAndConditionsSections} from "../../../api/CMS";
import {Col, Container, Row} from "react-bootstrap";
import Quote from "../../../Components/Quote/Quote";
import Skeleton from "react-loading-skeleton";

const TermAndCondition = () => {
    const [getPrivacyData, setGetPrivacyData] = useState<any>(null)

    useEffect(() => {
        getTermAndConditionsSections()
            .then((res) => {
                setGetPrivacyData(res.data.termAndCondition[0])
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
                                        <h1>Terms & Condition</h1>
                                    </div>
                                </Col>
                                <Col md={7} className={'about_section1_img'}>
                                    <img src={getPrivacyData.image.url} alt={'privacy'}/>
                                </Col>
                            </Row>
                        </Container>
                        <Container className={'privacy_policy'} dangerouslySetInnerHTML={{__html: getPrivacyData.text}}>
                        </Container>
                        <Quote/>
                    </React.Fragment>
                ) : <Container style={{maxWidth: "1500px"}}><Skeleton height={'100vh'}/></Container>
            }
        </React.Fragment>
    );
};

export default TermAndCondition;
