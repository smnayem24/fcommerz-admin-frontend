"use client";
import ListTopHeader from "@/components/listTopHeader";
import CustomModal from "@/components/modal";
import CustomPagination from "@/components/pagination";
import CustomTable from "@/components/table";
import Button from "@/components/ui/button";
import { API_END_POINTS } from "@/config/endPoints";
import UserForm from "@/forms/user";
import UserSearch from "@/forms/userSearch";
import { useFetchProducts } from "@/hooks/paginated_search/useFetchProducts";
import { useFetchUsers } from "@/hooks/paginated_search/useFetchUsers";
import { useDeleteData } from "@/hooks/useDeleteData";
import { useGetIdData } from "@/hooks/useGetIdData";
import { usePostData } from "@/hooks/usePostData";
import { usePutData } from "@/hooks/usePutData";
import { removeEmptyKeys } from "@/utils/removeEmptyKeys";
import { Form, message, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const ProductPage = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add");
  const [messageApi, contextHolder] = message.useMessage();
  const [searchState, setSearchState] = useState({
    page: 0,
    email: "",
    name: "",
    password: "",
  });

  const [formState, setFormState] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    normalPrice: "",
    discountPrice: "",
    images: "",
    createdFor: "",
  });
  const [isModalOpen, setIsModalOpen] = useState({
    main: false,
    waring: false,
  });

  const { data, isLoading, refetch } = useFetchProducts(searchState);

  const { postData } = usePostData({
    endpoint: API_END_POINTS.createProduct,

    body: removeEmptyKeys(formState),
  });

  const { refetchDataById } = useGetIdData({
    endpoint: API_END_POINTS.getProductById,
  });

  const { putDataById } = usePutData({
    endpoint: API_END_POINTS.updateProductById,
    body: formState,
  });

  const { deleteDataById } = useDeleteData({
    endpoint: API_END_POINTS.deleteProductById,
  });

  const _handelEdit = async (id) => {
    const result = await refetchDataById(id);
    if (result.isSuccess) {
      setIsModalOpen({
        ...isModalOpen,
        main: true,
      });
      setModalTitle("Edit");
      setFormState({
        id: id,
        name: result?.data?.name,
        description: result?.data?.description,
        price: result?.data?.price,
        normalPrice: result?.data?.normalPrice,
        discountPrice: result?.data?.discountPrice,
        images: result?.data?.images,
        createdFor: result?.data?.createdFor,
      });
      setTimeout(() => {
        if (form) {
          form.setFieldsValue({
            name: result?.data?.name,
            description: result?.data?.description,
            price: result?.data?.price,
            normalPrice: result?.data?.normalPrice,
            discountPrice: result?.data?.discountPrice,
            images: result?.data?.images,
            createdFor: result?.data?.createdFor,
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
    setModalTitle("Add");
  };

  const handleCancel = () => {
    clearFormState();
    form.resetFields();
    setIsModalOpen({
      ...isModalOpen,
      main: false,
    });
  };

  const onFinish = async () => {
    const response = await postData(removeEmptyKeys(formState));
    if (response?.isSuccess) {
      messageApi.open({
        type: "success",
        content: response?.message,
      });
      clearFormState();
      if (searchState.page === 0) {
        refetch();
      } else {
        setSearchState({
          page: 0,
          type: "",
        });
      }
      handleCancel();
    } else {
      messageApi.error({
        type: "error",
        content: response?.message,
      });
      clearFormState();
    }
    form.resetFields();
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
      title: "Id",
      dataIndex: "_id",
    },

    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "DiscountPrice",
      dataIndex: "discountPrice",
    },
    {
      title: "NormalPrice",
      dataIndex: "normalPrice",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "priceSelling",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => _handelEdit(record._id)}>
            <Tooltip placement="topLeft" title={"Edit"} color={"#87d068"}>
              <BsFillEyeFill style={{ fontSize: "20px", color: "green" }} />
            </Tooltip>
          </a>

          <a onClick={() => _handelDelete(record._id)}>
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
      email: "",
      name: "",
      password: "",
    });
  };

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
          dataSource={data?.response?.data || []}
          loading={isLoading}
        />
        {!isLoading && (
          <CustomPagination
            setState={setSearchState}
            state={searchState}
            totalPage={data?.response?.pagination?.total || 0}
          />
        )}

        <CustomModal
          title={modalTitle === "Add" ? "Add User" : "Edit User"}
          open={isModalOpen.main}
        >
          <Form
            form={form}
            className="mt-6"
            onFinish={modalTitle === "Add" ? onFinish : onEditFinish}
          >
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

export default ProductPage;
