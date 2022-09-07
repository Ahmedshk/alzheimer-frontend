import React, {useEffect, useState} from 'react';
import {IPrivacyPolicy} from "../../../../../interfaces";
import {useForm} from "react-hook-form";
import {
    getTermAndConditionsSections, putTermAndConditionsImageSections, putTermAndConditionsSections
} from "../../../../../api/CMS";
import {errorNotify, successNotify} from "../../../../../util/toast";
import Loader from "../../../../../util/loader";
import {Col, Form, Row} from "react-bootstrap";
import ReactQuill from "react-quill";
import {formats, modules} from "../../../../../lib/helper";
import DummyImg from "../../../../../Assets/preview_dummy.png";
import {cmsValidation} from "../../../../../lib/validation";
import {AiOutlineCamera} from "react-icons/ai";
import SaveBtn from "../../../../../Components/Button/Button";

const EditTermAndCondition = () => {
    const [quillData, setQuillData] = useState<any>("");
    const [preview, setPreview] = useState<any>(null);
    const [loading, setLoading] = useState(false)
    const [getPrivacyPolicy, setPrivacyPoilcy] = useState<IPrivacyPolicy>();

    const [isFetching, setIsFetching] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IPrivacyPolicy>();

    useEffect(() => {
        getTermAndConditionsSections().then((res) => {
            setPrivacyPoilcy(res?.data?.termAndCondition[0]);
            setQuillData(res?.data?.termAndCondition[0]?.text);
            setPreview(res?.data?.termAndCondition[0]?.image.url)
        });
    }, [setValue, isFetching]);

    const onSubmitHandler = handleSubmit(async (data) => {
        if (Object.keys(quillData).length === 0) {
            errorNotify("please fill the text editor");
        } else {
            setLoading(true)
            const privacyData = {
                privacyPolicy: {
                    text: quillData,
                }
            };

            if (Object.keys(data.image).length > 0) {
                setIsFetching(true)
                const formData = new FormData();

                const obj: any = privacyData.privacyPolicy;
                //@ts-ignore
                formData.append("section_1_image", data.image[Object.keys(data.image)[0]])
                for (const key in obj) {
                    formData.append(key, obj[key])
                }

                putTermAndConditionsImageSections(formData)
                    .then(() => {
                        successNotify("Form Submitted Successfully");
                        setLoading(false)
                        setIsFetching(false)
                    })
                    .catch((err) => {
                        errorNotify(err.message)
                        setLoading(false)
                    })
            }
            else {
                const privacyData = {
                    text: quillData
                };
                putTermAndConditionsSections(privacyData)
                    .then(() => {
                        successNotify("Form Submitted Successfully");
                        setLoading(false)
                        setIsFetching(false)
                    })
                    .catch((err) => {
                        errorNotify(err.message)
                        setLoading(false)
                    })
            }
        }
    });

    return (
        <div className="editor_container tabs_description">
            {loading ? <Loader /> :
                <Form onSubmit={onSubmitHandler}>
                    <Row>
                        <Col md={6}>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={quillData}
                                onChange={setQuillData}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Image</Form.Label>
                            <div>
                                <img
                                    src={preview ? preview : DummyImg}
                                    alt={"preview"}
                                    className={"preview_img"}
                                />
                            </div>
                            <div className={"input_file"}>
                                <input
                                    type="file"
                                    id="file-input10"
                                    accept="image/png, image/jpeg"
                                    {...register("image")}
                                    onChange={(e) => {
                                        setPreview(URL.createObjectURL(e.target.files![0]));
                                    }}
                                    className="file_input"
                                />
                                <small className="text-danger text-center">
                                    {errors.image && errors.image.message}
                                </small>
                                <label className="file_label" htmlFor="file-input10">
                                    <AiOutlineCamera />
                                    <span>Upload Image</span>
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <div className={"text-end my-4"}>
                        <SaveBtn type={"submit"}>SAVE CHANGES</SaveBtn>
                    </div>
                </Form>
            }
        </div>
    );
};

export default EditTermAndCondition;
