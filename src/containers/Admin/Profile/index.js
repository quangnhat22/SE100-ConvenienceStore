import React from "react";
import EditProfilePage from "./components/EditProfilePage";

//Data Account demo
const myAccount = {
  id: 1,
  fullname: "Nguyễn Trung Thành",
  birthday: "1997/11/06",
  identityNumber: "052237482993",
  gender: "MALE",
  phoneNumber: "0988374654",
  email: "admin.jd@gmail.com",
  address: "Xóm A, Khu B, Xã C, Huyện D, Tỉnh F",
  other: "Trầm tính, ít nói nhưng hòa đồng, lạc quan",
  avatar:
    "https://file.tinnhac.com/resize/600x-/2019/06/30/20190630131543-0b16.jpg",
  role: "MANAGER",
};

const FrofilePage = () => {
  return <EditProfilePage data={myAccount}/>;
};
export default FrofilePage;
