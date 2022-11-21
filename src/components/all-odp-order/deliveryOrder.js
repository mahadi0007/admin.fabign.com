import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import { Eye } from "react-feather";
import { SuccessButton } from "../button";
import { DatePicker } from "../datePicker/Index";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { Toastify } from "../toastify";
import { DataTable } from "../table";
import { Loader } from "../loading";
import { CustomError } from "../../utils/error";
import { Text } from "../text";
import { Card } from "../card";
import { Requests } from "../../utils/http";

const DeliveryOrder = forwardRef((props, ref) => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [searchLoading, setsearchLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useImperativeHandle(ref, () => ({
    dateClear() {
      setDate(null);
      setToDate(null);
      if (tableRef.current) {
        tableRef.current.searchValueClear();
      }
    },
  }));

  // fetch delivery order data
  const fetchDeliveryODPOrder = useCallback(
    async (page) => {
      try {
        if (
          document.getElementById("search").value &&
          document.getElementById("startDate").value &&
          document.getElementById("endDate").value
        ) {
          setLoading(true);
          const response =
            await Requests.ODPOrder.DeliveryFilterByFromToDateWithSearch(
              dateYearFormat(document.getElementById("startDate").value),
              dateYearFormat(document.getElementById("endDate").value),
              document.getElementById("search").value,
              page,
              limit
            );
          if (response && response.data && response.data.body) {
            setData(response.data.body.order);
            setTotalRows(response.data.body.total);
            if (props.setDataValue) {
              props.setDataValue(
                response.data.body.newOrder,
                response.data.body.pendingOrder,
                response.data.body.deliveryOrder,
                response.data.body.cancelledOrder,
                response.data.body.confirmedOrder
              );
            }
          }
          setLoading(false);
        } else if (
          document.getElementById("startDate").value &&
          document.getElementById("endDate").value
        ) {
          setLoading(true);
          const response = await Requests.ODPOrder.DeliveryFilterByFromToDate(
            dateYearFormat(document.getElementById("startDate").value),
            dateYearFormat(document.getElementById("endDate").value),
            page,
            limit
          );
          if (response && response.data && response.data.body) {
            setData(response.data.body.order);
            setTotalRows(response.data.body.total);
            if (props.setDataValue) {
              props.setDataValue(
                response.data.body.newOrder,
                response.data.body.pendingOrder,
                response.data.body.deliveryOrder,
                response.data.body.cancelledOrder,
                response.data.body.confirmedOrder
              );
            }
          }
          setLoading(false);
        } else {
          setLoading(true);
          const response = await Requests.ODPOrder.DeliveryIndex(page, limit);
          if (response && response.data && response.data.body) {
            setData(response.data.body.order);
            setTotalRows(response.data.body.total);
            if (props.setDataValue) {
              props.setDataValue(
                response.data.body.newOrder,
                response.data.body.pendingOrder,
                response.data.body.deliveryOrder,
                response.data.body.cancelledOrder,
                response.data.body.confirmedOrder
              );
            }
          }
          setLoading(false);
        }
        setCurrentPage(page);
      } catch (error) {
        if (error) {
          setLoading(false);
          if (error.response) {
            await CustomError(error.response);
          } else {
            Toastify.Error("Something going wrong.");
          }
        }
      }
    },
    [currentPage, limit]
  );

  useEffect(() => {
    fetchDeliveryODPOrder(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchDeliveryODPOrder(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    if (
      document.getElementById("search").value &&
      document.getElementById("startDate").value &&
      document.getElementById("endDate").value
    ) {
      setLoading(true);
      const response =
        await Requests.ODPOrder.DeliveryFilterByFromToDateWithSearch(
          dateYearFormat(document.getElementById("startDate").value),
          dateYearFormat(document.getElementById("endDate").value),
          document.getElementById("search").value,
          page,
          newPerPage
        );
      setData(response.data.body.order);
      setLimit(newPerPage);
      setLoading(false);
    } else if (
      document.getElementById("startDate").value &&
      document.getElementById("endDate").value
    ) {
      setLoading(true);
      const response = await Requests.ODPOrder.DeliveryFilterByFromToDate(
        dateYearFormat(document.getElementById("startDate").value),
        dateYearFormat(document.getElementById("endDate").value),
        page,
        newPerPage
      );
      setData(response.data.body.order);
      setLimit(newPerPage);
      setLoading(false);
    } else {
      setLoading(true);
      const response = await Requests.ODPOrder.DeliveryIndex(page, newPerPage);
      setData(response.data.body.order);
      setLimit(newPerPage);
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (data) => {
    if (data) {
      if (
        document.getElementById("startDate").value &&
        document.getElementById("endDate").value
      ) {
        setsearchLoading(true);
        const response =
          await Requests.ODPOrder.DeliveryFilterByFromToDateWithSearch(
            dateYearFormat(document.getElementById("startDate").value),
            dateYearFormat(document.getElementById("endDate").value),
            data,
            1,
            limit
          );
        if (response && response.data && response.data.body) {
          setData(response.data.body.order);
          setTotalRows(response.data.body.total);
          if (props.setDataValue) {
            props.setDataValue(
              response.data.body.newOrder,
              response.data.body.pendingOrder,
              response.data.body.deliveryOrder,
              response.data.body.cancelledOrder,
              response.data.body.confirmedOrder
            );
          }
        }
        setsearchLoading(false);
      } else {
        setsearchLoading(true);
        const response = await Requests.ODPOrder.SearchDeliveryIndex(data);
        if (response.data) {
          setData(response.data.body.order);
          if (props.setDataValue) {
            props.setDataValue(
              response.data.body.newOrder,
              response.data.body.pendingOrder,
              response.data.body.deliveryOrder,
              response.data.body.cancelledOrder,
              response.data.body.confirmedOrder
            );
          }
        }
        setsearchLoading(false);
      }
    } else {
      fetchDeliveryODPOrder(1);
    }
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.ODPOrder.SearchDeliveryIndex(value);
    if (
      response &&
      response.data.body &&
      response.data.body &&
      response.data.body.order &&
      response.data.body.order.length
    ) {
      for (let i = 0; i < response.data.body.order.length; i++) {
        const element = response.data.body.order[i];
        data.results.push(element.orderId);
      }
    } else {
      data.message = "No results found";
    }
    return data;
  };

  // Date Year Format yyyy/mm/dd
  const dateYearFormat = (date) => {
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const yearDate = year + "-" + month + "-" + day;
    return yearDate;
  };

  // filter by start date
  const handleStartDateFilter = async (data) => {
    if (toDate !== null) {
      if (document.getElementById("search").value) {
        try {
          setLoading(true);
          const response =
            await Requests.ODPOrder.DeliveryFilterByFromToDateWithSearch(
              dateYearFormat(date),
              dateYearFormat(data),
              document.getElementById("search").value,
              1,
              limit
            );
          if (response && response.status && response.status === 200) {
            setData(response.data.body.order);
            setTotalRows(response.data.body.total);
            if (props.setDataValue) {
              props.setDataValue(
                response.data.body.newOrder,
                response.data.body.pendingOrder,
                response.data.body.deliveryOrder,
                response.data.body.cancelledOrder,
                response.data.body.confirmedOrder
              );
            }
          }
          setLoading(false);
        } catch (error) {
          if (error) {
            console.log(error);
          }
        }
      } else {
        if (data) {
          try {
            setLoading(true);
            const response = await Requests.ODPOrder.DeliveryFilterByFromToDate(
              dateYearFormat(data),
              dateYearFormat(toDate),
              1,
              limit
            );
            if (response && response.status && response.status === 200) {
              setData(response.data.body.order);
              setTotalRows(response.data.body.total);
              if (props.setDataValue) {
                props.setDataValue(response.data.body.order);
              }
            }
            setLoading(false);
          } catch (error) {
            if (error) {
              console.log(error);
            }
          }
        } else {
          fetchDeliveryODPOrder(1);
        }
      }
    } else {
      fetchDeliveryODPOrder(1);
    }
  };

  // filter by end date
  const handleEndDateFilter = async (data) => {
    if (date !== null) {
      if (document.getElementById("search").value) {
        try {
          setLoading(true);
          const response =
            await Requests.ODPOrder.DeliveryFilterByFromToDateWithSearch(
              dateYearFormat(date),
              dateYearFormat(data),
              document.getElementById("search").value,
              1,
              limit
            );
          if (response && response.status && response.status === 200) {
            setData(response.data.body.order);
            setTotalRows(response.data.body.total);
            if (props.setDataValue) {
              props.setDataValue(
                response.data.body.newOrder,
                response.data.body.pendingOrder,
                response.data.body.deliveryOrder,
                response.data.body.cancelledOrder,
                response.data.body.confirmedOrder
              );
            }
          }
          setLoading(false);
        } catch (error) {
          if (error) {
            console.log(error);
          }
        }
      } else {
        if (data) {
          try {
            setLoading(true);
            const response = await Requests.ODPOrder.DeliveryFilterByFromToDate(
              dateYearFormat(date),
              dateYearFormat(data),
              1,
              limit
            );
            if (response && response.status && response.status === 200) {
              setData(response.data.body.order);
              setTotalRows(response.data.body.total);
              if (props.setDataValue) {
                props.setDataValue(
                  response.data.body.newOrder,
                  response.data.body.pendingOrder,
                  response.data.body.deliveryOrder,
                  response.data.body.cancelledOrder,
                  response.data.body.confirmedOrder
                );
              }
            }
            setLoading(false);
          } catch (error) {
            if (error) {
              console.log(error);
            }
          }
        } else {
          fetchDeliveryODPOrder(1);
        }
      }
    } else {
      fetchDeliveryODPOrder(1);
    }
  };

  // data columns
  const columns = [
    {
      name: "Order Date",
      selector: (row) => row.orderDate || "N/A",
      sortable: true,
    },
    {
      name: "Order id",
      selector: (row) => row.orderId || "N/A",
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
    },
    {
      name: "Phone No",
      selector: (row) => row.phone || "N/A",
      sortable: true,
    },
    {
      name: "Shipping Address",
      selector: (row) => row.deliveryAddress || "N/A",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Shipping Area",
      selector: (row) => row.shippingArea || "N/A",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod || "N/A",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice || "0",
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row) => row.amountPaid || "0",
      sortable: true,
      minWidth: "130px",
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus || "N/A",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Delivery Status",
      selector: (row) => row.deliveryStatus || "N/A",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Coupon Applied",
      selector: (row) =>
        row.isCouponApplied === true ? "True" : "False" || "N/A",
      minWidth: "150px",
    },
    {
      name: "Shipping company",
      selector: (row) => row.shippingCompany || "N/A",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Tracking number",
      selector: (row) => row.trackingNumber || "N/A",
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/odporder/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          {/* <Link to={`/dashboard/e-order/edit/${row._id}`}>
                        <SuccessButton
                            type="button"
                            className="btn-circle me-1"
                        >
                            <Edit2 size={18} />
                        </SuccessButton>
                    </Link> */}

          {/* {row.is_deleteable === true ?
                        <DangerButton
                            type="button"
                            className="btn-circle"
                            onClick={() => setEOrderDelete({ ...eOrderDelete, value: row, show: true })}
                        ><Trash2 size={18} />
                        </DangerButton>
                        : null
                    } */}
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Main delivery order card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Body className="p-0">
            {/* Date picker start to end*/}
            <Container.Column className="mb-2">
              <Container.Row className="pl-md-2">
                {/* Start date picker */}
                <Container.Column className="col-md-3">
                  <FormGroup className="mb-0">
                    <Text className="text-capitalize fs-13 mb-1">
                      From date
                    </Text>
                    <DatePicker
                      id="startDate"
                      className="rounded"
                      selected={(data) => {
                        setDate(data);
                        handleStartDateFilter(data);
                      }}
                      deafultValue={date}
                    />
                  </FormGroup>
                </Container.Column>

                {/* End date picker */}
                <Container.Column className="col-md-3">
                  <FormGroup className="mb-0">
                    <Text className="text-capitalize fs-13 mb-1">To date</Text>
                    <DatePicker
                      id="endDate"
                      className="rounded"
                      selected={(data) => {
                        setToDate(data);
                        handleEndDateFilter(data);
                      }}
                      deafultValue={toDate}
                    />
                  </FormGroup>
                </Container.Column>
              </Container.Row>
            </Container.Column>

            {loading && !data.length > 0 ? <Loader /> : null}
            <DataTable
              ref={tableRef}
              columns={columns}
              data={data}
              loading={loading}
              totalRows={totalRows}
              currentPage={currentPage}
              handlePerRowsChange={handlePerRowsChange}
              handlePageChange={handlePageChange}
              searchable
              placeholder={"Search"}
              search={handleSearch}
              suggestion={handleSuggestion}
              searchLoading={searchLoading}
              clearSearch={() => fetchDeliveryODPOrder(1)}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
});

export default DeliveryOrder;
