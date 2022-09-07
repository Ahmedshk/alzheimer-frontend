import React, { useEffect, useState } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import { useForm } from "react-hook-form";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { IFooterSection1 } from '../../../../../../interfaces';
import { cmsValidation } from '../../../../../../lib/validation';
import Loader from '../../../../../../util/loader';

import { putFooterImageSection, putFooterSection } from "../../../../../../api/CMS";
import { errorNotify, successNotify } from '../../../../../../util/toast';


const Section1: React.FC<any> = ({ section1, setIsFetching }) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFooterSection1>();

    const [preview, setPreview] = useState<any>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setValue("heading", section1?.heading);
        setPreview(section1?.image?.url);
    }, [section1]);

    const onSubmitHandler = handleSubmit(async (data) => {
        setLoading(true)
        const footerData = {
            section_1: {
                heading: data.heading,
            },
        };

        if (Object.keys(data.image).length > 0) {
            setIsFetching(true)
            const formData = new FormData();

            const obj: any = footerData.section_1;
            //@ts-ignore
            formData.append("section_1_image", data.image[Object.keys(data.image)[0]])
            for (const key in obj) {
                formData.append(key, obj[key])
            }

            putFooterImageSection(formData)
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
            const footerData = {
                section: "section_1",
                section_1: {
                    heading: data.heading,
                },
            };
            putFooterSection(footerData)
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
    })

    return (
        <React.Fragment>
            {loading ? <Loader /> :
                <Form onSubmit={onSubmitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Label>Heading</Form.Label>
                            <Form.Control type="text" {...register('heading', cmsValidation.heading)} />
                            <small className="text-danger"> {errors.heading && errors.heading.message} </small>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Image</Form.Label>
                            <div>
                                <img src={preview ? preview : DummyImg} alt={'preview'} className={'preview_img'} />
                            </div>
                            <div className={'input_file'}>
                                <input
                                    type="file"
                                    id="file-input7"
                                    accept="image/png, image/jpeg"
                                    {...register('image')}
                                    onChange={(e) => {
                                        setPreview(URL.createObjectURL(e.target.files![0]))
                                    }}
                                    className="file_input" />
                                <label className="file_label" htmlFor="file-input7">
                                    <AiOutlineCamera />
                                    <span>Upload Image</span>
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <div className={'text-end my-4'}>
                        <SaveBtn type={'submit'}>
                            SAVE CHANGES
                        </SaveBtn>
                    </div>
                </Form>}
        </React.Fragment>
    )
}

export default Section1
