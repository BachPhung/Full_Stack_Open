import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from "../../AddPatientModal/FormField";
import { useStateValue } from "../../state";
import { HealthCheckEntry } from "../../types";

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, "id" | "type">) => void;
  onCancel: () => void;
}

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values: Omit<HealthCheckEntry, "id" | "type">) => {
        console.log(values);
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (values.description.length === 0) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="healthCheckRating"
              placeholder="abc"
              name="healthCheckRating"
              component={NumberField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
