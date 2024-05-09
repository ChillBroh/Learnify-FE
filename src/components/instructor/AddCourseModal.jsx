import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Checkbox, Divider } from "antd";
import { Form, Input } from "antd";
const { TextArea } = Input;

const plainOptions = [
  "Art & Design",
  "Business",
  "Development",
  "Finance",
  "Health & Fitness",
  "Technology",
  "Data Science",
];
const defaultCheckedList = [""];

const AddCourseModal = ({ open, close }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const handleCancel = () => {
    close();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("checked list", checkedList);
    setConfirmLoading(true);
    setTimeout(() => {
      close();
      setConfirmLoading(false);
    }, 2000);
  };
  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <>
      <Modal
        title="Add Course Details"
        open={open}
        confirmLoading={confirmLoading}
        width={1000}
        footer={null}
      >
        <div>
          <Form form={form} name="form" onFinish={onFinish} autoComplete="off">
            <div className="pb-3 font-bold text-lg"> Basic Details</div>
            <div className="pb-3">Title</div>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input title for the course!",
                },
              ]}
            >
              <Input placeholder="Course Title" />
            </Form.Item>
            <div className="pb-3"> Description</div>
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description for the course!",
                },
              ]}
            >
              <TextArea
                placeholder="Description of the course"
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
                }}
              />
            </Form.Item>
            <div className="pb-3"> Instructor</div>
            <Form.Item
              name="instructor"
              rules={[
                {
                  required: true,
                  message: "Please input description for the course!",
                },
              ]}
            >
              <Input placeholder="Instructor" />
            </Form.Item>
            <div className="pb-3"> Duration</div>
            <Form.Item
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Please input total course duration!",
                },
              ]}
            >
              <Input placeholder="Total course duration(hours)" type="number" />
            </Form.Item>
            <div className="pb-3"> Cover Image </div>
            <label>
              <img
                className=""
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="avatar"
                style={{
                  width: "120px",
                  height: "120px",
                  cursor: "pointer",
                }}
              />
            </label>
            <Form.Item
              name="coverImage"
              rules={[
                {
                  required: true,
                  message: "Please input Cover image for the course!",
                },
              ]}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                }}
              />
            </Form.Item>
            <div className="pb-3"> Price ($)</div>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input total price!",
                },
              ]}
            >
              <Input placeholder="Total course price($)" type="text" />
            </Form.Item>
            <div className="pb-3">Tags</div>
            <Checkbox
              indeterminate={
                checkedList.length > 0 &&
                checkedList.length < plainOptions.length
              }
              onChange={onCheckAllChange}
              checked={checkedList.length === plainOptions.length}
              className="pb-3"
            >
              Check all
            </Checkbox>
            <br />
            <Checkbox.Group
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
              className="pb-3"
            />
            {/* Dynamic fields */}
            <div className="pb-3 font-bold text-lg"> Lessons</div>
            <Form.List name="lessons">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} className="flex w-full flex-col">
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        className="justify-end cursor-pointer text-lg pb-5 pr-5"
                      />
                      <Form.Item
                        {...field}
                        name={[field.name, "title"]}
                        fieldKey={[field.fieldKey, "lesson"]}
                        rules={[
                          { required: true, message: "Add Title for Lesson" },
                        ]}
                        className="w-full"
                      >
                        <Input placeholder="Lesson Title" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "description"]}
                        fieldKey={[field.fieldKey, "lesson"]}
                        rules={[
                          {
                            required: true,
                            message: "Add Description for Lesson",
                          },
                        ]}
                      >
                        <TextArea
                          placeholder="Description of the lesson"
                          autoSize={{
                            minRows: 2,
                            maxRows: 6,
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "video"]}
                        fieldKey={[field.fieldKey, "lesson"]}
                        rules={[
                          {
                            required: true,
                            message: "Add Video URL for Lesson",
                          },
                        ]}
                        className="w-full"
                      >
                        <Input placeholder="Lesson Video URL" />
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Lesson
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <div className="flex felx-row justify-end gap-3">
              <Form.Item>
                <Button onClick={handleCancel}>Cancel</Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={confirmLoading}
                >
                  Add Course
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddCourseModal;
