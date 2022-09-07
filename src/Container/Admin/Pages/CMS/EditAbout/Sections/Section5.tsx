import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { useForm } from "react-hook-form";
import { IAboutSection5 } from "../../../../../../interfaces";
import { cmsValidation } from "../../../../../../lib/validation";
import Loader from '../../../../../../util/loader'
import { errorNotify, successNotify } from "../../../../../../util/toast";

import { putAboutImageSection, putAboutSection } from "../../../../../../api/CMS";

const Section5: React.FC<any> = ({ section5, setIsFetching }) => {
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAboutSection5>();
  useEffect(() => {
    setValue("heading", section5?.heading);
    setValue("point_1", section5?.point_1);
    setValue("point_2", section5?.point_2);
    setValue("point_3", section5?.point_3);
    setPreview(section5?.image?.url);
  }, [section5]);
  const onSubmitHandler = handleSubmit(async (data) => {
    setLoading(true)
    const aboutData = {
      section_5: {
        heading: data.heading,
        point_1: data.point_1,
        point_2: data.point_2,
        point_3: data.point_3,
      },
    };

    if (Object.keys(data.image).length > 0) {
      setIsFetching(true)
      const formData = new FormData();

      const obj: any = aboutData.section_5;
      //@ts-ignore
      formData.append("section_5_image", data.image[Object.keys(data.image)[0]])
      for (const key in obj) {
        formData.append(key, obj[key])
      }

      putAboutImageSection(formData)
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
      const aboutData = {
        section: "section_5",
        section_5: {
          heading: data.heading,
          point_1: data.point_1,
          point_2: data.point_2,
          point_3: data.point_3,
        },
      };
      putAboutSection(aboutData)
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
  });
  return (
    <React.Fragment>
      {loading ? <Loader /> :
        <Form onSubmit={onSubmitHandler}>
          <Row>
            <Col md={6}>
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                {...register("heading", cmsValidation.heading)}
              />
              <small className="text-danger text-center">
                {" "}
                {errors.heading && errors.heading.message}{" "}
              </small>
              <br />

              <Form.Label>Point-1</Form.Label>
              <Form.Control
                type="text"
                {...register("point_1", cmsValidation.point_1)}
              />
              <small className="text-danger text-center">
                {" "}
                {errors.point_1 && errors.point_1.message}{" "}
              </small>
              <br />

              <Form.Label>Point-2</Form.Label>
              <Form.Control
                type="text"
                {...register("point_2", cmsValidation.point_2)}
              />
              <small className="text-danger text-center">
                {" "}
                {errors.point_2 && errors.point_2.message}{" "}
              </small>
              <br />

              <Form.Label>Point-3</Form.Label>
              <Form.Control
                type="text"
                {...register("point_3", cmsValidation.point_3)}
              />
              <small className="text-danger text-center">
                {" "}
                {errors.point_3 && errors.point_3.message}{" "}
              </small>
              <br />
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
                  id="file-input2"
                  accept="image/png, image/jpeg"
                  {...register("image", cmsValidation.image)}
                  onChange={(e) => {
                    setPreview(URL.createObjectURL(e.target.files![0]));
                  }}
                  className="file_input"
                />
                <small className="text-danger text-center">
                  {" "}
                  {errors.image && errors.image.message}{" "}
                </small>
                <label className="file_label" htmlFor="file-input2">
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
    </React.Fragment>
  );
};

export default Section5;
