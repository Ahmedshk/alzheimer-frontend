import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import EditHome from "./EditHome/EditHome";
import EditAbout from "./EditAbout/EditAbout";
import EditJoins from "./EditJoins/EditJoins";
import EditLawyerJoin from "./EditLawyerJoin/EditLawyerJoin";
import EditPrivacy from "./EditPrivacy/EditPrivacy";
import EditFooter from "./EditFooter/EditFooter";
import './CMS.scss';
import EditTermAndCondition from "./EditTermAndCondition/EditTermAndCondition";

export enum PAGE {
  home = "HOME",
  about = "ABOUT",
  caregiverjoin = "CAREGIVER-JOIN",
  lawyerJoin = "LAWYER-JOIN",
  privacy = "PRIVACY",
  footer = "FOOTER",
  terms = "TERMS"
}

const CMS = () => {
  const [key, setKey] = useState<string>(PAGE.home);
  return (
    <div className="page_responsive">
      <h1>CMS</h1>

      <Tabs
        activeKey={key}
        onSelect={(k) => {
          setKey(k!);
        }}
        className="mb-3 tabs"
      >
        <Tab eventKey={PAGE.home} title={PAGE.home} className={"w-100"}>
          <EditHome />
        </Tab>

        <Tab eventKey={PAGE.about} title={PAGE.about} className={"w-100"}>
          <EditAbout />
        </Tab>

        <Tab eventKey={PAGE.caregiverjoin} title={PAGE.caregiverjoin} className={"w-100"}>
          <EditJoins />
        </Tab>

        <Tab eventKey={PAGE.lawyerJoin} title={PAGE.lawyerJoin} className={"w-100"}>
          <EditLawyerJoin />
        </Tab>

        <Tab eventKey={PAGE.privacy} title={PAGE.privacy} className={"w-100"}>
          <EditPrivacy />
        </Tab>

        <Tab eventKey={PAGE.footer} title={PAGE.footer} className={"w-100"}>
          <EditFooter />
        </Tab>

        <Tab eventKey={PAGE.terms} title={PAGE.terms} className={"w-100"}>
          <EditTermAndCondition />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CMS;
