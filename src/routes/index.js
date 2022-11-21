import {
  Command,
  Database,
  Edit3,
  CreditCard,
  Grid,
  List,
  Plus,
  ShieldOff,
  Users,
  Disc,
  ChevronsDown,
  Umbrella,
  Tag,
  PhoneCall,
  Phone,
  Airplay,
  PenTool,
  Aperture,
} from "react-feather";

// Dashboard
import Dashboard from "../pages/dashboard";

// Category
import CategoryIndex from "../pages/category";
import CategoryStore from "../pages/category/store";
import CategoryEdit from "../pages/category/edit";
import CategoryShow from "../pages/category/show";

import CategoryIndex2 from "../pages/category2";
import CategoryStore2 from "../pages/category2/store";
import CategoryEdit2 from "../pages/category2/edit";
import CategoryShow2 from "../pages/category2/show";

// Sub-category
import SubCategoryIndex from "../pages/sub-category";
import SubCategoryStore from "../pages/sub-category/store";
import SubCategoryEdit from "../pages/sub-category/edit";
import SubCategoryShow from "../pages/sub-category/show";

import SubCategoryIndex2 from "../pages/sub-category2";
import SubCategoryStore2 from "../pages/sub-category2/store";
import SubCategoryEdit2 from "../pages/sub-category2/edit";
import SubCategoryShow2 from "../pages/sub-category2/show";

// Leaf category
import LeafCategoryIndex from "../pages/leaf_category";
import LeafCategoryStore from "../pages/leaf_category/store";

// Elements
import ElementsIndex from "../pages/elements";
import ElementsStore from "../pages/elements/store";
import ElementsEdit from "../pages/elements/edit";

import ElementsIndex2 from "../pages/elements2";
import ElementsStore2 from "../pages/elements2/store";
import ElementsEdit2 from "../pages/elements2/edit";
import ElementsShow2 from "../pages/elements2/show";

// Backside elements
import BacksideElementsIndex from "../pages/backside-elements";
import BacksideElementsStore from "../pages/backside-elements/store";
import BacksideElementsEdit from "../pages/backside-elements/edit";

import BacksideElementsIndex2 from "../pages/backside-elements2";
import BacksideElementsStore2 from "../pages/backside-elements2/store";
import BacksideElementsEdit2 from "../pages/backside-elements2/edit";
import BacksideElementsShow2 from "../pages/backside-elements2/show";

// Fabric
import FabricIndex from "../pages/fabric";
import FabricStore from "../pages/fabric/store";
import FabricEdit from "../pages/fabric/edit";

import FabricIndex2 from "../pages/fabric2";
import FabricStore2 from "../pages/fabric2/store";
import FabricEdit2 from "../pages/fabric2/edit";
import FabricShow2 from "../pages/fabric2/show";

// Size
import SizeIndex from "../pages/size";
import SizeStore from "../pages/size/store";
import SizeEdit from "../pages/size/edit";

// Colors
import ColorIndex from "../pages/fabriccolor/index";

// Types
import TypeIndex from "../pages/fabrictypes/index";

// Quality
import QualityIndex from "../pages/fabricquality/index";

// Measurement
import MeasurementIndex from "../pages/Measurement/index";
import MeasurementStore from "../pages/Measurement/store";
import MeasurementShow from "../pages/Measurement/show";

import MeasurementIndex2 from "../pages/measurement2/index";
import MeasurementStore2 from "../pages/measurement2/store";
import MeasurementShow2 from "../pages/measurement2/show";
import MeasurementEdit2 from "../pages/measurement2/edit";

// Button
import ButtonIndex from "../pages/button";
import ButtonStore from "../pages/button/store";
import ButtonEdit from "../pages/button/edit";

import ButtonIndex2 from "../pages/button2";
import ButtonStore2 from "../pages/button2/store";
import ButtonShow2 from "../pages/button2/show";
import ButtonEdit2 from "../pages/button2/edit";

import ButtonTypeIndex2 from "../pages/button-type2";
import ButtonTypeStore2 from "../pages/button-type2/store";
import ButtonTypeEdit2 from "../pages/button-type2/edit";
import ButtonTypeShow2 from "../pages/button-type2/show";

// Sub Button
import SubButtonIndex from "../pages/subbutton/index";

// Admin
import AdminIndex from "../pages/admin";
import AdminStore from "../pages/admin/store";
import AdminEdit from "../pages/admin/edit";
import AdminShow from "../pages/admin/show";

// User
import UserIndex from "../pages/user";
import UserStore from "../pages/user/store";
import UserEdit from "../pages/user/edit";
import UserShow from "../pages/user/show";

// SMS
import SendSMS from "../pages/send-sms";
import SMSTemplate from "../pages/sms-template";
import SMSTemplateStore from "../pages/sms-template/store";

// Role & Permission
import RoleIndex from "../pages/role";
import RoleStore from "../pages/role/store";
import RoleEdit from "../pages/role/edit";
import RoleShow from "../pages/role/show";

// E-commerce section

// E-Category
import ECategoryIndex from "../pages/e-category";
import ECategoryStore from "../pages/e-category/store";
import ECategoryEdit from "../pages/e-category/edit";

// E-Sub-Category
import ESubCategoryIndex from "../pages/e-sub-category";
import ESubCategoryStore from "../pages/e-sub-category/store";
import ESubCategoryEdit from "../pages/e-sub-category/edit";

// E-brand
import EBrandIndex from "../pages/e-brand";
import EBrandStore from "../pages/e-brand/store";
import EBrandEdit from "../pages/e-brand/edit";

// E-Products
import EProductsIndex from "../pages/e-products";
import EProductStore from "../pages/e-products/store";
import EProductEdit from "../pages/e-products/edit";
import EProductShow from "../pages/e-products/show";

// E-slider
import ESliderIndex from "../pages/e-slider";
import ESliderStore from "../pages/e-slider/store";
import ESliderEdit from "../pages/e-slider/edit";
import ESliderShow from "../pages/e-slider/show";

// E-banner
import EBannerIndex from "../pages/e-banner";
import EBannerEdit from "../pages/e-banner/edit";
import EBannerStore from "../pages/e-banner/store";
import EBannerShow from "../pages/e-banner/show";

// E-Order
import EOrderIndex from "../pages/e-order";
import EOrderStore from "../pages/e-order/store";
// import EOrderEdit from '../pages/e-order/edit';
import EOrderShow from "../pages/e-order/show";

// Tailoring-Order
import TailoringOrderIndex from "../pages/tailoring-order";
import TailoringOrderShow from "../pages/tailoring-order/show";

// Tailoring-Sample-Order
import TailoringSampleOrderIndex from "../pages/tailoring-sample-order";
import TailoringSampleOrderShow from "../pages/tailoring-sample-order/show";

// Variation
import VariationIndex from "../pages/variation";
import VariationStore from "../pages/variation/store";
import VariationEdit from "../pages/variation/edit";

// Add or Update shipping charge
import ShippingChargeAddUpdate from "../pages/shipping-charge/store";

// Topbar
import TopbarIndex from "../pages/topbar/index";
import TopBarStore from "../pages/topbar/store";
import TopBarEdit from "../pages/topbar/edit";
import TopBarShow from "../pages/topbar/show";

// Ecommerce Rating and Review Section
import ERating from "../pages/e-rating/index";
import ERatingShow from "../pages/e-rating/show";

// EFAQ Section
import EFAQ from "../pages/e-faq/index";
import EFAQSTORE from "../pages/e-faq/store";
import EFAQEDIT from "../pages/e-faq/edit";
import EFAQSHOW from "../pages/e-faq/show";

// EAdditionalInfo Section
import EAdditionalInfo from "../pages/e-additionalinfo";
import EAdditionalInfoStore from "../pages/e-additionalinfo/store";
import EAdditionalInfoEdit from "../pages/e-additionalinfo/edit";
import EAdditionalInfoShow from "../pages/e-additionalinfo/show";

// Report
import EOrderReport from "../pages/report/orderReport";
import ODPOrderReport from "../pages/report/odpOrderReport";

// Stock Management
import StockManagementIndex from "../pages/stock-management";

// Promotion Management
import PromotionManagementIndex from "../pages/promotion-management";

// Promo Tutorial Manage
import PromoTutorialIndex from "../pages/promo-tutorial-manage";
import PromoTutorialEdit from "../pages/promo-tutorial-manage/edit";
import PromoTutorialShow from "../pages/promo-tutorial-manage/show";

// Payout Info Manage
import PayoutInfoIndex from "../pages/payout-info";
import PayoutInfoEdit from "../pages/payout-info/edit";
import PayoutInfoShow from "../pages/payout-info/show";

// Balancing
import BalancingIndex from "../pages/balancing";

// Coupon Management
import CouponManagementIndex from "../pages/coupon-management/index";
import CouponManagementStore from "../pages/coupon-management/store";
import CouponManagementShow from "../pages/coupon-management/show";
import CouponManagementEdit from "../pages/coupon-management/edit";

export const routes = [
  // Dashboard
  {
    title: "Dashboard",
    name: "dashboard",
    path: "/dashboard/",
    exact: true,
    inDrawer: true,
    icon: <Grid size={16} />,
    component: Dashboard,
  },

  // Site Management
  {
    title: "Site Management",
    name: "site-management",
    inDrawer: true,
    icon: <ChevronsDown size={16} />,
    children: [
      // Top Bar Section
      {
        title: "Top Bar",
        name: "topbar",
        inDrawer: true,
        icon: <Plus size={16} />,
        children: [
          {
            title: "All Top Bar",
            name: "topbar",
            path: "/dashboard/topbar",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: TopbarIndex,
          },
          {
            title: "New Top bar",
            name: "topbar",
            path: "/dashboard/topbar/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: TopBarStore,
          },
          {
            title: "Edit Top bar",
            name: "topbar",
            path: "/dashboard/topbar/edit/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: TopBarEdit,
          },
          {
            title: "Show Top bar",
            name: "topbar",
            path: "/dashboard/topbar/show/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: TopBarShow,
          },
        ],
      },
      // Admin
      {
        title: "Admin",
        name: "admin",
        inDrawer: true,
        icon: <Users size={16} />,
        children: [
          {
            title: "All Admin",
            name: "admin",
            path: "/dashboard/admin",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: AdminIndex,
          },
          {
            title: "New Admin",
            name: "admin",
            path: "/dashboard/admin/create",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: AdminStore,
          },
          {
            title: "Edit Admin",
            name: "admin",
            path: "/dashboard/admin/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: AdminEdit,
          },
          {
            title: "Show Admin",
            name: "admin",
            path: "/dashboard/admin/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: AdminShow,
          },
        ],
      },
      // User
      {
        title: "User",
        name: "user",
        inDrawer: true,
        icon: <Users size={16} />,
        children: [
          {
            title: "All User",
            name: "user",
            path: "/dashboard/user",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: UserIndex,
          },
          {
            title: "New User",
            name: "user",
            path: "/dashboard/user/create",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: UserStore,
          },
          {
            title: "Edit User",
            name: "user",
            path: "/dashboard/user/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: UserEdit,
          },
          {
            title: "Show User",
            name: "user",
            path: "/dashboard/user/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: UserShow,
          },
        ],
      },
      // SMS
      {
        title: "SMS",
        name: "sms",
        inDrawer: true,
        icon: <Users size={16} />,
        children: [
          {
            title: "SMS Template",
            name: "user",
            path: "/dashboard/sms/sms-template",
            exact: true,
            inDrawer: true,
            icon: null,
            component: SMSTemplate,
          },
          {
            title: "Store SMS Template",
            name: "user",
            path: "/dashboard/sms/sms-template/store",
            exact: true,
            inDrawer: false,
            icon: null,
            component: SMSTemplateStore,
          },
          {
            title: "Send SMS",
            name: "send sms",
            path: "/dashboard/sms/send-sms",
            exact: true,
            inDrawer: true,
            icon: null,
            component: SendSMS,
          },
        ],
      },
      // Role and Permission
      {
        title: "Role & Permission",
        name: "role",
        inDrawer: true,
        icon: <ShieldOff size={16} />,
        children: [
          {
            title: "All Roles",
            name: "role index",
            path: "/dashboard/role",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: RoleIndex,
          },
          {
            title: "New Role",
            name: "role create",
            path: "/dashboard/role/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: RoleStore,
          },
          {
            title: "Edit Role",
            name: "role edit",
            path: "/dashboard/role/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: RoleEdit,
          },
          {
            title: "Show Role",
            name: "role show",
            path: "/dashboard/role/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: RoleShow,
          },
        ],
      },
    ],
  },

  // Online Tailoring 2
  {
    title: "Online Tailoring 2",
    name: "online-tailoring",
    inDrawer: true,
    icon: <ChevronsDown size={16} />,
    children: [
      // Category
      {
        title: "Category 2",
        name: "category2",
        inDrawer: true,
        icon: <CreditCard size={16} />,
        children: [
          {
            title: "All Category2",
            name: "category2",
            path: "/dashboard/category2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: CategoryIndex2,
          },
          {
            title: "New Category2",
            name: "category2",
            path: "/dashboard/category2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: CategoryStore2,
          },
          {
            title: "Edit Category2",
            name: "category2",
            path: "/dashboard/category2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: CategoryEdit2,
          },
          {
            title: "Show Category2",
            name: "category2",
            path: "/dashboard/category2/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: CategoryShow2,
          },
        ],
      },
      // Sub-Category
      {
        title: "Sub Category2",
        name: "sub-category2",
        inDrawer: true,
        icon: <CreditCard size={16} />,
        children: [
          {
            title: "All Sub Category 2",
            name: "sub-category2",
            path: "/dashboard/sub-category2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: SubCategoryIndex2,
          },
          {
            title: "New Sub-Category2",
            name: "sub-category2",
            path: "/dashboard/sub-category2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: SubCategoryStore2,
          },
          {
            title: "Edit Sub-Category2",
            name: "sub-category2",
            path: "/dashboard/sub-category2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: SubCategoryEdit2,
          },
          {
            title: "Show Sub-Category2",
            name: "sub-category2",
            path: "/dashboard/sub-category2/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: SubCategoryShow2,
          },
        ],
      },
      // Elements
      {
        title: "Elements 2",
        name: "element2",
        inDrawer: true,
        icon: <Database size={16} />,
        children: [
          {
            title: "All Elements 2",
            name: "element2",
            path: "/dashboard/elements2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ElementsIndex2,
          },
          {
            title: "New Element 2",
            name: "element2",
            path: "/dashboard/elements2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ElementsStore2,
          },
          {
            title: "Edit Elements",
            name: "element2",
            path: "/dashboard/elements2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ElementsEdit2,
          },
          {
            title: "Show Elements",
            name: "element2",
            path: "/dashboard/elements2/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ElementsShow2,
          },
        ],
      },
      // Backside elements
      {
        title: "Backside Elements 2",
        name: "backside-element2",
        inDrawer: true,
        icon: <Database size={16} />,
        children: [
          {
            title: "All Backside Elements 2",
            name: "backside-element2",
            path: "/dashboard/backside-elements2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: BacksideElementsIndex2,
          },
          {
            title: "New Backside Element2",
            name: "backside-element2",
            path: "/dashboard/backside-elements2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: BacksideElementsStore2,
          },
          {
            title: "Show Backside Element2",
            name: "backside-element2",
            path: "/dashboard/backside-elements2/show/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: BacksideElementsShow2,
          },
          {
            title: "Edit Backside Element2",
            name: "backside-element2",
            path: "/dashboard/backside-elements2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: BacksideElementsEdit2,
          },
        ],
      },
      // Fabric
      {
        title: "Fabric 2",
        name: "fabric2",
        inDrawer: true,
        icon: <Command size={16} />,
        children: [
          {
            title: "All Fabrics 2",
            name: "fabric2",
            path: "/dashboard/fabric2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: FabricIndex2,
          },
          {
            title: "Colors",
            name: "colors",
            path: "/dashboard/fabric2/color",
            exact: true,
            inDrawer: true,
            icon: <Command size={16} />,
            component: ColorIndex,
          },
          {
            title: "Types",
            name: "types",
            path: "/dashboard/fabric2/type",
            exact: true,
            inDrawer: true,
            icon: <Disc size={16} />,
            component: TypeIndex,
          },
          {
            title: "Quality",
            name: "qualities",
            path: "/dashboard/fabric2/quality",
            exact: true,
            inDrawer: true,
            icon: <Disc size={16} />,
            component: QualityIndex,
          },
          {
            title: "New Fabric2",
            name: "fabric2",
            path: "/dashboard/fabric2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: FabricStore2,
          },
          {
            title: "Edit Fabric2",
            name: "fabric2",
            path: "/dashboard/fabric2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: FabricEdit2,
          },
          {
            title: "Show Fabric2",
            name: "fabric2",
            path: "/dashboard/fabric2/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: FabricShow2,
          },
        ],
      },
      // button
      {
        title: "Button 2",
        name: "button2",
        inDrawer: true,
        icon: <Disc size={16} />,
        children: [
          {
            title: "All Button 2",
            name: "button2",
            path: "/dashboard/button2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ButtonIndex2,
          },
          {
            title: "New Button 2",
            name: "button2",
            path: "/dashboard/button2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ButtonStore2,
          },
          {
            title: "Edit Button 2",
            name: "button2",
            path: "/dashboard/button2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ButtonEdit2,
          },
          {
            title: "Show Button 2",
            name: "button2",
            path: "/dashboard/button2/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ButtonShow2,
          },
        ],
      },
      // button type
      {
        title: "Button Type 2",
        name: "button-type2",
        inDrawer: true,
        icon: <Disc size={16} />,
        children: [
          {
            title: "All Button Type 2",
            name: "button-type2",
            path: "/dashboard/buttontype2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ButtonTypeIndex2,
          },
          {
            title: "New Button Type 2",
            name: "button-type2",
            path: "/dashboard/buttontype2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ButtonTypeStore2,
          },
          {
            title: "Edit Button Type 2",
            name: "button-type2",
            path: "/dashboard/buttontype2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: ButtonTypeEdit2,
          },
          {
            title: "Show Button Type 2",
            name: "button-type2",
            path: "/dashboard/buttontype2/show/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: ButtonTypeShow2,
          },
        ],
      },
      // Size
      {
        title: "Profile Size",
        name: "profile",
        inDrawer: true,
        icon: <Edit3 size={16} />,
        children: [
          {
            title: "All Profile Size",
            name: "profile",
            path: "/dashboard/size",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: SizeIndex,
          },
          {
            title: "New Size",
            name: "profile",
            path: "/dashboard/size/store",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: SizeStore,
          },
          {
            title: "Edit Size",
            name: "profile",
            path: "/dashboard/size/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: SizeEdit,
          },
        ],
      },
      // Measurement
      {
        title: "Measurement 2",
        name: "measurement2",
        inDrawer: true,
        icon: <Edit3 size={16} />,
        children: [
          {
            title: "All Measurements 2",
            name: "measurement2",
            path: "/dashboard/measurement2",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: MeasurementIndex2,
          },
          {
            title: "New Size 2",
            name: "measurement2",
            path: "/dashboard/measurement2/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: MeasurementStore2,
          },
          {
            title: "Show Size 2",
            name: "measurement2",
            path: "/dashboard/measurement2/show/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: MeasurementShow2,
          },
          {
            title: "Edit Size 2",
            name: "measurement2",
            path: "/dashboard/measurement2/edit/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: MeasurementEdit2,
          },
        ],
      },
      // Tailoring Order
      {
        title: "Tailoring Order",
        name: "tailoring-orders",
        inDrawer: true,
        icon: <Edit3 size={16} />,
        children: [
          {
            title: "All Tailoring Order",
            name: "tailoring-orders",
            path: "/dashboard/tailoring-order",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: TailoringOrderIndex,
          },
          {
            title: "Show Tailoring Order",
            name: "tailoring-orders",
            path: "/dashboard/tailoring-order/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: TailoringOrderShow,
          },
        ],
      },
      // Tailoring Sample Order
      {
        title: "Tailoring Sample Order",
        name: "tailoring-sample-orders",
        inDrawer: true,
        icon: <Edit3 size={16} />,
        children: [
          {
            title: "All Tailoring Sample Order",
            name: "tailoring-sample-orders",
            path: "/dashboard/tailoring-sample-order",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: TailoringSampleOrderIndex,
          },
          {
            title: "Show Tailoring Sample Order",
            name: "tailoring-sample-orders",
            path: "/dashboard/tailoring-sample-order/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: TailoringSampleOrderShow,
          },
        ],
      },
    ],
  },

  // Online Tailoring
  {
    title: "Online Tailoring",
    name: "online-tailoring",
    inDrawer: true,
    icon: <ChevronsDown size={16} />,
    children: [
      // Category
      {
        title: "Category",
        name: "category",
        inDrawer: true,
        icon: <CreditCard size={16} />,
        children: [
          {
            title: "All Category",
            name: "category",
            path: "/dashboard/category",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: CategoryIndex,
          },
          {
            title: "New Category",
            name: "category",
            path: "/dashboard/category/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: CategoryStore,
          },
          {
            title: "Edit Category",
            name: "category",
            path: "/dashboard/category/:id/edit",
            exact: true,
            inDrawer: false,
            icon: null,
            component: CategoryEdit,
          },
          {
            title: "Show Category",
            name: "category show",
            path: "/dashboard/category/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: CategoryShow,
          },
        ],
      },
      // Sub-Category
      {
        title: "Sub Category",
        name: "sub-category",
        inDrawer: true,
        icon: <CreditCard size={16} />,
        children: [
          {
            title: "All Sub Category",
            name: "sub-category",
            path: "/dashboard/sub-category",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: SubCategoryIndex,
          },
          {
            title: "New Sub-Category",
            name: "sub-category",
            path: "/dashboard/sub-category/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: SubCategoryStore,
          },
          {
            title: "Edit Sub-Category",
            name: "sub-category",
            path: "/dashboard/sub-category/:id/edit",
            exact: true,
            inDrawer: false,
            icon: null,
            component: SubCategoryEdit,
          },
          {
            title: "Show Sub-Category",
            name: "sub-category",
            path: "/dashboard/sub-category/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: SubCategoryShow,
          },
        ],
      },
      // Leaf-Category
      {
        title: "Leaf Category",
        name: "leaf-category",
        inDrawer: true,
        icon: <CreditCard size={16} />,
        children: [
          {
            title: "All leaf category",
            name: "leaf-category",
            path: "/dashboard/leaf-category",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: LeafCategoryIndex,
          },
          {
            title: "New leaf category",
            name: "leaf-category",
            path: "/dashboard/leaf-category/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: LeafCategoryStore,
          },
        ],
      },
      // Elements
      {
        title: "Elements",
        name: "element",
        inDrawer: true,
        icon: <Database size={16} />,
        children: [
          {
            title: "All Elements",
            name: "element",
            path: "/dashboard/elements",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ElementsIndex,
          },
          {
            title: "New Element",
            name: "element",
            path: "/dashboard/elements/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ElementsStore,
          },
          {
            title: "Edit Elements",
            name: "element",
            path: "/dashboard/elements/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ElementsEdit,
          },
        ],
      },
      // Backside elements
      {
        title: "Backside Elements",
        name: "backside-element",
        inDrawer: true,
        icon: <Database size={16} />,
        children: [
          {
            title: "All Backside Elements",
            name: "backside-element",
            path: "/dashboard/backside-elements",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: BacksideElementsIndex,
          },
          {
            title: "New Backside Element",
            name: "backside-element",
            path: "/dashboard/backside-elements/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: BacksideElementsStore,
          },
          {
            title: "Edit Backside Elements",
            name: "backside-element",
            path: "/dashboard/backside-elements/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: BacksideElementsEdit,
          },
        ],
      },
      // Fabric
      {
        title: "Fabric",
        name: "fabric",
        inDrawer: true,
        icon: <Command size={16} />,
        children: [
          {
            title: "All Fabrics",
            name: "fabric",
            path: "/dashboard/fabric",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: FabricIndex,
          },
          {
            title: "Colors",
            name: "colors",
            path: "/dashboard/fabric/color",
            exact: true,
            inDrawer: true,
            icon: <Command size={16} />,
            component: ColorIndex,
          },
          {
            title: "Types",
            name: "types",
            path: "/dashboard/fabric/type",
            exact: true,
            inDrawer: true,
            icon: <Disc size={16} />,
            component: TypeIndex,
          },
          {
            title: "New Fabric",
            name: "fabric",
            path: "/dashboard/fabric/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: FabricStore,
          },
          {
            title: "Edit fabric",
            name: "fabric",
            path: "/dashboard/fabric/:id/edit",
            exact: true,
            inDrawer: false,
            icon: null,
            component: FabricEdit,
          },
        ],
      },
      // button
      {
        title: "Button",
        name: "button",
        inDrawer: true,
        icon: <Disc size={16} />,
        children: [
          {
            title: "All Button",
            name: "button",
            path: "/dashboard/button",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ButtonIndex,
          },
          {
            title: "All Sub Button",
            name: "sub-button",
            path: "/dashboard/subbutton",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: SubButtonIndex,
          },

          {
            title: "New Button",
            name: "button",
            path: "/dashboard/button/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ButtonStore,
          },
          {
            title: "Edit Button",
            name: "button",
            path: "/dashboard/button/:id/edit",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ButtonEdit,
          },
        ],
      },
      // Size
      {
        title: "Profile Size",
        name: "profile",
        inDrawer: true,
        icon: <Edit3 size={16} />,
        children: [
          {
            title: "All Profile Size",
            name: "profile",
            path: "/dashboard/size",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: SizeIndex,
          },
          {
            title: "New Size",
            name: "profile",
            path: "/dashboard/size/store",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: SizeStore,
          },
          {
            title: "Edit Size",
            name: "profile",
            path: "/dashboard/size/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: SizeEdit,
          },
        ],
      },
      // Measurement
      {
        title: "Measurement",
        name: "measurement",
        inDrawer: true,
        icon: <Edit3 size={16} />,
        children: [
          {
            title: "All Measurements",
            name: "measurement",
            path: "/dashboard/measurement",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: MeasurementIndex,
          },
          {
            title: "New Size",
            name: "measurement",
            path: "/dashboard/measurement/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: MeasurementStore,
          },
          {
            title: "Show Size",
            name: "measurement",
            path: "/dashboard/measurement/show/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: MeasurementShow,
          },
        ],
      },
    ],
  },

  // E-commerce
  {
    title: "E-commerce",
    name: "e-commerce",
    inDrawer: true,
    icon: <ChevronsDown size={16} />,
    children: [
      // E-Category
      {
        title: "E-Category",
        name: "e-category",
        inDrawer: true,
        icon: <CreditCard size={16} />,
        children: [
          {
            title: "All E-Category",
            name: "e-category",
            path: "/dashboard/e-category",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ECategoryIndex,
          },
          {
            title: "New E-Category",
            name: "e-category",
            path: "/dashboard/e-category/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ECategoryStore,
          },
          {
            title: "Edit E-Category",
            name: "e-category",
            path: "/dashboard/e-category/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ECategoryEdit,
          },
        ],
      },
      // E-Sub-Category
      {
        title: "E-Sub-Category",
        name: "e-sub-category",
        inDrawer: true,
        icon: <CreditCard size={16} />,
        children: [
          {
            title: "All E-Sub-Category",
            name: "e-sub-category",
            path: "/dashboard/e-sub-category",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ESubCategoryIndex,
          },
          {
            title: "New E-Sub-Category",
            name: "e-sub-category",
            path: "/dashboard/e-sub-category/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ESubCategoryStore,
          },
          {
            title: "Edit E-Sub-Category",
            name: "e-sub-category",
            path: "/dashboard/e-sub-category/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ESubCategoryEdit,
          },
        ],
      },
      // E-Brand
      {
        title: "E-Brand",
        name: "e-brand",
        inDrawer: true,
        icon: <Umbrella size={16} />,
        children: [
          {
            title: "All E-Brand",
            name: "e-brand",
            path: "/dashboard/e-brand",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: EBrandIndex,
          },
          {
            title: "New E-Brand",
            name: "e-brand",
            path: "/dashboard/e-brand/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: EBrandStore,
          },
          {
            title: "Edit E-Brand",
            name: "e-brand",
            path: "/dashboard/e-brand/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: EBrandEdit,
          },
        ],
      },
      // E-products
      {
        title: "E-Products",
        name: "e-product",
        inDrawer: true,
        icon: <Tag size={16} />,
        children: [
          {
            title: "All Products",
            name: "e-product",
            path: "/dashboard/e-products",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: EProductsIndex,
          },
          {
            title: "New Product",
            name: "e-product",
            path: "/dashboard/e-products/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: EProductStore,
          },
          {
            title: "Edit Product",
            name: "e-product",
            path: "/dashboard/e-products/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: EProductEdit,
          },
          {
            title: "Show Product",
            name: "e-product",
            path: "/dashboard/e-products/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: EProductShow,
          },
        ],
      },
      // E-Slider
      {
        title: "E-Slider",
        name: "e-slider",
        inDrawer: true,
        icon: <Airplay size={16} />,
        children: [
          {
            title: "All E-Slider",
            name: "e-slider",
            path: "/dashboard/e-slider",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ESliderIndex,
          },
          {
            title: "New E-Slider",
            name: "e-slider",
            path: "/dashboard/e-slider/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: ESliderStore,
          },
          {
            title: "Edit E-Slider",
            name: "e-slider",
            path: "/dashboard/e-slider/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ESliderEdit,
          },
          {
            title: "Edit E-Slider",
            name: "e-slider",
            path: "/dashboard/e-slider/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: ESliderShow,
          },
        ],
      },
      // E-Banner
      {
        title: "E-Banner",
        name: "e-banner",
        inDrawer: true,
        icon: <Airplay size={16} />,
        children: [
          {
            title: "All E-Banner",
            name: "e-banner",
            path: "/dashboard/e-banner",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: EBannerIndex,
          },
          {
            title: "New E-Banner",
            name: "e-banner",
            path: "/dashboard/e-banner/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: EBannerStore,
          },
          {
            title: "Edit E-Banner",
            name: "e-banner",
            path: "/dashboard/e-banner/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: EBannerEdit,
          },
          {
            title: "Show E-Banner",
            name: "e-banner",
            path: "/dashboard/e-banner/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: EBannerShow,
          },
        ],
      },
      // E-Order
      {
        title: "E-Order",
        name: "e-orders",
        inDrawer: true,
        icon: <PenTool size={16} />,
        children: [
          {
            title: "All E-Order",
            name: "e-orders",
            path: "/dashboard/e-order",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: EOrderIndex,
          },
          {
            title: "New E-Order",
            name: "e-orders",
            path: "/dashboard/e-order/store",
            exact: true,
            inDrawer: false,
            icon: null,
            component: EOrderStore,
          },
          {
            title: "Show E-Order",
            name: "e-orders",
            path: "/dashboard/e-order/show/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: EOrderShow,
          },
        ],
      },
      // E-Rating & Review
      {
        title: "E-Rating",
        name: "e-rating",
        inDrawer: true,
        icon: <PenTool size={16} />,
        children: [
          {
            title: "All E-Ratings",
            name: "e-rating",
            path: "/dashboard/e-rating",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: ERating,
          },
          {
            title: "Show E-Rating",
            name: "e-rating",
            path: "/dashboard/e-rating/show/:id",
            exact: true,
            inDrawer: false,
            icon: <List size={16} />,
            component: ERatingShow,
          },
        ],
      },
      // E-FAQ
      {
        title: "E-FAQ",
        name: "e-faq",
        inDrawer: true,
        icon: <PenTool size={16} />,
        children: [
          {
            title: "All E-FAQs",
            name: "e-faq",
            path: "/dashboard/e-FAQ",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: EFAQ,
          },
          {
            title: "Add E-FAQs",
            name: "e-faq",
            path: "/dashboard/e-FAQ/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: EFAQSTORE,
          },
          {
            title: "Edit E-FAQs",
            name: "e-faq",
            path: "/dashboard/e-FAQ/edit/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: EFAQEDIT,
          },
          {
            title: "Show E-FAQs",
            name: "e-faq",
            path: "/dashboard/e-FAQ/show/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: EFAQSHOW,
          },
        ],
      },
      // E-Additional Info
      {
        title: "E-AdditionalInfo",
        name: "e-additional-info",
        inDrawer: true,
        icon: <PenTool size={16} />,
        children: [
          {
            title: "All E-AdditionalInfos",
            name: "e-additional-info",
            path: "/dashboard/e-AdditionalInfo",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: EAdditionalInfo,
          },
          {
            title: "Add E-AdditionalInfos",
            name: "e-additional-info",
            path: "/dashboard/e-AdditionalInfo/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: EAdditionalInfoStore,
          },
          {
            title: "Edit E-AdditionalInfos",
            name: "e-additional-info",
            path: "/dashboard/e-AdditionalInfo/edit/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: EAdditionalInfoEdit,
          },
          {
            title: "Show E-AdditionalInfos",
            name: "e-additional-info",
            path: "/dashboard/e-AdditionalInfo/show/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: EAdditionalInfoShow,
          },
        ],
      },
      // Variation
      {
        title: "Variation",
        name: "variation",
        inDrawer: true,
        icon: <Aperture size={16} />,
        children: [
          {
            title: "All Variation",
            name: "variation",
            path: "/dashboard/variation",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: VariationIndex,
          },
          {
            title: "New Variation",
            name: "variation",
            path: "/dashboard/variation/store",
            exact: true,
            inDrawer: true,
            icon: <Plus size={16} />,
            component: VariationStore,
          },
          {
            title: "Edit Variation",
            name: "variation",
            path: "/dashboard/variation/edit/:id",
            exact: true,
            inDrawer: false,
            icon: null,
            component: VariationEdit,
          },
        ],
      },
      // Shipping Charge
      {
        title: "Shipping Charge",
        name: "shipping-charge",
        path: "/dashboard/shipping-charge",
        exact: true,
        inDrawer: true,
        icon: <Plus size={16} />,
        component: ShippingChargeAddUpdate,
      },
      // Stock Management
      {
        title: "Stock Management",
        name: "stock-management",
        path: "/dashboard/stock-management",
        exact: true,
        inDrawer: true,
        icon: <Phone size={16} />,
        component: StockManagementIndex,
      },
      // Coupon Management
      {
        title: "Coupon Management",
        name: "coupon-management",
        inDrawer: true,
        icon: <Phone size={16} />,
        children: [
          {
            title: "Coupon Management",
            name: "coupon-management",
            path: "/dashboard/coupon-management",
            exact: true,
            inDrawer: true,
            icon: <List size={16} />,
            component: CouponManagementIndex,
          },
          {
            title: "Coupon Management",
            name: "coupon-management",
            path: "/dashboard/coupon-management/store",
            exact: true,
            inDrawer: false,
            icon: <List size={16} />,
            component: CouponManagementStore,
          },
          {
            title: "Coupon Management",
            name: "coupon-management",
            path: "/dashboard/coupon-management/show/:id",
            exact: true,
            inDrawer: false,
            icon: <List size={16} />,
            component: CouponManagementShow,
          },
          {
            title: "Edit Coupon",
            name: "coupon-management",
            path: "/dashboard/coupon-management/edit/:id",
            exact: true,
            inDrawer: false,
            icon: <Plus size={16} />,
            component: CouponManagementEdit,
          },
        ],
      },
    ],
  },

  // Report
  {
    title: "Report",
    name: "report",
    inDrawer: true,
    icon: <Phone size={16} />,
    children: [
      {
        title: "All E-Order",
        name: "e-order index",
        path: "/dashboard/report/e-order",
        exact: true,
        inDrawer: true,
        icon: <List size={16} />,
        component: EOrderReport,
      },
      {
        title: "All ODP-Order",
        name: "odp-order index",
        path: "/dashboard/report/odp-order",
        exact: true,
        inDrawer: true,
        icon: <List size={16} />,
        component: ODPOrderReport,
      },
    ],
  },
];
