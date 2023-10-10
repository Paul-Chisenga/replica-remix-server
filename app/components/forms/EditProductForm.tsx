import type { FC } from "react";
import Modal from "../Modal/Modal";
import { Form } from "@remix-run/react";
import MyForm from "../Form/MyForm";

interface Props {
  onCancel: () => void;
}

const EditProductForm: FC<Props> = ({ onCancel }) => {
  return (
    <Form action="" method="POST">
      <Modal.Wrapper show size="md">
        <Modal.Header className="tw-text-2xl">Edit product</Modal.Header>
        <Modal.Body className="tw-p-8 tw-text-xl">
          <MyForm.Group>
            <MyForm.Input
              id="title"
              name="title"
              placeholder="Title"
              required
              defaultValue={""}
            />
            <MyForm.File
              id="image"
              name="images"
              placeholder="images"
              multiple
            />
          </MyForm.Group>
        </Modal.Body>
        <Modal.Footer className="tw-flex tw-gap-5 p-4">
          <button
            className="primary-btn8 lg--btn btn-primary-fill"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="primary-btn3 btn">Save</button>
        </Modal.Footer>
      </Modal.Wrapper>
    </Form>
  );
};

export default EditProductForm;
