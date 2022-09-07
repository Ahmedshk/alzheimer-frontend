import React from 'react';
import SiteModal from "../../../../../Components/SiteModal/SiteModal";
import Button from "../../../../../Components/Button/Button";
import {useNavigate} from "react-router-dom";

const RegisterPopUp:React.FC<any> = ({show, setShow}) => {
    const navigation = useNavigate()
    return (
        <SiteModal title={'Register'} show={show} onCloseModal={() => setShow(!show)}>
            <div className={'registration_modal'}>
            <p>Your ALZ Nexus Registration is under review and you will receive a confirmation email shortly.</p>
                <h5>Thank you!</h5>
            <Button type={'button'} onClick={() =>  navigation("/", {
                replace: true,
            })}>
                Close
            </Button>
            </div>
        </SiteModal>
    );
};

export default RegisterPopUp;
