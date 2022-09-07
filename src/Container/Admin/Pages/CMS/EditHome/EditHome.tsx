import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./EditHome.scss";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import { getHomeSections } from "../../../../../api/CMS";
import {
  IHomeSection1,
  IHomeSection2,
  IHomeSection3,
} from "../../../../../interfaces";

const EditHome = () => {
  const [activeTab, setActiveTab] = useState("SECTION1");
  const [getHomeSection1, setGetHomeSection1] = useState<IHomeSection1>();
  const [getHomeSection2, setGetHomeSection2] = useState<IHomeSection2>();
  const [getHomeSection3, setGetHomeSection3] = useState<IHomeSection3>();
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    getHomeSections().then((res) => {
      setGetHomeSection1(res.data?.home[0].section_1);
      setGetHomeSection2(res.data?.home[0].section_2);
      setGetHomeSection3(res.data?.home[0].section_3);
    });
  }, [isFetching]);

  let showSection = null;
  if (activeTab === "SECTION1") {
    showSection = <Section1 setIsFetching={setIsFetching}  section1={getHomeSection1} />;
  } else if (activeTab === "SECTION2") {
    showSection = <Section2 setIsFetching={setIsFetching} section2={getHomeSection2} />;
  } else if (activeTab === "SECTION3") {
    showSection = <Section3 setIsFetching={setIsFetching} section3={getHomeSection3} />;
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
export default EditHome;
