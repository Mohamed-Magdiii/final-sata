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
        {/* <Route path="/google-material" component={GoogleMaterialPage} /> */}
        {/* <Route path="/react-bootstrap" component={ReactBootstrapPage} /> */}
        {/* <Route path="/e-commerce" component={ECommercePage} /> */}
        <Route path="/user-profile" component={UserProfilepage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
