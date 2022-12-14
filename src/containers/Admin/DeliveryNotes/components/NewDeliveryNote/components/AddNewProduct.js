import React, { useState } from "react";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";
import FormCustomed from "../../../../../../common/Form/FormCustomed";
import { useSelector, useDispatch } from "react-redux";
import { editDeliveryNotesActions } from "../../../../../../redux/reducer/EditDeliveryNotesReducer";
import { modalActions } from "../../../../../../redux/reducer/ModalReducer";
import axios from "axios";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
  });

const AddNewProduct = () => {
  let { productOfProvider } = useSelector((state) => state.providerSlice);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageChange, setImageChange] = useState("");
  const [progress, setProgress] = useState(0);


  const optionsProductLines = productOfProvider.map(function (productLine) {
    return {
      value: productLine.id,
      label: `${productLine.id} - ${productLine.title}`,
    };
  });
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let newProduct = {
      productId: values.product_name,
      cost: values.product_buyprice,
      price: values.product_sellprice,
      MFG: values.product_expiry_date[0].toISOString(),
      EXP: values.product_expiry_date[1].toISOString(),
      quantity: values.product_quantity,
      description: values.product_description,
      image: imageChange, // fix sau
    };
    console.log(newProduct);
    dispatch(editDeliveryNotesActions.addNewProductItem(newProduct));
    dispatch(modalActions.hideModal());
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(file.preview);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("image", file);
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost/image/upload",
        data: fmData,
        ...config,
      });

      let { data, status } = res;
      console.log("server res: ", res);
      setImageChange(data["path"]);
      onSuccess("Ok");
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    //console.log(fileList);
    setFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  return (
    <FormCustomed
      name="add_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{ product_description: "" }}
    >
      <Form.Item
        name="product_name"
        label="T??n d??ng s???n ph???m"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          showSearch
          allowClear
          className="rounded"
          placeholder="D??ng s???n ph???m"
          options={optionsProductLines}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        ></Select>
      </Form.Item>
      <Form.Item
        name="product_buyprice"
        label="Gi?? nh???p"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber
          addonAfter={"VN??"}
          style={{
            width: "60%",
          }}
          placeholder="Gi?? nh???p"
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0}
        />
      </Form.Item>
      <Form.Item
        name="product_sellprice"
        label="Gi?? b??n"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber
          addonAfter={"VN??"}
          style={{
            width: "60%",
          }}
          placeholder="Gi?? b??n"
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          min={0}
        />
      </Form.Item>
      <Form.Item
        name="product_expiry_date"
        label="Th???i h???n"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <RangePicker
          style={{
            width: "100%",
          }}
          placeholder={["Ng??y s???n xu???t", "Ng??y h???t h???n"]}
          format={dateFormat}
          //   disabledDate={(current) => current.isAfter(moment())}
        />
      </Form.Item>
      <Form.Item
        name="product_quantity"
        label="S??? l?????ng"
        rules={[
          {
            required: true,
            type: "number",
            min: 1,
          },
        ]}
      >
        <InputNumber
          style={{
            width: "30%",
          }}
          placeholder="S??? l?????ng"
          min={1}
        />
      </Form.Item>
      <Form.Item name="product_description" label="M?? t???">
        <TextArea rows={4} placeholder="M?? t???" />
      </Form.Item>
      <Form.Item
        name="images"
        label="???nh s???n ph???m"
        //valuePropName="fileList"
      >
        <Upload
         accept=".png, .jpg, .jpeg, tiff, .nef, .gif, .svg, .psd, .pdf, .eps, .ai, .heic, .raw, .bmp"
         listType="picture-card"
         fileList={fileList}
         onPreview={handlePreview}
         customRequest={uploadImage}
         onChange={handleOnChange}
         maxCount="1"
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              T???i l??n
            </div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 20,
          offset: 20,
        }}
      >
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </FormCustomed>
  );
};
export default AddNewProduct;
