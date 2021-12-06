import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import CustomerPage from './pages/CustomerPage';
import Category from "./pages/Category";
import ProductsPage from "./pages/ProductsPage";
import ProductForm from "./pages/ProductForm";
import CountryForm from "./pages/shippingRegion/CountryForm";
import CityForm from "./pages/shippingRegion/CityForm";
import ShippingList from "./pages/shippingRegion/ShippingList";
import ShippingForm from "./pages/shippingRegion/ShippingForm";

// const ECommercePage = lazy(() =>
//   import("./modules/ECommerce/pages/eCommercePage")
// );
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <ContentRoute path="/customer-page" component={CustomerPage} />
        <ContentRoute path="/categories" component={Category} />
        <ContentRoute path="/products-page" exact component={ProductsPage} />
        <ContentRoute path="/products-page/new" exact component={ProductForm} />
        <ContentRoute path="/shipping/country-form" exact component={CountryForm} />
        <ContentRoute path="/shipping/city-form" exact component={CityForm} />
        <ContentRoute path="/shipping/shipping-list" exact component={ShippingList} />
        <ContentRoute path="/shipping/shipping-new" exact component={ShippingForm} />
        {/* <Route path="/google-material" component={GoogleMaterialPage} /> */}
        {/* <Route path="/react-bootstrap" component={ReactBootstrapPage} /> */}
        {/* <Route path="/e-commerce" component={ECommercePage} /> */}
        <Route path="/user-profile" component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
