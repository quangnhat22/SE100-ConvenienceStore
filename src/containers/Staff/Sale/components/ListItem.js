import { Avatar, Button, List, Skeleton, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { cartActions } from "../../../../redux/reducer/CartReducer";
import { useSelector, useDispatch } from "react-redux";
import "./style/CustomInputNumber.css";

const ListItem = ({ data }) => {
  const dispatch = useDispatch();

  const onChange = (e, item) => {
    console.log(e);
    if (e > 0 && e <= item.maxQuantity) {
      let newCartItem = {
        id: item.id,
        productName: item.productName,
        price: item.price,
        quantity: e,
        tax: item.tax,
        image: item.image,
        maxQuantity: item.maxQuantity,
      };
      dispatch(cartActions.cartItemQuantityChange(newCartItem));
    }
  };

  const handleDelete = (item) => {
    let newCartItem = {
      id: item.id,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      tax: item.tax,
      image: item.image,
      maxQuantity: item.maxQuantity,
    };
    dispatch(cartActions.removeCartItem(newCartItem));
  };

  return (
    <List
      className="demo-loadmore-list p-2"
      loading={false}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className="bg-slate-50 mb-2 p-5 rounded-lg"
          actions={[<a onClick={() => handleDelete(item)}>Xóa</a>]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={
                <div className="bg-slate-200 rounded">
                  <img
                    className="object-scale-down h-16 w-20 hidden sm:inline-block"
                    src={item.image}
                    alt=""
                  />
                </div>
              }
              title={
                <p class="break-words">
                  <b>{item.productName}</b>
                </p>
              }
              description={item.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            />
            <InputNumber
              className="custom-input-number"
              style={{
                maxWidth: "100px",
                width: "20%",
              }}
              min={1}
              max={item.maxQuantity}
              value={item.quantity}
              // onStep={(val, info) => onChange(val, info.type, item)}
              onChange={(e) => onChange(e, item)}
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default ListItem;
