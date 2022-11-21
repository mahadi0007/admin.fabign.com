import React, { useCallback, useEffect, useState } from "react";
import { MessageCircle, Check } from "react-feather";
import { useParams } from "react-router-dom";
import { DangerButton, PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Loader } from "../../components/loading";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";
import DeliveryInfoModal from "../../components/modal/deliveryInfo/Index";
import { ConfirmationModal } from "../../components/modal/Confirmation";
// import { OrderStatusModal } from "../../components/modal/OrderStatus";
import { StatusModal } from "../../components/modal/Status";
import { PathaoModal } from "../../components/modal/Pathao";
import { CommentsModal } from "../../components/modal/Comments";
import { DeleteModal, PrimaryModal } from "../../components/modal";
import { DataTable } from "../../components/table";
import "./style.scss";
import moment from "moment";
import jsPDF from "jspdf";
import { Toastify } from "../../components/toastify";

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [pathaoOrderStatus, setPathaoOrderStatus] = useState({
    show: false,
    response: "",
  });
  const [orderStatus, setOrderStatus] = useState({
    show: false,
    value: null,
    loading: false,
  });
  const [paymentStatus, setPaymentStatus] = useState({
    show: false,
    value: null,
    loading: false,
  });
  const [isCancelation, setCancelation] = useState({
    value: null,
    show: false,
    loading: false,
  });
  // const [isFollowUp, setFollowUp] = useState(false)
  const [city, setCity] = useState(null);
  const [zone, setZone] = useState(null);
  const [area, setArea] = useState(null);

  const dateFormate = (date) => {
    date = new Date(date);
    const cdate = date.toDateString();
    return cdate;
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    const response = await Requests.TailoringOrder.Show(id);
    if (response && response.data) {
      setItem(response.data.body);
      console.log(response.data.body);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  // Handle status action
  const handleStatusAction = async (data) => {
    const formData = {
      ...data,
      order: id,
      status: orderStatus.value,
    };

    console.log(orderStatus.value);

    setOrderStatus({ ...orderStatus, loading: true });
    // await Requests.EOrder.StoreComment(formData);
    await Requests.TailoringOrder.Update({ status: orderStatus.value }, id);

    fetchData();
    setOrderStatus({ loading: false, value: null, show: false });
  };

  const handlePathaoOrderCreate = async () => {
    console.log("handlePathaoOrderCreate");
    console.log(item.orderId);
    // await Requests.EOrder.Update({ status: orderStatus.value }, id);
    const response = await Requests.Pathao.CreateOrder({
      recipient_name: item.user.name,
      recipient_phone: item.phone,
      recipient_address: item.deliveryAddress,
      recipient_city: parseInt(city),
      recipient_zone: parseInt(zone),
      recipient_area: parseInt(area),
      item_quantity: parseInt(item.products.length),
      orderId: item.orderId,
    });
    console.log("response");
    console.log(response);
    setPathaoOrderStatus({ show: true, response: response.data.data });
    setOrderStatus({ loading: false, value: null, show: false });
  };

  // Handle payment status action
  const handlePaymentAction = async () => {
    setPaymentStatus({ ...paymentStatus, loading: true });
    await Requests.TailoringOrder.UpdatePaymentStatus(id, paymentStatus.value);
    fetchData();
    setPaymentStatus({ loading: false, value: null, show: false });
  };

  // // Handle follow up
  // const handleFollowUp = async () => {
  //     setFollowUp(true)
  //     await Requests.EOrder.UpdateFollowUp(id)
  //     fetchData()
  //     setFollowUp(false)
  // }

  // cancel specific item from order
  const onCancelItem = async () => {
    setCancelation({ ...isCancelation, loading: true });
    const formData = {
      orderId: id,
      product: isCancelation.value,
    };

    const response = await Requests.TailoringOrder.ItemCancelation(
      formData,
      id
    );
    fetchData();
    setCancelation({ value: null, show: false, loading: false });
  };

  // Styles for data column
  const customStyles = {
    rows: {
      style: {
        minHeight: "70px auto",
      },
    },
  };

  // Data columns for ordered products
  const columns = [
    {
      name: "Image",
      width: "70px",
      cell: (row) => (
        <img
          height={40}
          alt={"Product"}
          src={`${Requests.HostUrl + row.thumbnail}`}
        />
      ),
    },
    {
      name: "Name",
      sortable: true,
      minWidth: "250px",
      selector: (row) => (
        <div className="py-2">
          <p className="font-13 mb-2">{row?.id?.name || "N/A"}</p>
          <p className="font-13 mb-1">
            <strong>SKU: </strong>
            {row?.id?.sku || "N/A"}
          </p>
          <p className="font-13 mb-2">
            <strong>Brand: </strong>
            {row?.id?.brand?.title || "N/A"}
          </p>

          {item.status !== "Delivered" ? (
            <DangerButton
              style={{ padding: "5px 10px", fontSize: 13 }}
              className="btn-danger border-0"
              onClick={() =>
                setCancelation({ ...isCancelation, value: row, show: true })
              }
            >
              <b>Cancel Item</b>
            </DangerButton>
          ) : null}
        </div>
      ),
    },
    {
      name: "Variants",
      grow: 2,
      cell: (row) =>
        row.variants && row.variants.length ? (
          <div>
            {row.variants.map((item, i) => (
              <div className="mb-2">
                <p className="font-13 mb-0">
                  <strong>{item.title}: </strong>
                  {item.value}
                </p>
                <p className="font-13 mb-0">
                  <strong>SKU: </strong>
                  {item.sku}
                </p>
              </div>
            ))}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      name: (
        <span>
          Purchase <br /> Price
        </span>
      ),
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.purchasePrice} tk.</p>,
    },
    {
      name: "Sale Price",
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.salePrice} tk.</p>,
    },
    {
      name: "Quantity",
      sortable: true,
      cell: (row) => <p className="font-13 mb-0">{row.quantity}</p>,
    },
    // {
    //     name: "Discount",
    //     cell: row => row.discountAmount && row.discountType ?
    //         <div>
    //             <p className="font-13 mb-0">{row.discountAmount}{row.discountType === 'Flat' ? "tk." : "%"}</p>
    //         </div>
    //         : "N/A"
    // },
    // {
    //     name: "Sub-Total",
    //     cell: row => <p className="font-13 mb-0">{row.subTotal} tk.</p>
    // },
    // {
    //     name: "PO",
    //     cell: row =>
    //         item.status === 'Confirmed' ?
    //             <Link to={`/dashboard/order/${item._id}/purchase/${row.product}`}>
    //                 <PrimaryButton
    //                     style={{ padding: "5px 10px" }}
    //                     className="btn-primary border-0"
    //                 >
    //                     <Icon icon={info} size={18} />
    //                 </PrimaryButton>
    //             </Link>
    //             : null
    // }
  ];

  // Data columns for canceled products
  const canceledProductsColumns = [
    {
      name: "Image",
      width: "70px",
      cell: (row) => (
        <img
          height={40}
          alt={"Product"}
          src={`${Requests.HostUrl + row.thumbnail}`}
        />
      ),
    },
    {
      name: "Name",
      sortable: true,
      minWidth: "250px",
      selector: (row) => (
        <div className="py-2">
          <p className="font-13 mb-2">{row.id.name || "N/A"}</p>
          <p className="font-13 mb-1">
            <strong>SKU: </strong>
            {row.id.sku || "N/A"}
          </p>
          <p className="font-13 mb-2">
            <strong>Brand: </strong>
            {row.id.brand.title || "N/A"}
          </p>
        </div>
      ),
    },
    // {
    //     name: "Campaign",
    //     // selector: row => row.phone,
    //     sortable: true,
    //     minWidth: "130px"
    // },
    {
      name: "Variants",
      grow: 2,
      cell: (row) =>
        row.variants && row.variants.length ? (
          <div>
            {row.variants.map((item, i) => (
              <div className="mb-2">
                <p className="font-13 mb-0">
                  <strong>{item.title}: </strong>
                  {item.value}
                </p>
                <p className="font-13 mb-0">
                  <strong>SKU: </strong>
                  {item.sku}
                </p>
              </div>
            ))}
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      name: (
        <span>
          Purchase <br /> Price
        </span>
      ),
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.purchasePrice} tk.</p>,
    },
    {
      name: "Sale Price",
      sortable: true,
      minWidth: "100px",
      cell: (row) => <p className="font-13 mb-0">{row.salePrice} tk.</p>,
    },
    {
      name: "Quantity",
      sortable: true,
      cell: (row) => <p className="font-13 mb-0">{row.quantity}</p>,
    },
    {
      name: "Discount",
      cell: (row) =>
        row.discountAmount && row.discountType ? (
          <div>
            <p className="font-13 mb-0">
              {row.discountAmount}
              {row.discountType === "Flat" ? "tk." : "%"}
            </p>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      name: "Sub-Total",
      cell: (row) => <p className="font-13 mb-0">{row.subTotal} tk.</p>,
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="View Order"
        subTitle="View your order details"
        tag="Home / E-commerce / Order /"
        pageTag="View Order"
      />

      <Container.Row>
        <ul className="progress-tracker progress-tracker--text progress-tracker--center">
          <li
            className={
              item.orderStatus.some((el) => el.status === "Order Received")
                ? "progress-step is-complete"
                : "progress-step"
            }
          >
            <div className="progress-marker" style={{ margin: "0 auto" }}>
              <Check size={20} />
            </div>
            <div className="progress-text">
              <p className="progress-title fw-bold">Order received</p>
              {item.orderStatus.some(
                (el) => el.status === "Order Received"
              ) && (
                <p>
                  {moment(
                    item.orderStatus.find(
                      (el) => el.status === "Order Received"
                    ).time
                  ).format("hh:mm A, DD MMM YYYY")}
                </p>
              )}
            </div>
          </li>

          <li
            className={
              item.orderStatus.some((el) => el.status === "Processing Order")
                ? "progress-step is-complete"
                : "progress-step"
            }
          >
            <div className="progress-marker" style={{ margin: "0 auto" }}>
              <Check size={20} />
            </div>
            <div className="progress-text">
              <p className="progress-title fw-bold">Processing Order</p>
              {item.orderStatus.some(
                (el) => el.status === "Processing Order"
              ) && (
                <p>
                  {moment(
                    item.orderStatus.find(
                      (el) => el.status === "Processing Order"
                    ).time
                  ).format("hh:mm A, DD MMM YYYY")}
                </p>
              )}
            </div>
          </li>

          {/* <li className="progress-step is-active" aria-current="step"> */}
          <li
            className={
              item.orderStatus.some(
                (el) => el.status === "Handed over to Courier"
              )
                ? "progress-step is-complete"
                : "progress-step"
            }
            aria-current="step"
          >
            <div className="progress-marker" style={{ margin: "0 auto" }}>
              <Check size={20} />
            </div>
            <div className="progress-text">
              <p className="progress-title fw-bold">Out for Delivery</p>
              {item.orderStatus.some(
                (el) => el.status === "Handed over to Courier"
              ) && (
                <p>
                  {moment(
                    item.orderStatus.find(
                      (el) => el.status === "Handed over to Courier"
                    ).time
                  ).format("hh:mm A, DD MMM YYYY")}
                </p>
              )}
            </div>
          </li>

          <li
            className={
              item.orderStatus.some((el) => el.status === "Delivery by Pathao")
                ? "progress-step is-complete"
                : "progress-step"
            }
          >
            <div className="progress-marker" style={{ margin: "0 auto" }}>
              <Check size={20} />
            </div>
            <div className="progress-text">
              <p className="progress-title fw-bold">Delivery by Pathao</p>
              {item.orderStatus.some(
                (el) => el.status === "Delivery by Pathao"
              ) && (
                <>
                  <p>
                    {moment(
                      item.orderStatus.find(
                        (el) => el.status === "Delivery by Pathao"
                      ).time
                    ).format("hh:mm A, DD MMM YYYY")}
                  </p>
                  <p>#DE230622734HCC</p>
                </>
              )}
            </div>
          </li>

          <li
            className={
              item.orderStatus.some((el) => el.status === "Delivery by RedX")
                ? "progress-step is-complete"
                : "progress-step d-none"
            }
          >
            <div className="progress-marker" style={{ margin: "0 auto" }}>
              <Check size={20} />
            </div>
            <div className="progress-text">
              <p className="progress-title fw-bold">Delivery by RedX</p>
              {item.orderStatus.some(
                (el) => el.status === "Delivery by RedX"
              ) && (
                <>
                  <p>
                    {moment(
                      item.orderStatus.find(
                        (el) => el.status === "Delivery by RedX"
                      ).time
                    ).format("hh:mm A, DD MMM YYYY")}
                  </p>
                  <p>#DE230622734HCC</p>
                </>
              )}
            </div>
          </li>

          <li
            className={
              item.orderStatus.some((el) => el.status === "Delivered")
                ? "progress-step is-complete"
                : "progress-step"
            }
          >
            <div className="progress-marker" style={{ margin: "0 auto" }}>
              <Check size={20} />
            </div>
            <div className="progress-text">
              <p className="progress-title fw-bold">Complete Order</p>
              {item.orderStatus.some((el) => el.status === "Delivered") && (
                <p>
                  {moment(
                    item.orderStatus.find((el) => el.status === "Delivered")
                      .time
                  ).format("hh:mm A, DD MMM YYYY")}
                </p>
              )}
            </div>
          </li>
        </ul>
      </Container.Row>

      {/* Order Creator Info Container */}
      <Container.Row>
        {/* Order Info Container */}
        <Container.Column className="col-padding">
          <Card.Simple className="shadow-sm border-0">
            <Card.Body>
              <Container.Row>
                {/* Order Information */}
                <Container.Column className="col-md-6 col-xl-4">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Date</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            :{" "}
                            {item.createdAt
                              ? dateFormate(item.createdAt)
                              : "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Order Id</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.orderId || "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Order status</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            :{" "}
                            {item.orderStatus.reduce(function (prev, current) {
                              return prev.time > current.time ? prev : current;
                            }).status || "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Payment Type</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.paymentMethod || "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Partial Paid Amount</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.paymentAmount ? item.paymentAmount : 0} Tk
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Paid Method</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.PaidMethod ? item.PaidMethod : "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Currency</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            :{" "}
                            {item.transaction
                              ? item.transaction.currency
                              : "N/A"}
                          </Text>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Container.Column>

                {/* Customer & Address */}
                <Container.Column className="col-md-6 col-xl-5">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Transaction ID</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.transactionId ? item.transactionId : "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Post Code</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.postCode || "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Delivery address</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.deliveryAddress || "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Delivery charge</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            :{" "}
                            {item.deliveryCharge
                              ? item.deliveryCharge + " Tk."
                              : "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Customer</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.name || "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Phone</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.phone || "N/A"}
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={styles.tdMd}>
                          <h6 className="mb-0">Email</h6>
                        </td>
                        <td>
                          <Text className="fs-15 mb-0">
                            : {item.email || "N/A"}
                          </Text>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Container.Column>

                {/* Order Actions */}
                <Container.Column className="col-md-6 col-xl-3">
                  {/* Order Status */}
                  <div className="form-group change-status mb-2">
                    <h6 className="mb-1">
                      <i>Order Status</i>
                    </h6>
                    {item.orderStatus && (
                      <select
                        style={{ width: 165, fontSize: 13, height: 42 }}
                        className="form-control shadow-none"
                        defaultValue={
                          item.orderStatus.reduce(function (prev, current) {
                            return prev.time > current.time ? prev : current;
                          }).status
                        }
                        onChange={(event) => {
                          const value = event.target.value;
                          if (
                            value === "Delivery by Pathao" ||
                            value === "Delivery by RedX"
                          ) {
                            if (
                              item.orderStatus.some(
                                (el) => el.status === "Order Received"
                              ) &&
                              item.orderStatus.some(
                                (el) => el.status === "Processing Order"
                              ) &&
                              item.orderStatus.some(
                                (el) => el.status === "Handed over to Courier"
                              )
                            ) {
                              setOrderStatus({
                                ...orderStatus,
                                show: true,
                                value,
                              });
                            } else {
                              Toastify.Error(
                                "You must complete the previous step"
                              );
                            }
                          } else {
                            setOrderStatus({
                              ...orderStatus,
                              show: true,
                              value,
                            });
                          }
                        }}
                      >
                        <option value="Order Received">Order Received</option>
                        <option value="Processing Order">
                          Processing Order
                        </option>
                        <option value="Handed over to Courier">
                          Handed over to Courier
                        </option>
                        <option value="Delivery by Pathao">
                          Delivery by Pathao
                        </option>
                        <option value="Delivery by RedX">
                          Delivery by RedX
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Returned">Returned</option>
                        <option value="Exchanged">Exchanged</option>
                      </select>
                    )}
                  </div>

                  {/* Payment Status */}
                  <div className="form-group change-status mb-2">
                    <h6 className="mb-1">
                      <i>Payment Status</i>
                    </h6>
                    {item.paymentStatus && (
                      <select
                        style={{ width: 165, fontSize: 13, height: 42 }}
                        className="form-control shadow-none"
                        defaultValue={item.paymentStatus}
                        onChange={(event) =>
                          setPaymentStatus({
                            ...orderStatus,
                            show: true,
                            value: event.target.value,
                          })
                        }
                      >
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="ready to refund">Ready To Refund</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    )}
                  </div>

                  {/* Comments View */}
                  <div className="mb-2">
                    <PrimaryButton
                      className="border-0"
                      style={{ padding: "10px 22px", fontSize: 13, width: 165 }}
                      onClick={() => setShowComment(true)}
                    >
                      <MessageCircle size={20} /> View Comments
                    </PrimaryButton>
                  </div>

                  {/* Delivery Info */}
                  {item.status === "Handed Over to Courier" ? (
                    <PrimaryButton
                      className="btn-primary border-0"
                      style={{ padding: "11px 28px", fontSize: 13, width: 165 }}
                      onClick={() => setShow(true)}
                    >
                      Send Delivery Info
                    </PrimaryButton>
                  ) : null}
                </Container.Column>
              </Container.Row>
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </Container.Row>

      {/* Coupon Info */}
      {item.isCouponApplied &&
        item.couponInfo &&
        Object.keys(item.couponInfo).length > 0 && (
          <Container.Row>
            <Container.Column className="col-padding">
              <Card.Simple className="bg-white border-0 shadow-sm">
                <Card.Body>
                  <h6 className="text-muted fw-bolder font-14 mb-2">
                    Uses coupon
                  </h6>
                  <p className="font-13 mb-1">
                    <span className="text-muted">Coupon code:</span>{" "}
                    {item.couponInfo.code}
                  </p>
                  <p className="font-13 mb-1">
                    <span className="text-muted">Discount in price:</span>{" "}
                    {item.couponInfo.amount}
                    {item.couponInfo.type === "Flat" ? "tk." : "%"}
                  </p>
                  {/* <p className="font-13 mb-2"><span className="text-muted">Discount in shipping (Dhaka):</span> {item.couponInfo.insideDhaka} tk.</p>
                    <p className="font-13 mb-0"><span className="text-muted">Discount in shipping (Outside Dhaka):</span> {item.couponInfo.outsideDhaka} tk.</p> */}
                </Card.Body>
              </Card.Simple>
            </Container.Column>
          </Container.Row>
        )}

      {/* Created By & Calculations Container */}
      <Container.Row>
        {/* Created By */}
        <Container.Column className="col-md-6 col-padding pr-md-2">
          <Card.Simple className="border-0">
            <Card.Header className="bg-white border-0 p-4">
              <h6 className="mb-0">Created By</h6>
            </Card.Header>
            <Card.Body className="pt-2">
              <table className="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <td style={styles.tdSm}>
                      <h6 className="mb-0">Name</h6>
                    </td>
                    <td>
                      <p className="fs-15 mb-0">
                        : {item.user ? item.user.name : "N/A"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tdSm}>
                      <h6 className="mb-0">E-mail</h6>
                    </td>
                    <td>
                      <p className="fs-15 mb-0">
                        : {item.user ? item.user.email : "N/A"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tdSm}>
                      <h6 className="mb-0">Phone</h6>
                    </td>
                    <td>
                      <p className="fs-15 mb-0">
                        : {item.user ? item.user.phone : "N/A"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tdSm}>
                      <h6 className="mb-0">Role</h6>
                    </td>
                    <td>
                      <p className="fs-15 mb-0">
                        : {item.role ? item.role : "Customer"}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card.Simple>
        </Container.Column>

        {/* Calculations */}
        <Container.Column className="col-md-6 ps-md-0">
          <Container.Row>
            <div className="col-6">
              <Card.Simple
                className="border-0 m-2"
                style={{ background: "none" }}
              >
                <Card.Body className="text-center bg-white py-4">
                  <h5 className="mb-1">{item.subTotalPrice || 0} tk.</h5>
                  <p className="text-muted mb-0">Sub-Total</p>
                </Card.Body>
              </Card.Simple>
            </div>
            <div className="col-6">
              <Card.Simple
                className="border-0 m-2"
                style={{ background: "none" }}
              >
                <Card.Body className="text-center bg-white py-4">
                  <h5 className="mb-1">{item.deliveryCharge || 0} tk.</h5>
                  <p className="mb-0">Delivery Charge</p>
                </Card.Body>
              </Card.Simple>
            </div>
            <div className="col-6">
              <Card.Simple
                className="border-0 m-2"
                style={{ background: "none" }}
              >
                <Card.Body className="text-center bg-white py-4">
                  <h5 className="mb-1">{item.totalPrice || 0} tk.</h5>
                  <p className="mb-0">Total Price</p>
                </Card.Body>
              </Card.Simple>
            </div>
            <div className="col-6">
              <Card.Simple
                className="border-0 m-2"
                style={{ background: "none" }}
              >
                <Card.Body className="text-center bg-white py-4">
                  <h5 className="mb-1">{item.customerPayable || 0} tk.</h5>
                  <p className="mb-0">Customer Payable</p>
                </Card.Body>
              </Card.Simple>
            </div>
          </Container.Row>
        </Container.Column>
      </Container.Row>

      {/* Ordered & Canceled Products */}
      <Container.Row>
        {/* Ordered Products */}
        <Container.Column className="col-padding">
          <Card.Simple className="border-0">
            <Card.Header className="bg-white border-0 pl-3 pt-3 pb-0">
              <h6 className="mb-0">Ordered Products</h6>
            </Card.Header>
            <Card.Body className="p-0">
              <DataTable
                fixedHeader
                fixedHeaderScrollHeight="580px"
                customStyles={customStyles}
                columns={columns}
                data={item.products}
                loading={isLoading}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>

        {/* Canceled Products */}
        <Container.Column className="col-padding">
          <Card.Simple className="border-0">
            <Card.Header className="bg-white border-0 pl-3 pt-3 pb-0">
              <h6 className="mb-0">Canceled Products</h6>
            </Card.Header>
            <Card.Body className="p-0">
              <DataTable
                fixedHeader
                fixedHeaderScrollHeight="580px"
                customStyles={customStyles}
                columns={canceledProductsColumns}
                data={item.canceledProducts}
                loading={isLoading}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </Container.Row>

      {/* Follow-Up float button */}
      {/* <PrimaryButton
                className="btn-float"
                disabled={isFollowUp}
                onClick={handleFollowUp}
            >
                {item.followUp ? <Bell size={25} /> : <BellOff size={25} />}
            </PrimaryButton> */}

      {/* Send delivery info modal */}
      {show && (
        <DeliveryInfoModal
          show={show}
          reciver={item.phone}
          onHide={() => setShow(false)}
        />
      )}

      {/* Order status modal */}
      {orderStatus.show && orderStatus.value !== "Delivery by Pathao" && (
        // <OrderStatusModal
        <StatusModal
          show={orderStatus.show}
          loading={orderStatus.loading}
          status={orderStatus.value}
          onHide={() =>
            setOrderStatus({ ...orderStatus, show: false, value: null })
          }
          handleAction={(data) => handleStatusAction(data)}
        />
      )}
      {orderStatus.show && orderStatus.value === "Delivery by Pathao" && (
        <PathaoModal
          show={orderStatus.show}
          loading={orderStatus.loading}
          status={orderStatus.value}
          setCity={setCity}
          setZone={setZone}
          setArea={setArea}
          onHide={() =>
            setOrderStatus({ ...orderStatus, show: false, value: null })
          }
          handleAction={handlePathaoOrderCreate}
        />
      )}

      {/* Payment status modal */}
      {paymentStatus.show && (
        <ConfirmationModal
          show={paymentStatus.show}
          loading={paymentStatus.loading}
          message={<h6 className="mb-0">You want to change payment status.</h6>}
          onHide={() =>
            setPaymentStatus({ ...paymentStatus, show: false, value: null })
          }
          doDelete={handlePaymentAction}
        />
      )}

      {/* Comments preview modal */}
      {showComment && (
        <CommentsModal
          orderId={id}
          show={showComment}
          onHide={() => setShowComment(false)}
        />
      )}

      {/* Cancel item confirmation modal */}
      {isCancelation.value && isCancelation.show ? (
        <DeleteModal
          show={isCancelation.show}
          loading={isCancelation.loading}
          message={
            <div>
              <h6 className="mb-2">Want to cancel this item from order?</h6>
              <img
                src={`${Requests.HostUrl + isCancelation.value.thumbnail}`}
                height={40}
                alt={"Product"}
                className="img-Simple"
              />
            </div>
          }
          doDelete={onCancelItem}
          onHide={() =>
            setCancelation({ value: null, show: false, loading: false })
          }
        />
      ) : null}

      {pathaoOrderStatus.show && (
        <PrimaryModal
          title="Order Modal"
          show={pathaoOrderStatus.show}
          size="md"
          onHide={() => setPathaoOrderStatus({ show: false, response: "" })}
        >
          <div>
            {pathaoOrderStatus.response ? (
              <>
                {pathaoOrderStatus.response.code === 200 ? (
                  <p className="fw-bold text-success">
                    {pathaoOrderStatus.response.message}
                  </p>
                ) : (
                  <p className="fw-bold text-danger">
                    {pathaoOrderStatus.response.message}
                  </p>
                )}
                {pathaoOrderStatus.response.data.consignment_id && (
                  <p>
                    <strong>Consignment Id: </strong>
                    {pathaoOrderStatus.response.data.consignment_id}
                  </p>
                )}
                {pathaoOrderStatus.response.data.merchant_order_id && (
                  <p>
                    <strong>Merchant Order Id: </strong>
                    {pathaoOrderStatus.response.data.merchant_order_id}
                  </p>
                )}
                {pathaoOrderStatus.response.data.delivery_fee && (
                  <p>
                    <strong>Delivery Fee: </strong>
                    {pathaoOrderStatus.response.data.delivery_fee}
                  </p>
                )}
                {pathaoOrderStatus.response.data.order_status && (
                  <p>
                    <strong>Order Status: </strong>
                    {pathaoOrderStatus.response.data.order_status}
                  </p>
                )}
              </>
            ) : (
              <>
                <p>Order cannot create</p>
              </>
            )}
          </div>
        </PrimaryModal>
      )}
    </div>
  );
};

export default Show;

const styles = {
  tdSm: { width: 60 },
  tdMd: { width: 130 },
};
