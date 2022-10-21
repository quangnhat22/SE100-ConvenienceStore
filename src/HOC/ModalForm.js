import { Modal } from "antd";
import React from "react";
import AddProductForm from "../containers/Admin/Products/components/AddProductForm";

const ModalForm = () => {
  return (
    <Modal
      open={true}
      //onCancel={handleCancel}
      closable={true}
      footer={null}
      destroyOnClose={true}
    >
      <AddProductForm />
    </Modal>
  );
};

export default ModalForm;
