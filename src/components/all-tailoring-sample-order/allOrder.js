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
import { CheckboxDropdown } from "../checkboxDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const AllOrder = forwardRef((props, ref) => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchableData, setSearchableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [searchLoading, setsearchLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [columnState, setColumnState] = useState([
    { id: "orderId", label: "Order id", checked: true },
    { id: "name", label: "Name", checked: true },
    { id: "phone", label: "Phone", checked: true },
    { id: "deliveryAddress", label: "Delivery Address", checked: true },
    { id: "date", label: "Date", checked: true },
    { id: "shippingArea", label: "Shipping Area", checked: true },
    { id: "paymentMethod", label: "Payment Method", checked: true },
    { id: "totalPrice", label: "Total Price", checked: true },
    { id: "amountPaid", label: "Amount Paid", checked: true },
    { id: "paymentStatus", label: "Payment Status", checked: true },
    { id: "deliveryStatus", label: "Delivery Status", checked: true },
    { id: "couponApplied", label: "Coupon Applied", checked: true },
    { id: "shippingCompany", label: "Shipping company", checked: true },
    { id: "trackingNumber", label: "Tracking number", checked: true },
  ]);

  useImperativeHandle(ref, () => ({
    dateClear() {
      setDate(null);
      setToDate(null);
      if (tableRef.current) {
        tableRef.current.searchValueClear();
      }
    },
  }));

  // fetch all order data
  const fetchAllEOrder = useCallback(
    async (page) => {
      try {
        if (
          document.getElementById("search").value &&
          document.getElementById("startDate").value &&
          document.getElementById("endDate").value
        ) {
          setLoading(true);
          const response =
            await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
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
          const searchResponse =
            await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
              dateYearFormat(document.getElementById("startDate").value),
              dateYearFormat(document.getElementById("endDate").value),
              document.getElementById("search").value
            );
          if (
            searchResponse &&
            searchResponse.data &&
            searchResponse.data.body
          ) {
            setSearchableData(searchResponse.data.body.order);
          }
          setLoading(false);
        } else if (
          document.getElementById("startDate").value &&
          document.getElementById("endDate").value
        ) {
          setLoading(true);
          const response =
            await Requests.TailoringSampleOrder.AllFilterByFromToDate(
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
          const searchResponse =
            await Requests.TailoringSampleOrder.AllFilterByFromToDate(
              dateYearFormat(document.getElementById("startDate").value),
              dateYearFormat(document.getElementById("endDate").value)
            );
          if (
            searchResponse &&
            searchResponse.data &&
            searchResponse.data.body
          ) {
            setSearchableData(searchResponse.data.body.order);
          }
          setLoading(false);
        } else {
          setLoading(true);
          const response = await Requests.TailoringSampleOrder.AllIndex(
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
          const searchResponse = await Requests.TailoringSampleOrder.AllIndex();
          if (
            searchResponse &&
            searchResponse.data &&
            searchResponse.data.body
          ) {
            setSearchableData(searchResponse.data.body.order);
          }
          setLoading(false);
        }
        setCurrentPage(page);
        if (props.report) {
          const allDataResponse =
            await Requests.TailoringSampleOrder.AllIndex();
          if (
            allDataResponse &&
            allDataResponse.data &&
            allDataResponse.data.body
          ) {
            setAllData(allDataResponse.data.body.order);
          }
        }
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
    [currentPage, limit, props.report]
  );

  useEffect(() => {
    fetchAllEOrder(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchAllEOrder(page);
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
        await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
          dateYearFormat(document.getElementById("startDate").value),
          dateYearFormat(document.getElementById("endDate").value),
          document.getElementById("search").value,
          page,
          newPerPage
        );
      setData(response.data.body.order);
      setLimit(newPerPage);
      const searchResponse =
        await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
          dateYearFormat(document.getElementById("startDate").value),
          dateYearFormat(document.getElementById("endDate").value),
          document.getElementById("search").value
        );
      if (searchResponse && searchResponse.data && searchResponse.data.body) {
        setSearchableData(searchResponse.data.body.order);
      }
      setLoading(false);
    } else if (
      document.getElementById("startDate").value &&
      document.getElementById("endDate").value
    ) {
      setLoading(true);
      const response =
        await Requests.TailoringSampleOrder.AllFilterByFromToDate(
          dateYearFormat(document.getElementById("startDate").value),
          dateYearFormat(document.getElementById("endDate").value),
          page,
          newPerPage
        );
      setData(response.data.body.order);
      setLimit(newPerPage);
      const searchResponse =
        await Requests.TailoringSampleOrder.AllFilterByFromToDate(
          dateYearFormat(document.getElementById("startDate").value),
          dateYearFormat(document.getElementById("endDate").value)
        );
      if (searchResponse && searchResponse.data && searchResponse.data.body) {
        setSearchableData(searchResponse.data.body.order);
      }
      setLoading(false);
    } else {
      setLoading(true);
      const response = await Requests.TailoringSampleOrder.AllIndex(
        page,
        newPerPage
      );
      setData(response.data.body.order);
      setLimit(newPerPage);
      const searchResponse = await Requests.TailoringSampleOrder.AllIndex();
      if (searchResponse && searchResponse.data && searchResponse.data.body) {
        setSearchableData(searchResponse.data.body.order);
      }
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
          await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
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
        const searchResponse =
          await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
            dateYearFormat(document.getElementById("startDate").value),
            dateYearFormat(document.getElementById("endDate").value),
            document.getElementById("search").value
          );
        if (searchResponse && searchResponse.data && searchResponse.data.body) {
          setSearchableData(searchResponse.data.body.order);
        }
        setsearchLoading(false);
      } else {
        setsearchLoading(true);
        const response = await Requests.TailoringSampleOrder.SearchAllIndex(
          data
        );
        if (response.data) {
          setData(response.data.body.order);
          setSearchableData(response.data.body.order);
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
      fetchAllEOrder(1);
    }
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.TailoringSampleOrder.SearchAllIndex(value);
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
            await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
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
          const searchResponse =
            await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
              dateYearFormat(document.getElementById("startDate").value),
              dateYearFormat(document.getElementById("endDate").value),
              document.getElementById("search").value
            );
          if (
            searchResponse &&
            searchResponse.data &&
            searchResponse.data.body
          ) {
            setSearchableData(searchResponse.data.body.order);
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
            const response =
              await Requests.TailoringSampleOrder.AllFilterByFromToDate(
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
            const searchResponse =
              await Requests.TailoringSampleOrder.AllFilterByFromToDate(
                dateYearFormat(document.getElementById("startDate").value),
                dateYearFormat(document.getElementById("endDate").value)
              );
            if (
              searchResponse &&
              searchResponse.data &&
              searchResponse.data.body
            ) {
              setSearchableData(searchResponse.data.body.order);
            }
            setLoading(false);
          } catch (error) {
            if (error) {
              console.log(error);
            }
          }
        } else {
          fetchAllEOrder(1);
        }
      }
    } else {
      fetchAllEOrder(1);
    }
  };

  // filter by end date
  const handleEndDateFilter = async (data) => {
    if (date !== null) {
      if (document.getElementById("search").value) {
        try {
          setLoading(true);
          const response =
            await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
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
          const searchResponse =
            await Requests.TailoringSampleOrder.AllFilterByFromToDateWithSearch(
              dateYearFormat(document.getElementById("startDate").value),
              dateYearFormat(document.getElementById("endDate").value),
              document.getElementById("search").value
            );
          if (
            searchResponse &&
            searchResponse.data &&
            searchResponse.data.body
          ) {
            setSearchableData(searchResponse.data.body.order);
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
            const response =
              await Requests.TailoringSampleOrder.AllFilterByFromToDate(
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
            const searchResponse =
              await Requests.TailoringSampleOrder.AllFilterByFromToDate(
                dateYearFormat(document.getElementById("startDate").value),
                dateYearFormat(document.getElementById("endDate").value)
              );
            if (
              searchResponse &&
              searchResponse.data &&
              searchResponse.data.body
            ) {
              setSearchableData(searchResponse.data.body.order);
            }
            setLoading(false);
          } catch (error) {
            if (error) {
              console.log(error);
            }
          }
        } else {
          fetchAllEOrder(1);
        }
      }
    } else {
      fetchAllEOrder(1);
    }
  };

  const handleChecked = (key, event) => {
    let items = [...columnState];
    items.find((i) => i.id === key).checked = event.target.checked;
    setColumnState(items);
  };

  const handleSelectAll = () => {
    let items = [...columnState];
    items.forEach((i) => (i.checked = true));
    setColumnState(items);
  };

  const handleSelectNone = () => {
    let items = [...columnState];
    items.forEach((i) => (i.checked = false));
    setColumnState(items);
  };

  const downloadCSV = async () => {
    const workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet("ExcelJS sheet");
    var columns = [];
    columnState.map((item) => {
      if (item.checked) {
        columns.push({
          header:
            item.id === "orderId"
              ? "Order id"
              : item.id === "name"
              ? "Name"
              : item.id === "phone"
              ? "Phone"
              : item.id === "deliveryAddress"
              ? "Delivery Address"
              : item.id === "date"
              ? "Date"
              : item.id === "shippingArea"
              ? "Shipping Area"
              : item.id === "paymentMethod"
              ? "Payment Method"
              : item.id === "totalPrice"
              ? "Total Price"
              : item.id === "amountPaid"
              ? "Amount Paid"
              : item.id === "paymentStatus"
              ? "Payment Status"
              : item.id === "deliveryStatus"
              ? "Delivery Status"
              : item.id === "couponApplied"
              ? "Coupon Applied"
              : item.id === "shippingCompany"
              ? "Shipping company"
              : item.id === "trackingNumber"
              ? "Tracking number"
              : "",
          key: item.id,
          width: 20,
        });
      }
      return item;
    });
    worksheet.columns = columns;
    if (
      document.getElementById("search").value ||
      (document.getElementById("startDate").value &&
        document.getElementById("endDate").value)
    ) {
      searchableData.map(async (row) => {
        worksheet.addRow({
          orderId:
            columnState.find((i) => i.id === "orderId").checked && row.orderId,
          name: columnState.find((i) => i.id === "name").checked && row.name,
          phone: columnState.find((i) => i.id === "phone").checked && row.phone,
          deliveryAddress:
            columnState.find((i) => i.id === "deliveryAddress").checked &&
            row.deliveryAddress,
          date:
            columnState.find((i) => i.id === "date").checked && row.orderDate,
          shippingArea:
            columnState.find((i) => i.id === "shippingArea").checked &&
            row.shippingArea,
          paymentMethod:
            columnState.find((i) => i.id === "paymentMethod").checked &&
            row.paymentMethod,
          totalPrice:
            columnState.find((i) => i.id === "totalPrice").checked &&
            row.totalPrice,
          amountPaid:
            columnState.find((i) => i.id === "amountPaid").checked &&
            row.amountPaid,
          paymentStatus:
            columnState.find((i) => i.id === "paymentStatus").checked &&
            row.paymentStatus,
          deliveryStatus:
            columnState.find((i) => i.id === "deliveryStatus").checked &&
            row.deliveryStatus
              ? row.deliveryStatus
              : "N/A",
          couponApplied:
            columnState.find((i) => i.id === "couponApplied").checked &&
            row.isCouponApplied === true
              ? "True"
              : "False",
          shippingCompany:
            columnState.find((i) => i.id === "shippingCompany").checked &&
            row.shippingCompany
              ? row.shippingCompany
              : "N/A",
          trackingNumber:
            columnState.find((i) => i.id === "trackingNumber").checked &&
            row.trackingNumber
              ? row.trackingNumber
              : "N/A",
        });
      });
    } else {
      allData.map(async (row) => {
        worksheet.addRow({
          orderId:
            columnState.find((i) => i.id === "orderId").checked && row.orderId,
          name: columnState.find((i) => i.id === "name").checked && row.name,
          phone: columnState.find((i) => i.id === "phone").checked && row.phone,
          deliveryAddress:
            columnState.find((i) => i.id === "deliveryAddress").checked &&
            row.deliveryAddress,
          date:
            columnState.find((i) => i.id === "date").checked && row.orderDate,
          shippingArea:
            columnState.find((i) => i.id === "shippingArea").checked &&
            row.shippingArea,
          paymentMethod:
            columnState.find((i) => i.id === "paymentMethod").checked &&
            row.paymentMethod,
          totalPrice:
            columnState.find((i) => i.id === "totalPrice").checked &&
            row.totalPrice,
          amountPaid:
            columnState.find((i) => i.id === "amountPaid").checked &&
            row.amountPaid,
          paymentStatus:
            columnState.find((i) => i.id === "paymentStatus").checked &&
            row.paymentStatus,
          deliveryStatus:
            columnState.find((i) => i.id === "deliveryStatus").checked &&
            row.deliveryStatus
              ? row.deliveryStatus
              : "N/A",
          couponApplied:
            columnState.find((i) => i.id === "couponApplied").checked &&
            row.isCouponApplied === true
              ? "True"
              : "False",
          shippingCompany:
            columnState.find((i) => i.id === "shippingCompany").checked &&
            row.shippingCompany
              ? row.shippingCompany
              : "N/A",
          trackingNumber:
            columnState.find((i) => i.id === "trackingNumber").checked &&
            row.trackingNumber
              ? row.trackingNumber
              : "N/A",
        });
      });
    }

    for (let rowIndex = 1; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
        border: {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        },
      };
    }

    if (columnState.find((i) => i.id === "totalPrice").checked) {
      worksheet.getColumn("totalPrice").alignment = {
        horizontal: "right",
      };
    }
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";
    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, "fileName" + fileExtension);
  };

  // const exportPDF = () => {
  //   let element = document.getElementsByClassName("sc-fLlhyt ifOHjV")[0];
  //   console.log(element);
  //   const doc = new jsPDF("p", "pt", "letter");
  //   doc.html(element, {
  //     callback: function (doc) {
  //       doc.save("sample.pdf");
  //     },
  //   });
  // };

  // const exportPDF = () => {
  //   let element = document.getElementsByClassName("sc-fLlhyt ifOHjV")[0];
  //   // let element = document.getElementById("test");
  //   console.log(element);
  //   // const doc = new jsPDF("p", "pt", [2500, 2500]);
  //   // const doc = new jsPDF("p", "pt", "letter");
  //   // doc.html(element, {
  //   //   margin: [0, 60, 0, 60],
  //   //   callback: function (doc) {
  //   //     doc.save("sample.pdf");
  //   //   },
  //   // });
  //   var doc = new jsPDF();
  //   // You can use html:
  //   // autoTable(doc, { html: ".sc-fLlhyt ifOHjV" });

  //   // Or use javascript directly:
  //   autoTable(doc, {
  //     head: [["Name", "Email", "Country"]],
  //     body: [
  //       ["David", "david@example.com", "Sweden"],
  //       ["Castille", "castille@example.com", "Spain"],
  //       // ...
  //     ],
  //   });
  //   doc.save("table.pdf");
  // };

  // data columns
  const columns = [
    {
      name: "Order id",
      selector: (row) => row.orderId || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "orderId").checked,
    },
    {
      name: "Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "name").checked,
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "phone").checked,
    },
    {
      name: "Delivery Address",
      selector: (row) => row.deliveryAddress || "N/A",
      sortable: true,
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "deliveryAddress").checked,
    },
    {
      name: "Date",
      selector: (row) => row.orderDate || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "date").checked,
    },
    {
      name: "Shipping Area",
      selector: (row) => row.shippingArea || "N/A",
      sortable: true,
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "shippingArea").checked,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod || "N/A",
      sortable: true,
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "paymentMethod").checked,
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice || "0",
      sortable: true,
      omit: !columnState.find((i) => i.id === "totalPrice").checked,
    },
    {
      name: "Amount Paid",
      selector: (row) => row.amountPaid || "0",
      sortable: true,
      minWidth: "130px",
      omit: !columnState.find((i) => i.id === "amountPaid").checked,
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus || "N/A",
      sortable: true,
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "paymentStatus").checked,
    },
    {
      name: "Delivery Status",
      selector: (row) => row.deliveryStatus || "N/A",
      sortable: true,
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "deliveryStatus").checked,
    },
    {
      name: "Coupon Applied",
      selector: (row) =>
        row.isCouponApplied === true ? "True" : "False" || "N/A",
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "couponApplied").checked,
    },
    {
      name: "Shipping company",
      selector: (row) => row.shippingCompany || "N/A",
      sortable: true,
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "shippingCompany").checked,
    },
    {
      name: "Tracking number",
      selector: (row) => row.trackingNumber || "N/A",
      sortable: true,
      minWidth: "150px",
      omit: !columnState.find((i) => i.id === "trackingNumber").checked,
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/tailoring-sample-order/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <GrayButton
            type="button"
            className="btn-circle ms-2 mt-2 mt-sm-0"
            onClick={() => console.log("Will print")}
          >
            <Printer size={18} />
          </GrayButton>

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
      omit:
        !columnState.find((i) => i.id === "orderId").checked &&
        !columnState.find((i) => i.id === "name").checked &&
        !columnState.find((i) => i.id === "phone").checked &&
        !columnState.find((i) => i.id === "deliveryAddress").checked &&
        !columnState.find((i) => i.id === "date").checked &&
        !columnState.find((i) => i.id === "shippingArea").checked &&
        !columnState.find((i) => i.id === "paymentMethod").checked &&
        !columnState.find((i) => i.id === "totalPrice").checked &&
        !columnState.find((i) => i.id === "amountPaid").checked &&
        !columnState.find((i) => i.id === "paymentStatus").checked &&
        !columnState.find((i) => i.id === "deliveryStatus").checked &&
        !columnState.find((i) => i.id === "couponApplied").checked &&
        !columnState.find((i) => i.id === "shippingCompany").checked &&
        !columnState.find((i) => i.id === "trackingNumber").checked,
    },
  ];

  return (
    <div>
      {/* Main all order card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Body className="p-0">
            {/* Date picker start to end*/}
            <Container.Column className="mb-2">
              <Container.Row className="pl-md-2">
                {!props.report && (
                  <>
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
                        <Text className="text-capitalize fs-13 mb-1">
                          To date
                        </Text>
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
                  </>
                )}

                {props.report && (
                  <>
                    {/* Start date picker */}
                    <Container.Column className="col-md-2">
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
                    <Container.Column className="col-md-2">
                      <FormGroup className="mb-0">
                        <Text className="text-capitalize fs-13 mb-1">
                          To date
                        </Text>
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
                    <Container.Column className="col-md-2 align-self-center mt-3">
                      <CheckboxDropdown
                        items={columnState}
                        handleChecked={handleChecked}
                        handleSelectAll={handleSelectAll}
                        handleSelectNone={handleSelectNone}
                      />
                    </Container.Column>
                    <Container.Column
                      className="col-md-2 align-self-center mt-3"
                      onClick={downloadCSV}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="border border-dark pt-2 text-center">
                        <Text>
                          <span className="me-1">
                            <FontAwesomeIcon icon={faFileExcel} />
                          </span>
                          Excel
                        </Text>
                      </div>
                    </Container.Column>
                    <Container.Column
                      className="col-md-2 align-self-center mt-3"
                      // onClick={exportPDF}
                    >
                      <div className="border border-dark pt-2 text-center">
                        <Text>
                          <span className="me-1">
                            <FontAwesomeIcon icon={faFilePdf} />
                          </span>
                          PDF
                        </Text>
                      </div>
                    </Container.Column>
                  </>
                )}
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
              clearSearch={() => fetchAllEOrder(1)}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
});

export default AllOrder;
