import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { useForm } from "react-hook-form";
import { IAboutSection1 } from "../../../../../../interfaces";
import { cmsValidation } from "../../../../../../lib/validation";
import { errorNotify, successNotify } from "../../../../../../util/toast";
import Loader from '../../../../../../util/loader'

import {putAboutImageSection, putAboutSection} from "../../../../../../api/CMS";

const Section1: React.FC<any> = ({ section1, setIsFetching }) => {
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAboutSection1>();

  useEffect(() => {
    setValue("text", section1?.text);
    setPreview(section1?.image?.url);
  }, [section1]);

  const onSubmitHandler = handleSubmit(async (data) => {
    setLoading(true)
    const aboutData = {
      section_1: {
        text: data.text,
      },
    };

    if (Object.keys(data.image).length > 0) {
      setIsFetching(true)
      const formData = new FormData();

      const obj: any = aboutData.section_1;
      //@ts-ignore
      formData.append("section_1_image", data.image[Object.keys(data.image)[0]])
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
        section: "section_1",
        section_1: {
          text: data.text,
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
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                {...register("text", cmsValidation.text)}
              />
              <small className="text-danger text-center">
                {" "}
                {errors.text && errors.text.message}{" "}
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
                  id="file-input1"
                  accept="image/png, image/jpeg"
                  {...register("image")}
                  onChange={(e) => {
                    setPreview(URL.createObjectURL(e.target.files![0]));
                  }}
                  className="file_input"
                />
                <label className="file_label" htmlFor="file-input1">
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

export default Section1;
