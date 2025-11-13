import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useState } from "react";

const UserSearch = ({ setState }) => {
  const [obj, setObj] = useState({
    email: "",
    phone: "",
  });

  const handleSubmit = () => {
    setState({
      page: 0,
      email: obj.email,
      phone: obj.phone,
    });
  };

  const handleClear = () => {
    setObj({
      email: "",
      phone: "",
    });
    setState({
      page: 0,
      phone: "",
      email: "",
    });
  };
  return (
    <div style={{ margin: "8px 0 8px 0" }}>
      <div className="grid lg:grid-cols-3 gap-1 border p-3 rounded-lg items-center bg-gray-200">
        <div className="my-2">
          <Input
            type={"email"}
            placeholder="Email"
            labelText={"Emain"}
            onChange={(e) => {
              setObj({
                ...obj,
                email: e.target.value,
              });
            }}
            value={obj.email}
          />
        </div>
        <div className="my-2">
          <Input
            type={"number"}
            placeholder="Phone Number"
            labelText={"Phone Number"}
            onChange={(e) => {
              setObj({
                ...obj,
                phone: e.target.value,
              });
            }}
            value={obj.phone}
          />
        </div>

        <div className="flex flex-wrap lg:justify-start justify-end mt-7 px-3">
          <div style={{ marginRight: "4px" }} onClick={() => handleClear()}>
            <Button type={"submit"} btnName="Clear" size={"py-1"} />
          </div>

          <div style={{ marginLeft: "4px" }} onClick={() => handleSubmit()}>
            <Button type={"submit"} btnName="Search" size={" py-1"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
