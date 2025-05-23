import React, { useState } from "react";
import { Breadcrumb, Button, Form, Input, Upload, message } from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

const CategoryAdd = () => {
    const { addToast } = useToasts();
    const [form] = Form.useForm();
    // upload image
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [preview, setPreview] = useState("");
    const handleBeforeUpload = (file) => {
        setFileList([file]);
        return false;
    };
    const handleUpload = () => {
        const file = fileList[0];
        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({
                icon: "error",
                title: "Tệp tin quá lớn...",
                text: "Vui lòng chọn một tệp tin nhỏ hơn 2MB!",
            });
            return;
        }
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Sai tệp tin...",
                text: "Vui lòng chọn một tệp tin hình ảnh (jpg, png, webp)!",
            });
            return;
        }
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
    };
    const onHandleSubmit = async (e) => {
        setLoading(true);
        const formDataApi = new FormData();
        const item = await form.validateFields();
        const formData = {
            nameProductType: item.nameProductType,
            imageTypeProduct: fileList[0],
        };
        if (!formData.nameProductType || !formData.imageTypeProduct) {
            messageApi.open({
                type: "error",
                content: "Không để trống các trường",
            });
            return;
        }
        e.preventDefault();
        try {
            // Proceed with API call
            formDataApi.append("nameProductType", formData.nameProductType);
            formDataApi.append("imageTypeProduct", formData.imageTypeProduct);
            await categoryAPI.CreateCategory(formDataApi);
            addToast("Thêm mới danh mục thành công!", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 1500,
            });
            history.push(`/admin/categories`);
            return;
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Tạo mới thất bại",
            });
            setLoading(false);
        }
    };
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo danh mục</Breadcrumb.Item>
            </Breadcrumb>
            {contextHolder}
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">
                    Thêm danh mục
                </Title>
                {loading && (
                    <div>
                        <LoadingSpin />
                    </div>
                )}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="nameProductType"
                        labelCol={{ span: 3, offset: 1 }}
                    >
                        <Input style={{ height: 30 }} />
                    </Form.Item>
                    <Form.Item
                        label="Hình ảnh"
                        tooltip="Ảnh danh mục xem trước"
                        name="imageTypeProduct"
                        labelCol={{ span: 3, offset: 1 }}
                    >
                        <Upload
                            listType="picture-card"
                            className="imageTypeProduct"
                            accept=".png,.jpg,.jpeg,.webp"
                            maxCount={1}
                            fileList={fileList}
                            beforeUpload={handleBeforeUpload}
                            onChange={handleUpload}
                            showUploadList={false}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt={preview}
                                    width={96}
                                    className="rounded"
                                />
                            ) : (
                                <img
                                    src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1669841925/no-image-icon-6_ciydgz.png"
                                    alt="Error"
                                    width={96}
                                    className="rounded"
                                />
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onHandleSubmit}
                            block
                        >
                            Thêm mới danh mục
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CategoryAdd;
