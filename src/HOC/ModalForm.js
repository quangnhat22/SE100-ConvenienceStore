import { Modal } from 'antd'
import React from 'react'

const ModalForm = () => {
  return (
    <Modal
        open={false}
        //onCancel={handleCancel}
        closable={true}
        footer={null}
        destroyOnClose = {true}
      >
        {/* {ComponentContent} */}
      </Modal>
  )
}

export default ModalForm