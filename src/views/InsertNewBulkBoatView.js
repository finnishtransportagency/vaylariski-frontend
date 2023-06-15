import { CustomNumber } from "components/CustomNumber";
import { CustomText } from "components/CustomText";
import { Formik } from "formik";
import { Form as FForm } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import apiClient from "http-common";
import NotificationContext from "contexts/NotificationContext";
import SpinnerVisibilityContext from "contexts/SpinnerVisibilityContext";
import { useContext } from "react";

const validationSchema = Yup.object().shape({
  PITUUS: Yup.number()
    .min(1, "Pituus ei voi olla negatiivinen")
    .typeError("Pituus tulee olla numero")
    .required("Pituus vaaditaan"),
  LEVEYS: Yup.number()
    .min(1, "Leveys ei voi olla negatiivinen")
    .typeError("Leveys tulee olla numero")
    .required("Leveys vaaditaan"),
  SYVAYS: Yup.number()
    .min(1, "Syväys ei voi olla negatiivinen")
    .typeError("Syväys tulee olla numero")
    .required("Syväys vaaditaan"),
  JNRO: Yup.number()
    .min(0, "JNRO ei voi olla negatiivinen")
    .typeError("JNRO tulee olla numero"),
  KOKO: Yup.number()
    .min(1, "Koko ei voi olla negatiivinen")
    .typeError("Koko tulee olla numero"),
  RUNKO_TKERROIN: Yup.number()
    .min(0, "RUNKO_TKERROIN ei voi olla negatiivinen")
    .typeError("RUNKO_TKERROIN tulee olla numero"),
  SELITE: Yup.string().trim(),
  VAY_NIMISU: Yup.string().trim(),
});

export default function InsertNewBulkBoatComponent(props) {
  const { tabValue, tabIndex, ...other } = props;
  const { setSpinnerVisible } = useContext(SpinnerVisibilityContext);
  const { setNotificationStatus } = useContext(NotificationContext);

  const PostShipData = async (values, setSubmitting) => {
    const path = "insert_boat";
    setSpinnerVisible(true);
    try {
      const response = await apiClient.post(path, values);
      setNotificationStatus({
        severity: "success",
        message: response.data,
        visible: true,
      });
    } catch (err) {
      console.log(err);
      setSpinnerVisible(false);
      setNotificationStatus({
        severity: "error",
        message: err.message,
        visible: true,
      });
    } finally {
      setSubmitting(false);
      setSpinnerVisible(false);
    }
  };

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <Formik
          initialValues={{
            PITUUS: "",
            LEVEYS: "",
            SYVAYS: "",
            JNRO: "",
            KOKO: "",
            RUNKO_TKERROIN: "",
            SELITE: "",
            VAY_NIMISU: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            PostShipData(values, setSubmitting);
          }}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnMount
        >
          {(formik) => (
            <FForm onSubmit={formik.handleSubmit}>
              <CustomNumber
                label="Laivan pituus"
                name="PITUUS"
                readOnly={false}
              />
              <CustomNumber
                label="Laivan leveys"
                name="LEVEYS"
                readOnly={false}
              />
              <CustomNumber
                label="Laivan syväys"
                name="SYVAYS"
                readOnly={false}
              />
              <CustomNumber
                label="Väylän tunnus"
                name="JNRO"
                readOnly={false}
              />
              <CustomNumber label="Laivan koko" name="KOKO" readOnly={false} />
              <CustomNumber
                label="RUNKO_TKERROIN"
                name="RUNKO_TKERROIN"
                readOnly={false}
              />
              <CustomText label="Selite" name="SELITE" readOnly={false} />
              <CustomText
                label="Väylän nimi"
                name="VAY_NIMISU"
                readOnly={false}
              />
              <Button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Lähetä laivan paramatrit
              </Button>
            </FForm>
          )}
        </Formik>
      )}
    </div>
  );
}
