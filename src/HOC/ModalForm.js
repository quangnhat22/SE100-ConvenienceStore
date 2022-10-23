import { Modal } from "antd";
import React from "react";
import AddProductForm from "../containers/Admin/Products/components/AddProductForm";
import AddStaffForm from "../containers/Admin/Staffs/components/AddStaffForm";

const ModalForm = ({isOpen}) => {
  return (
    <Modal
      open={isOpen}
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
