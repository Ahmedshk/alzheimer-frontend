import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { useForm } from "react-hook-form";
import { IFooterSection2 } from "../../../../../../interfaces";
import { cmsValidation } from "../../../../../../lib/validation";
import Loader from "../../../../../../util/loader";

import { putFooterSection } from "../../../../../../api/CMS";
import { errorNotify, successNotify } from "../../../../../../util/toast";

const Section2: React.FC<any> = ({ section2, setIsFetching }) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFooterSection2>();
  useEffect(() => {
    setValue("text", section2?.text);
    setValue("phone_number", section2?.phone_number);
    setValue("email", section2?.email);
    setValue("location", section2?.location);
  }, [section2]);

  const onSubmitHandler = handleSubmit(async (data) => {
    setLoading(true)
    setIsFetching(true)
    const formData = {
      section: "section_2",
      section_2: {
        text: data.text,
        phone_number: data.phone_number,
        email: data.email,
        location: data.location,
      },
    };

    putFooterSection(formData)
      .then(() => {
        successNotify("Form Submitted Successfully");
        setLoading(false)
        setIsFetching(false)
      })
      .catch((err) => {
        errorNotify(err.message)
        setLoading(false)
      })
  });

  return (
    <React.Fragment>
      {
        loading ? <Loader /> :
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col md={12}>
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  {...register("text", cmsValidation.text)}
                />
                <small className="text-danger">

                  {errors.text && errors.text.message}
                </small>
                <br />

                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phone_number", cmsValidation.phone_number)}
                />
                <small className="text-danger">

                  {errors.phone_number && errors.phone_number.message}
                </small>
                <br />

                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", cmsValidation.email)}
                />
                <small className="text-danger">

                  {errors.email && errors.email.message}
                </small>
                <br />

                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  {...register("location", cmsValidation.location)}
                />
                <small className="text-danger">

                  {errors.location && errors.location.message}
                </small>
                <br />
              </Col>
            </Row>
            <hr />
            <div className={"text-end my-4"}>
              <SaveBtn type={"submit"}>SAVE CHANGES</SaveBtn>
            </div>
          </Form>
      }
    </React.Fragment>
  );
};

export default Section2;
