import React, { useState } from "react";
import { Form, Button, Spinner, FormGroup } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signInApi, signUpApi, setTokenApi } from "../../api/auth";
import "./SignInForm.scss";

export default function SignInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setfromData] = useState(initialFormValue());
  const [signInLoading, setSignInLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;

    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(formData) !== validCount) {
      toast.error("¡Complete all fields of the record!");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.error("¡Email is Invalid!");
      } else {
        setSignInLoading(true);
        signInApi(formData)
          .then((response) => {
            if (response.message) {
              toast.warning(response.message);
            } else {
              setTokenApi(response.token);
              setRefreshCheckLogin(true);
            }
          })
          .catch(() => {
            toast.error("Server error please try again later.");
          })
          .finally(() => {
            setSignInLoading(false);
          });
      }
    }
  };

  return (
    <div className="sign-in-form">
      <h2>Access</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setfromData({ ...formData, email: e.target.value })
            }
          />
        </Form.Group>
        <FormGroup>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setfromData({ ...formData, password: e.target.value })
            }
          />
        </FormGroup>
        <Button variant="danger" type="submit">
          {!signInLoading ? "Login" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    email: "",
    password: "",
  };
}
