import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Eye, Printer } from "react-feather";
import { Link } from "react-router-dom";
import { GrayButton, SuccessButton } from "../button";
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

const CancelOrder = forwardRef((props, ref) => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [searchLoading, setsearchLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useImperativeHandle(ref, () => ({
    dateClear() {
      setDate(null);
      setToDate(null);
      if (tableRef.current) {
        tableRef.current.searchValueClear();
      }
    },
  }));

  // fetch cancel order data
  const fetchCancelEOrder = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.ODPOrder.CancelIndex(page, limit);
        if (response && response.data && response.data.body) {
          setData(response.data.body.order);
          if (page == 1) {
            if (props.setDefaultDataValue) {
              props.setDefaultDataValue();
            }
          }
          setTotalRows(response.data.body.total);
        }
        setLoading(false);
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
    [limit]
  );

  useEffect(() => {
    fetchCancelEOrder(1);
  }, [fetchCancelEOrder]);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchCancelEOrder(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.ODPOrder.CancelIndex(page, newPerPage);
    setData(response.data.body.order);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.ODPOrder.SearchCancelIndex(data);
    if (response.data) {
      setData(response.data.body.order);
      if (props.setDataValue) {
        props.setDataValue(response.data.body.order);
      }
    }
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.ODPOrder.SearchCancelIndex(value);
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
      try {
        const response = await Requests.ODPOrder.CancelFilterByFromToDate(
          dateYearFormat(data),
          dateYearFormat(toDate)
        );
        if (response && response.status && response.status === 200) {
          setData(response.data.body.order);
          if (props.setDataValue) {
            props.setDataValue(response.data.body.order);
          }
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    }
  };

  // filter by end date
  const handleEndDateFilter = async (data) => {
    if (date !== null) {
      try {
        const response = await Requests.ODPOrder.CancelFilterByFromToDate(
          dateYearFormat(date),
          dateYearFormat(data)
        );
        if (response && response.status && response.status === 200) {
          setData(response.data.body.order);
          if (props.setDataValue) {
            props.setDataValue(response.data.body.order);
          }
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
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
      {/* Main cancel order card */}
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
              handlePerRowsChange={handlePerRowsChange}
              handlePageChange={handlePageChange}
              searchable
              placeholder={"Search"}
              search={handleSearch}
              suggestion={handleSuggestion}
              searchLoading={searchLoading}
              clearSearch={() => fetchCancelEOrder(1)}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
});

export default CancelOrder;
