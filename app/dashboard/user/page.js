"use client";
import ListTopHeader from "@/components/listTopHeader";
import CustomModal from "@/components/modal";
import CustomPagination from "@/components/pagination";
import CustomTable from "@/components/table";
import Button from "@/components/ui/button";
import { API_END_POINTS } from "@/config/endPoints";
import UserForm from "@/forms/user";
import UserSearch from "@/forms/userSearch";
import { useFetchUsers } from "@/hooks/paginated_search/useFetchUsers";
import { useDeleteData } from "@/hooks/useDeleteData";
import { useGetIdData } from "@/hooks/useGetIdData";
import { usePutData } from "@/hooks/usePutData";
import { Form, message, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const UserPage = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add");
  const [messageApi, contextHolder] = message.useMessage();
  const [searchState, setSearchState] = useState({
    page: 0,
    phone: "",
    email: "",
  });

  const [formState, setFormState] = useState({
    id: "",
    phone: "",
    name: "",
    active: "",
    address: "",
    userTypeId: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState({
    main: false,
    waring: false,
  });

  const { data, isLoading, refetch } = useFetchUsers(searchState);
  console.log(data?.data?.response?.data, "datadatadatadata");
  const { refetchDataById } = useGetIdData({
    endpoint: API_END_POINTS.getUserById,
  });

  const { putDataById } = usePutData({
    endpoint: API_END_POINTS.updateUserById,
    body: formState,
  });
  const { deleteDataById } = useDeleteData({
    endpoint: API_END_POINTS.deleteUserById,
  });

  const _handelEdit = async (id) => {
    const result = await refetchDataById(id);
    console.log(result, "result");
    if (result.isSuccess) {
      setIsModalOpen({
        ...isModalOpen,
        main: true,
      });
      setModalTitle("Edit");
      setFormState({
        id: id,
        email: result?.data?.email,
        phone: result?.data?.phone,
        name: result?.data?.user_name,
        active: result?.data?.active === 1 ? true : false,
        address: result?.data?.address,
        userTypeId: result?.data?.userTypeId,
      });
      setTimeout(() => {
        if (form) {
          form.setFieldsValue({
            email: result?.data?.email,
            phone: result?.data?.phone,
            name: result?.data?.user_name,
            active: result?.data?.active === 1 ? true : false,
            address: result?.data?.address,
            userTypeId: result?.data?.userTypeId,
          });
        }
      }, 0);
    } else {
      messageApi.error({
        type: "error",
        content: "Please try again!",
      });
    }
  };

  const _handelDelete = async (id) => {
    setFormState({
      ...formState,
      id: id,
    });
    setIsModalOpen({
      ...isModalOpen,
      waring: true,
    });
  };

  const showModal = () => {
    form.resetFields();
    setIsModalOpen({
      ...isModalOpen,
      main: true,
    });
  };

  const handleCancel = () => {
    clearFormState();
    form.resetFields();
    setIsModalOpen({
      ...isModalOpen,
      main: false,
    });
  };

  const onEditFinish = async () => {
    const response = await putDataById(formState.id, formState);
    if (response?.isSuccess) {
      messageApi.open({
        type: "success",
        content: response?.message,
      });
      handleCancel();
      refetch();
    } else {
      messageApi.error({
        type: "error",
        content: response?.message,
      });
    }
  };

  const _handleSubmitDelete = async () => {
    const response = await deleteDataById(formState.id);
    if (response.isSuccess) {
      messageApi.open({
        type: "success",
        content: response?.message,
      });
      refetch();
      setIsModalOpen({
        ...isModalOpen,
        waring: false,
      });
    } else {
      messageApi.error({
        type: "error",
        content: "Please try again!",
      });
    }
  };

  const userColumn = [
    {
      title: "Serial Number",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "user_name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "IsActive",
      dataIndex: ["active"],
      render: (active) =>
        active === 1 ? (
          <span className="bg-green-600 text-white rounded-lg px-2">
            Active
          </span>
        ) : (
          <span className="bg-red-600 text-white rounded-lg px-2">
            Inactive
          </span>
        ),
    },
    {
      title: "Action",
      dataIndex: "priceSelling",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => _handelEdit(record.id)}>
            <Tooltip placement="topLeft" title={"Edit"} color={"#87d068"}>
              <BsFillEyeFill style={{ fontSize: "20px", color: "green" }} />
            </Tooltip>
          </a>

          <a onClick={() => _handelDelete(record.id)}>
            <Tooltip placement="topLeft" title={"Delete"} color={"red"}>
              <MdOutlineCancel style={{ fontSize: "20px", color: "red" }} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];
  const clearFormState = () => {
    setFormState({
      id: "",
      phone: "",
      name: "",
      active: "",
      address: "",
      userTypeId: "",
      email: "",
    });
  };

  console.log({ formState });
  return (
    <>
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb> */}
      {contextHolder}
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "white",
          borderRadius: "8px",
          margin: "16px 0",
        }}
      >
        <ListTopHeader
          setFilter={setFilter}
          open={showModal}
          isAddButtonHide={false}
        />

        {filter && <UserSearch setState={setSearchState} state={searchState} />}

        <CustomTable
          columns={userColumn}
          dataSource={data?.data?.response?.data || []}
          loading={isLoading}
        />
        {!isLoading && (
          <CustomPagination
            setState={setSearchState}
            state={searchState}
            totalPage={data?.data?.response?.pagination?.total || 0}
          />
        )}

        <CustomModal
          title={modalTitle === "Add" ? "Add User" : "Edit User"}
          open={isModalOpen.main}
        >
          <Form form={form} className="mt-6" onFinish={onEditFinish}>
            <div className="grid grid-cols-1 p-3">
              <UserForm setCreateState={setFormState} createState={formState} />
              <div className="flex justify-end mt-3">
                <div
                  style={{ marginRight: "4px" }}
                  onClick={() => handleCancel()}
                >
                  <Button type={"submit"} btnName="Cancle" size={"py-1"} />
                </div>
                <div style={{ marginRight: "4px" }}>
                  <Button type={"submit"} btnName="submit" size={"py-1"} />
                </div>
              </div>
            </div>
          </Form>
        </CustomModal>

        <CustomModal title={"Delete User"} open={isModalOpen.waring}>
          <div>
            <div>Are you sure to delete this item?</div>
            <div className="grid grid-cols-1">
              <div className="flex justify-end mt-3">
                <div
                  style={{ marginRight: "4px" }}
                  onClick={() =>
                    setIsModalOpen({
                      ...isModalOpen,
                      waring: false,
                    })
                  }
                >
                  <Button type={"submit"} btnName="Cancle" size={"py-1"} />
                </div>
                <div
                  style={{ marginRight: "4px" }}
                  onClick={() => _handleSubmitDelete()}
                >
                  <Button type={"submit"} btnName="submit" size={"py-1"} />
                </div>
              </div>
            </div>
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default UserPage;
