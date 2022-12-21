import { Avatar, Button, List, Skeleton, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { cartActions } from "../../../../redux/reducer/CartReducer";
import { useSelector, useDispatch } from "react-redux";

const ListItem = ({ data }) => {
  const dispatch = useDispatch();
  const onChange = (val, info, item) => {
    let newCartItem = {
      id: item.id,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      tax: item.tax,
      image: item.image,
      maxQuantity: item.maxQuantity,
    };
    if (info === "up") {
      dispatch(cartActions.addNewCartItem(newCartItem));
    } else if (newCartItem.quantity > 1) {
      dispatch(cartActions.reduceCartItem(newCartItem));
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
          className="sm:bg-slate-50 mb-2"
          actions={[<a onClick={() => handleDelete(item)}>Xóa</a>]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={item.productName}
              description={item.price}
            />
            <InputNumber
              min={1}
              value={item.quantity}
              onStep={(val, info) => onChange(val, info.type, item)}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default ListItem;
