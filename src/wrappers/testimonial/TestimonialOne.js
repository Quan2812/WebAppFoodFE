import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const TestimonialOne = ({ spaceTopClass, spaceBottomClass }) => {
    return (
        <div
            className={`testimonial-area ${spaceTopClass ? spaceTopClass : ""
                }  ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
            <div className="container">
                <div className="d-flex flex-row-reverse item-vegetable">
                    <div className="testimonial-active nav-style-1 nav-testi-style">
                        <h2 className="special-polyfood-title">
                            Thực phẩm chay Poly Food - Hương vị thanh tịnh
                        </h2>
                        <p>
                            Chào mừng bạn đến với Poly Food — Thế giới thực phẩm chay sạch và dinh dưỡng!
                            Chúng tôi mang đến những sản phẩm chay tươi ngon, an toàn, giàu dinh dưỡng, giúp bạn và gia đình có những bữa ăn thanh đạm, lành mạnh mỗi ngày.
                            Chọn Poly Food, chọn lối sống xanh — bắt đầu từ bữa ăn!
                        </p>
                        <div className="funfact-btn funfact-btn-green btn-hover text-left">
                            <Link to={process.env.PUBLIC_URL + "/contact"}>
                                Liên hệ ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

TestimonialOne.propTypes = {
    bgColorClass: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    spaceLeftClass: PropTypes.string,
    spaceRightClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
    testimonialClass: PropTypes.string,
};

export default TestimonialOne;
