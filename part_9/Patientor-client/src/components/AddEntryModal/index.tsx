import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { HealthCheckEntry } from "../../types";
import { AddHealthCheckEntryForm } from "./AddHealthCheckEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<HealthCheckEntry, "id" | "type">) => void;
  error?: string;
}

const AddHealthCheckModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddHealthCheckModal;
