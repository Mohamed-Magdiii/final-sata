/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import {AiOutlineHome} from 'react-icons/ai';
import {FiChevronRight} from 'react-icons/fi';
import {FaUser} from 'react-icons/fa';
import {ImLocation} from 'react-icons/im';
import {MdOutlineProductionQuantityLimits} from 'react-icons/md';
import {BiCategoryAlt} from 'react-icons/bi';
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <AiOutlineHome />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/customer-page")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/customer-page">
              <span className="svg-icon menu-icon">
                  <FaUser className="fs-4"/>
              </span>
              <span className="menu-text">Customers</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("/categories")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/categories">
              <span className="svg-icon menu-icon">
                  <BiCategoryAlt className="fs-4"/>
              </span>
              <span className="menu-text">Category</span>
          </NavLink>
        </li>
       
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/products",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/products">
            <span className="svg-icon menu-icon">
            <MdOutlineProductionQuantityLimits className="fs-4"/>
            </span>
            <span className="menu-text">Products</span>
            <FiChevronRight className='text-muted mt-2' style={{fontSize: '1.2rem'}} />
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Products</span>
                </span>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/products"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/products-page">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">List</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/products"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/products-page/new">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Add</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
       < li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/country-page",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/shipping">
            <span className="svg-icon menu-icon">
                       
            <ImLocation className="fs-4"/>
 </span>
            <span className="menu-text">Shipping</span>
            <FiChevronRight className='text-muted mt-2' style={{fontSize: '1.2rem'}} />
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">shipping</span>
                </span>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/shipping"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/shipping/shipping-list">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">list</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/shipping"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/shipping/country-form">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">country</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/shipping"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/shipping/city-form">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">city</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/shipping"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/shipping/shipping-new">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">shipping</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-section ">
          <h4 className="menu-text">REPORT & ANALYTICS</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/e-commerce",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/e-commerce">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Warning-1-circle.svg")} />
            </span>
            <span className="menu-text">Report</span>
            <FiChevronRight className='text-muted mt-2' style={{fontSize: '1.2rem'}} />
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Report</span>
                </span>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/e-commerce/customers"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/e-commerce/customers">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Earning Report</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive(
                  "/e-commerce/products"
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/e-commerce/products">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Order Report</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </>
  );
}
