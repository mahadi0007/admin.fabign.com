import {
  CreditCard,
  Grid,
  List,
  Plus,
  ShieldOff,
  Users,
  ChevronsDown,
  Umbrella,
  Tag,
  Phone,
  Airplay,
  PenTool,
  Aperture,
} from "react-feather";

// Dashboard
import Dashboard from "../pages/dashboard";

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

// Stock Management
import StockManagementIndex from "../pages/stock-management";

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
    ],
  },
];
