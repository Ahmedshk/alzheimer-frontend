import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { useForm } from "react-hook-form";
import { IHomeSection3 } from "../../../../../../interfaces";
import { cmsValidation } from "../../../../../../lib/validation";
import { errorNotify, successNotify } from "../../../../../../util/toast";
import Loader from '../../../../../../util/loader'
import { putHomeImageSection, putHomeSection } from "../../../../../../api/CMS";

const Section3: React.FC<any> = ({ section3, setIsFetching }) => {
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IHomeSection3>();

  useEffect(() => {
    setValue("heading", section3?.heading);
    setValue("subHeading", section3?.subHeading);
    setValue("text", section3?.text);
    setPreview(section3?.image?.url);
  }, [section3]);

  const onSubmitHandler = handleSubmit(async (data) => {
    setLoading(true)
    const homeData = {
      section_3: {
        heading: data.heading,
        subHeading: data.subHeading,
        text: data.text,
      },
    };

    if (Object.keys(data.image).length > 0) {
      setIsFetching(true)
      const formData = new FormData();

      const obj: any = homeData.section_3;
      //@ts-ignore
      formData.append("section_3_image", data.image[Object.keys(data.image)[0]])
      for (const key in obj) {
        formData.append(key, obj[key])
      }

      putHomeImageSection(formData)
        .then(() => {
          setLoading(false)
          successNotify("Form Submitted Successfully");
          setIsFetching(false)
        })
        .catch((err) => {
          errorNotify(err.message)
          setLoading(false)
        })
    }
    else {
      const homeData = {
        section: "section_3",
        section_3: {
          heading: data.heading,
          subHeading: data.subHeading,
          text: data.text,
        },
      };
      putHomeSection(homeData)
        .then(() => {
          setLoading(false)
          successNotify("Form Submitted Successfully");
          setIsFetching(false)
        })
        .catch((err) => {
          errorNotify(err.message)
          setLoading(false)
        })
    }
  });

  return (
    <React.Fragment>
      {!loading ? (<Form onSubmit={onSubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Label>Heading</Form.Label>
            <Form.Control
              type="text"
              {...register("heading", cmsValidation.heading)}
            />
            <small className="text-danger">

              {errors.heading && errors.heading.message}
            </small>
            <br />

            <Form.Label>Sub Heading</Form.Label>
            <Form.Control
              type="text"
              {...register("subHeading", cmsValidation.subHeading)}
            />
            <small className="text-danger">

              {errors.subHeading && errors.subHeading.message}
            </small>
            <br />

            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              {...register("text", cmsValidation.text)}
            />
            <small className="text-danger">

              {errors.text && errors.text.message}
            </small>
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
                id="file-input"
                accept="image/png, image/jpeg"
                {...register("image")}
                onChange={(e) => {
                  setPreview(URL.createObjectURL(e.target.files![0]));
                }}
                className="file_input"
              />
              <label className="file_label" htmlFor="file-input">
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
      </Form>) : <Loader />

      }
    </React.Fragment>
  );
};

export default Section3;
