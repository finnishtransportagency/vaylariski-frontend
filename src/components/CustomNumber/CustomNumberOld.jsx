import { useField } from "formik";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const CustomNumberOld = ({ label, name, readOnly }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Group as={Row} className={meta.error && "has-error"}>
      <Form.Label column sm="4" htmlFor={name}>
        {label}
      </Form.Label>
      <Col sm="8">
        <Form.Control
          {...field}
          id={name}
          placeholder=""
          type="number"
          readOnly={readOnly}
        />
        {meta.touched && meta.error && (
          <small className="react-form-message react-form-message-error">
            {meta.error}
          </small>
        )}
      </Col>
    </Form.Group>
  );
};
