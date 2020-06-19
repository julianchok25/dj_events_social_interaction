import React, { useState, useCallback } from "react";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import { Camera } from "../../utils/icons";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { CreateEventsApi } from "../../api/events";

import "./CreateEventForm.scss";
export default function CreateEventForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue());
  const [eventLoading, setEventLoading] = useState(false);
  const DataEvent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) =>
          setFormData({ ...formData, date: setStartDate(date) })
        }
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMM d, yyyy h:mm aa"
      />
    );
  };
  const onDropFlyer = useCallback((acceptedFile) => {
    console.log(acceptedFile);
  });

  const {
    getRootProps: getRootFlyerProps,
    getInputProps: getInputFlyerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropFlyer,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 1;

    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.error("Complete all Fields for Create your event");
    } else {
      setEventLoading(true);
      CreateEventsApi(formData)
        .then((response) => {
          toast.success(`${formData.name} Created!`);
          setShowModal(false);
          setFormData(initialValue());
        })
        .catch((err) => {
          toast.error("Error Server later Again");
        });
    }
  };

  return (
    <div className="create-event">
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Event Name"
                name="name"
                defaultValue={formData.name}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Location"
                name="location"
                defaultValue={formData.location}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Event Creator"
                name="contactName"
                defaultValue={formData.contactName}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="tel"
                placeholder="Contact Number"
                name="phone"
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="date-event">{DataEvent()}</Form.Group>
        <Button variant="danger" type="submit">
          {!eventLoading ? "Create" : <Spinner animation="border" />}
        </Button>
      </Form>
      <div className="flyer" {...getRootFlyerProps()}>
        <input {...getInputFlyerProps()} />
        <Camera />
      </div>
    </div>
  );
}

function initialValue() {
  return {
    name: "",
    location: "",
    contactName: "",
    phone: 0,
    date: "",
  };
}
