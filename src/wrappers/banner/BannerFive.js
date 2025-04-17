import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge } from "antd";
import StatisticsApi from "../../api/statistic/StatisticsApi";
import { AiOutlinePlus } from "react-icons/ai";
import "./BannerFive.css"; // tạo file css nếu cần

const BannerFive = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let data = await StatisticsApi.GetTopSellingProducts({});
        setProducts(data.slice(0, 4)); // Chỉ lấy tối đa 4 sản phẩm
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="banner-area hm9-section-padding">
      <div className="container">
        <h2 className="banner-title">Món Ăn Bán Chạy</h2>

        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="product-item" key={index}>
                <Skeleton width="100%" height={260} />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products.map((item, index) => {
              const originalPrice = item.product.price;
              const discountPercentage = item.product.discount;
              const discountedPrice = originalPrice * (1 - discountPercentage / 100);

              return (
                <div className="product-item" key={index}>
                  <Link to={`/product/${item.productId || item.id}`}>
                    <Badge.Ribbon
                      text={`-${discountPercentage}%`}
                      style={{ insetInlineEnd: 2 }}
                      color="volcano"
                    >
                      <img
                        src={item.product?.avartarImageProduct || item.image[0]}
                        alt={item.product?.nameProduct || item.name}
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </Badge.Ribbon>
                    <h3 className="product-name two-lines">
                      {item.product?.nameProduct}
                    </h3>
                    <div className="d-flex justify-content-between ">
                      <div className="container-price">
                        <span className="price">
                          {originalPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                      <div className="mx-4">
                        <AiOutlinePlus />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerFive;
