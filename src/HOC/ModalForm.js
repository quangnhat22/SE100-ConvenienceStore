import { Modal } from "antd";
import React from "react";
import AddProductForm from "../containers/Admin/Products/components/AddProductForm";
import AddStaffForm from "../containers/Admin/Staffs/components/AddStaffForm";

const ModalForm = () => {
  return (
    <Modal
      open={true}
      //onCancel={handleCancel}
      closable={true}
      footer={null}
      destroyOnClose={true}
    >
      <AddStaffForm />
    </Modal>
  );
};

export default ModalForm;
