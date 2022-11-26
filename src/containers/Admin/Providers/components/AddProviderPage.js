import React from "react";
import { Form, Input, Select, Space } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const AddProviderPage = ({ data }) => {
  const [form] = Form.useForm();
  const validateMessages = {
    required: "Vui lòng nhập ${label}!",
  };

  //Danh sách nhóm nhà cung cấp
  const listProviders = [
    {
      value: "MACDINH",
      label: "Khác",
    },
    {
      value: "SNACK",
      label: "Thức ăn nhanh",
    },
  ];

  //Danh sách nhân viên
  const listStaffs = [
    {
      value: "NV1",
      label: "Đỗ Văn Báo",
    },
    {
      value: "NV2",
      label: "Nguyễn Văn A",
    },
  ];

  const handleExit = () => {};

  const handleSave = () => {};

  return (
    <div className="flex justify-center items-center">
      <div className="gap-8 mt-10 flex w-full lg:w-3/5 flex-col md:flex-row mx-10">
        <div className="gap-8 flex flex-col w-full md:w-2/3">
          {/* Thông tin chung */}
          <div className="rounded bg-white px-5 py-8">
            <header className="font-bold text-xl">Thông tin chung</header>
            <Form
              form={form}
              layout="vertical"
              validateMessages={validateMessages}
            >
              <Form.Item
                name="tenNhaCungCap"
                label="Tên nhà cung cấp"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="rounded" placeholder="Tên nhà cung cấp" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Form.Item
                    name="maNhaCungCap"
                    label="Mã nhà cung cấp"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input className="rounded" placeholder="Tên nhà cung cấp" />
                  </Form.Item>
                  <Form.Item name="nhomNhaCungCap" label="Nhóm nhà cung cấp">
                    <Select
                      className="rounded"
                      defaultValue="MACDINH"
                      options={listProviders}
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Form.Item
                    name="soDienThoai"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input className="rounded" placeholder="Số điện thoại" />
                  </Form.Item>
                  <Form.Item name="email" label="Email">
                    <Input className="rounded" placeholder="example@host.com" />
                  </Form.Item>
                </Space>
              </Form.Item>
            </Form>
          </div>

          {/* Thông tin khác */}
          <div className="rounded bg-white px-5 py-8">
            <header className="font-bold text-xl">Thông tin địa chỉ</header>
            <Form
              form={form}
              layout="vertical"
              validateMessages={validateMessages}
            >
              <Form.Item>
                <Space>
                  <Form.Item
                    name="capTinh"
                    label="Tỉnh"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input className="rounded" placeholder="Tỉnh/Thành phố" />
                  </Form.Item>
                  <Form.Item
                    name="capHuyen"
                    label="Quận/Huyện/Thị xã"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="rounded"
                      placeholder="Quận/Huyện/Thị xã"
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item
                name="capXa"
                label="Xã/Phường/Thị trấn"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="rounded" placeholder="Xã/Phường/Thị trấn" />
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="gap-8 flex flex-col grow">
          {/* Thông tin khác */}
          <div className="rounded bg-white px-5 py-8">
            <header className="font-bold text-xl">Thông tin khác</header>
            <Form
              form={form}
              layout="vertical"
              validateMessages={validateMessages}
            >
              <Form.Item name="nhanVien" label="Nhân viên phụ trách">
                <Select
                  className="rounded"
                  placeholder="Chọn nhân viên"
                  options={listStaffs}
                />
              </Form.Item>
              <Form.Item name="moTa" label="Mô tả">
                <TextArea className="rounded" rows={4} placeholder="Mô tả" />
              </Form.Item>
            </Form>
          </div>

          {/* Cài đặt nâng cao */}
          <div className="rounded bg-white px-5 py-8">
            <header className="font-bold text-xl whitespace-nowrap">
              Cài đặt nâng cao
              <InfoCircleTwoTone className="ml-1" />
            </header>
            <Form
              form={form}
              layout="vertical"
              validateMessages={validateMessages}
            >
              <Form.Item name="vat" label="Thuế mặc định">
                <Select className="rounded" placeholder="Chọn thuế mặc định" />
              </Form.Item>
            </Form>
          </div>
          {/* Button Action */}
          <div className="flex justify-end">
            <Space
              size={[15]}
              className="w-full py-2 lg:w-3/5 flex justify-end"
            >
              <button
                className="border rounded border-gray-300 py-2 px-3 bg-gray-100 hover:bg-gray-200 shadow-md hover:border-gray-300"
                onClick={handleExit}
              >
                Thoát
              </button>
              <button
                className="rounded py-2 px-3 bg-blue-500 opacity-90 text-white hover:opacity-100 shadow-md"
                onClick={handleSave}
              >
                Lưu
              </button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProviderPage;
