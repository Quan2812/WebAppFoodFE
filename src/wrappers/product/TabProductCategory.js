import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridTwo from "./ProductGridTwo";
import categoryAPI from "../../api/category/CategoryApi";

const TabProductCategory = ({
  spaceBottomClass,
  category,
  productTabClass,
}) => {
  const [data, setDatas] = useState([]); // Khởi tạo mảng rỗng thay vì dữ liệu tĩnh
  const [activeKey, setActiveKey] = useState(null); // State để kiểm soát tab đang active

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryAPI.GetCategoryFrontend();
        setDatas(response); // Gán dữ liệu từ API
        if (response && response.length > 0) {
          setActiveKey(response[0].key); // Chọn tab đầu tiên từ dữ liệu API
        }
      } catch (error) {
        console.error("Error fetching category", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitleThree
          titleText="Món ăn theo danh mục"
          positionClass="text-center"
        />
        <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
          <Nav
            variant="pills"
            className={`product-tab-list pt-35 pb-60 text-center ${
              productTabClass ? productTabClass : ""
            }`}
          >
            {data &&
              data.map((item) => (
                <Nav.Item key={item.key}>
                  <Nav.Link eventKey={item.key}
                  style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <h4>{item.nameProductType}</h4>
                  </Nav.Link>
                </Nav.Item>
              ))}
          </Nav>
          <Tab.Content>
            {data &&
              data.map((item) => (
                <Tab.Pane key={item.key} eventKey={item.key}>
                  <div className="row">
                    <ProductGridTwo
                      category={item.nameProductType}
                      type="new"
                      limit={8}
                      spaceBottomClass="mb-25"
                    />
                  </div>
                </Tab.Pane>
              ))}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

TabProductCategory.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default TabProductCategory;