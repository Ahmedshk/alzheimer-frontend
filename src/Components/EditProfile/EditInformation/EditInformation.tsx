import React, {useEffect, useState} from "react";
import {Col, Container, Form, Row, Spinner} from "react-bootstrap";
import Input from "../../Input/Input";
import {authValidation} from "../../../lib/validation";
import Button from "../../Button/Button";
import {useForm} from "react-hook-form";
import Loader from "../../../util/loader";
import useAuth from "../../../hooks/useAuth";
import {errorNotify, successNotify} from "../../../util/toast";
import AuthApi from "../../../api/auth";
import Select, {MultiValue} from "react-select";
import {ISelect,} from "../../../Container/Auth/Register/Register";
import {USER_ROLE} from "../../../interfaces";
import {BsPlus} from 'react-icons/bs'
import {AiOutlineCloseCircle} from "react-icons/ai";
import SiteModal from "../../SiteModal/SiteModal";
import '../EditProfile.scss'

interface IEditInformation {
    name: string;
    phoneNumber: string;
    bio: string;
    firmName: string;
    firmUrl: string;
}

const EditInformation = () => {


    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<IEditInformation>();
    const [loading, setLoading] = useState(false);
    const {auth, setAuth} = useAuth();
    const [selectedOption, setSelectedOption] = useState<MultiValue<ISelect>>([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [expertiseOption, setExpertiseOption] = useState<ISelect[]>([])
    const [isFetching, setIsFetching] = useState(false)

    const addExpertiseHandler = async () => {
        if (name.length <= 0) {
            errorNotify('Field cannot be empty')
            return;
        }
        setLoading(true)
        try {
            setIsFetching(true)
            const res = await AuthApi.createLawyerExpertiseOption(name.charAt(0).toUpperCase() + name.slice(1))
            setIsFetching(false)
            successNotify(res.data.message)
            setLoading(false)
            setShow(!show)
        } catch (e: any) {
            errorNotify(e.response.data.message)
            setLoading(false)
            setShow(!show)
        }
    }


    const addFields = (
        <SiteModal show={show} onCloseModal={() => setShow(!show)} title={'Add Area Of Expertise'} size={'lg'}>
            <div className='add_expertise_container'>
                <div className='cross' onClick={() => setShow(!show)}>
                    <AiOutlineCloseCircle/>
                </div>
                <Input>
                    <Form.Label>Add Area of Expertise</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text"
                                  placeholder='Enter Your Name'
                    />
                </Input>

                <div className='mt-3'>
                    <Button type="button" onClick={addExpertiseHandler}>
                        {loading ? <Spinner animation="border" size="sm"/> : "Submit"}
                    </Button>
                </div>
            </div>
        </SiteModal>
    )


    useEffect(() => {
        if (auth) {
            AuthApi.getLawyerExpertiseOption()
                .then((res) => {
                    const options = [

                        {
                            label: "Medicaid",
                            value: "Medicaid",
                        },
                        {
                            label: "Estate Planning",
                            value: "Estate Planning",
                        },
                        {
                            label: "Durable Power of Attorney",
                            value: "Durable Power of Attorney",
                        },
                        {
                            label: "Trust",
                            value: "Trust",
                        },
                        {
                            label: "Guardianship",
                            value: "Guardianship",
                        },
                        ...res.data
                    ]
                    setExpertiseOption(options)
                    setValue("name", auth?.name);
                    setValue("bio", auth?.bio);
                    setValue("phoneNumber", auth?.phoneNumber);
                    setValue("firmUrl", auth?.firmUrl);
                    setValue("firmName", auth?.firmName);
                    setSelectedOption(
                        options.filter((option: ISelect) =>
                            auth.expertise.includes(option.value)
                        )
                    );
                })
        }
    }, [auth, isFetching]);

    const informationHandler = handleSubmit(async (data) => {
        setLoading(true);
        const formData = {
            ...data,
            expertise: selectedOption.map((option) => option.value),
        };
        const res = await AuthApi.updateProfile(formData);
        setAuth({
            ...auth,
            ...formData,
        });
        successNotify(res.data.message);
        setLoading(false);
    });

    return (
        <Container>
            {addFields}
            <div className='d-flex justify-content-between px-2'>
                <div>
                    <h3>Edit Information</h3>
                </div>
                {
                    auth?.role === USER_ROLE.LAWYER ? (
                        <div className='round'>
                                <span>{
                                    auth.isVerified ? 'Verified' : 'Not Verified'
                                }</span>
                        </div>
                    ) : null
                }
            </div>
            {auth ? (
                <Form onSubmit={informationHandler}>
                    <Row>
                        <Col md={6}>
                            <Input>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Option "
                                    {...register("name", authValidation.name)}
                                />
                                {errors.name ? (
                                    <small className={"text-danger"}>
                                        {errors.name?.message}
                                    </small>
                                ) : null}
                            </Input>
                        </Col>
                        <Col md={6}>
                            <Input>
                                <Form.Label>phone number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Your Phone Number"
                                    {...register("phoneNumber", authValidation.phone)}
                                />
                                {errors.phoneNumber ? (
                                    <small className={"text-danger"}>
                                        {errors.phoneNumber?.message}
                                    </small>
                                ) : null}
                            </Input>
                        </Col>
                        <Col md={12}>
                            <Input>
                                <Form.Label>Short Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Enter Your short bio"
                                    {...register("bio")}
                                />
                            </Input>
                        </Col>
                        {
                            auth && auth.role === USER_ROLE.LAWYER ? (
                                <>
                                    <Col md={6}>
                                        <Input>
                                            <Form.Label>Attorney Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Attorney Name"
                                                {...register("firmName", authValidation.firmName)}
                                            />
                                            {errors.name ? (
                                                <small className={"text-danger"}>
                                                    {errors.firmName?.message}
                                                </small>
                                            ) : null}
                                        </Input>
                                    </Col>
                                    <Col md={6}>
                                        <Input>
                                            <Form.Label>Attorney Url</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Attorney Url"
                                                {...register("firmUrl", authValidation.firmUrl)}
                                            />
                                            {errors.firmUrl ? (
                                                <small className={"text-danger"}>
                                                    {errors.firmUrl?.message}
                                                </small>
                                            ) : null}
                                        </Input>
                                    </Col>

                                    <Col md={11}>
                                        <Input>
                                            <Form.Label>Area of expertise</Form.Label>
                                            <Select
                                                isMulti
                                                value={selectedOption}
                                                options={expertiseOption}
                                                onChange={(e) =>  setSelectedOption(e!)}
                                            />
                                        </Input>
                                    </Col>
                                    <Col md={1}>
                                        <div className='add_container'>
                                            <button type={'button'} onClick={() => setShow(true)}><BsPlus/></button>
                                        </div>
                                    </Col>
                                </>
                            ) : null
                        }
                        <Col md={12} className={"d-flex justify-content-end mt-4"}>
                            <Button type="submit">
                                {loading ? <Spinner animation="border" size="sm"/> : "Submit"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <Loader/>
            )}
        </Container>
    );
};

export default EditInformation;
