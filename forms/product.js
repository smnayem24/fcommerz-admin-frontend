import React from "react";
import Input from "@/components/ui/input";
import { Form } from "antd";

const ProductForm = ({ createState, setCreateState }) => {
    console.log({createState});
  return (
    <>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input product name!" }]}
      >
        <Input
          type="text"
          placeholder="Product Name"
          labelText="Product Name"
          value={createState?.name}
          onChange={(e) =>
            setCreateState({ ...createState, name: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[{ required: true, message: "Please input product description!" }]}
      >
        <Input
          type="text"
          placeholder="Description"
          labelText="Description"
          value={createState?.description}
          onChange={(e) =>
            setCreateState({ ...createState, description: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        name="normalPrice"
        rules={[{ required: true, message: "Please input normal price!" }]}
      >
        <Input
          type="number"
          placeholder="Normal Price"
          labelText="Normal Price"
          value={createState?.normalPrice}
          onChange={(e) =>
            setCreateState({ ...createState, normalPrice: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        name="discountPrice"
        rules={[{ required: true, message: "Please input discount price!" }]}
      >
        <Input
          type="number"
          placeholder="Discount Price"
          labelText="Discount Price"
          value={createState?.discountPrice}
          onChange={(e) =>
            setCreateState({ ...createState, discountPrice: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input final price!" }]}
      >
        <Input
          type="number"
          placeholder="Final Price"
          labelText="Final Price"
          value={createState?.price}
          onChange={(e) =>
            setCreateState({ ...createState, price: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        name="image"
        rules={[{ required: true, message: "Please input image URL!" }]}
      >
        <Input
          type="text"
          placeholder="Image URL"
          labelText="Image URL"
          value={createState?.image}
          onChange={(e) =>
            setCreateState({ ...createState, image: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        name="createdFor"
        rules={[{ required: true, message: "Please input createdFor user ID!" }]}
      >
        <Input
          type="text"
          placeholder="Created For (User ID)"
          labelText="Created For"
          value={createState?.createdFor}
          onChange={(e) =>
            setCreateState({ ...createState, createdFor: e.target.value })
          }
        />
      </Form.Item>
    </>
  );
};

export default ProductForm;
