import React, { useState, useCallback } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { API_HOST } from "../../../utils/constants";
import { Camera } from "../../../utils/icons";
import {
  uploadBannerApi,
  uploadAvatarApi,
  updateInfoUserApi,
} from "../../../api/user";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialValue(user));
  // Update Banner.
  const [bannerUrl, setBannerUrl] = useState(
    user?.banner ? `${API_HOST}/banners?id=${user.id}` : null
  );

  const [bannerFile, setBannerFile] = useState(null);

  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  });

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  // Function Update Avatar.
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ? `${API_HOST}/avatars?id=${user.id}` : null
  );

  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });

  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (bannerFile) {
      await uploadBannerApi(bannerFile).catch(() => {
        toast.error("Error Update");
      });
    }

    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch(() => {
        toast.error("Error Update");
      });
    }

    await updateInfoUserApi(formData)
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Error Update");
      });

    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url("${bannerUrl}")` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <Camera />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={formData.name}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last name"
                name="lastName"
                defaultValue={formData.lastName}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            name="bio"
            placeholder="Write your Bio"
            defaultValue={formData.bio}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Site Web"
            name="Website"
            defaultValue={formData.webSite}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <DatePicker
            placeholderText="BirthDay"
            selected={new Date(formData.birthDate)}
            onChange={(date) => {
              setFormData({ ...formData, birthDate: date });
            }}
          ></DatePicker>
        </Form.Group>

        <Button className="btn-danger" variant="danger" type="submit">
          {loading && <Spinner animation="border" size="sm" />}
          Update
        </Button>
      </Form>
    </div>
  );
}

function initialValue(user) {
  return {
    name: user.name || "",
    lastName: user.lastName || "",
    bio: user.bio || "",
    location: user.location || "",
    birthDate: user.birthDate || "",
    webSite: user.webSite || "",
  };
}
