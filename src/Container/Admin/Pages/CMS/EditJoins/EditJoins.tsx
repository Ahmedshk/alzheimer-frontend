import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { getJoinSections } from "../../../../../api/CMS";
import {
  IJoinsSection1,
  IJoinsSection2,
  IJoinsSection3,
} from "../../../../../interfaces";
import "../EditHome/EditHome.scss";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";

const EditJoins = () => {
  const [activeTab, setActiveTab] = useState("SECTION1");
  const [isLoading, setIsLoading] = useState(false);
  const [getJoinSection1, setGetJoinSection1] = useState<IJoinsSection1>();
  const [getJoinSection2, setGetJoinSection2] = useState<IJoinsSection2>();
  const [getJoinSection3, setGetJoinSection3] = useState<IJoinsSection3>();
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    getJoinSections().then((res) => {
      setGetJoinSection1(res?.data?.join[0].section_1);
      setGetJoinSection2(res?.data?.join[0].section_2);
      setGetJoinSection3(res?.data?.join[0].section_3);
    });
  }, [isFetching]);

  let showSection = null;
  if (activeTab === "SECTION1") {
    showSection = <Section1 setIsFetching={setIsFetching} section1={getJoinSection1} />;
  } else if (activeTab === "SECTION2") {
    showSection = <Section2 setIsFetching={setIsFetching} section2={getJoinSection2} />;
  } else if (activeTab === "SECTION3") {
    showSection = <Section3 setIsFetching={setIsFetching} section3={getJoinSection3} />;
  }

  return (
    <Container fluid style={{ marginTop: "10%" }}>
      <Row>
        <Col md={2}>
          <div className={"tabs_btn"}>
            <Button
              className={activeTab === "SECTION1" ? "active" : ""}
              onClick={() => setActiveTab("SECTION1")}
            >
              
              Section 1
            </Button>
            <Button
              className={activeTab === "SECTION2" ? "active" : ""}
              onClick={() => setActiveTab("SECTION2")}
            >
              
              Section 2
            </Button>
            <Button
              className={activeTab === "SECTION3" ? "active" : ""}
              onClick={() => setActiveTab("SECTION3")}
            >
              
              Section 3
            </Button>
          </div>
        </Col>
        <Col md={10}>
          <div className={"tabs_description"}>{showSection}</div>
        </Col>
      </Row>
    </Container>
  );
};
export default EditJoins;
