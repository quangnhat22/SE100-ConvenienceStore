import React from "react";
import EditProfileForm from "./components/EditProfileForm";

//Data Account demo
const myAccount = {
  id: "AD1",
  name: "Hồ Tấn Tài",
  birth: "1997/11/06",
  cccd: "052237482993",
  gender: "Nam",
  phone_number: "0988374654",
  email: "admin.jd@gmail.com",
  address: "Xóm A, Khu B, Xã C, Huyện D, Tỉnh F",
  other_infor: "Ok anh là nhứt",
  images: [
    {
      url: "https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-6.jpg",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYM-_AmWXa55tBhjggE4BIIJbaS3WOTV1L152yBYdK&s",
    },
  ],
};

const FrofilePage = () => {
  return (
    <>
      <EditProfileForm account={myAccount} />
    </>
  );
};
export default FrofilePage;
