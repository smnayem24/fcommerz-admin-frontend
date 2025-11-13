import React from "react";
import Button from "./ui/button";

const ListTopHeader = ({ setFilter, open, isAddButtonHide }) => {
  return (
    <div className="flex justify-end">
      {!isAddButtonHide && (
        <div style={{ marginRight: "4px" }} onClick={() => open()}>
          <Button
            type={"submit"}
            btnName="Add"
            size={"py-1"}
            disabled={isAddButtonHide && true}
          />
        </div>
      )}

      <div
        style={{ marginLeft: "4px" }}
        onClick={() => setFilter((pre) => !pre)}
      >
        <Button type={"submit"} btnName="Filter" size={"py-1"} />
      </div>
    </div>
  );
};
export default ListTopHeader;
