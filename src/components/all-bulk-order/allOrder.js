import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Eye, Edit2, Trash2 } from "react-feather";
import { Link } from "react-router-dom";
import { SuccessButton, DangerButton } from "../button";
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
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { DeleteModal } from "../modal";
import { Image } from "../image/Index";
import moment from "moment";
import Axios from "axios";

const AllOrder = forwardRef((props, ref) => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchableData, setSearchableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [imageBuffer, setImageBuffer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [searchLoading, setsearchLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setDelete] = useState({
    value: null,
    show: false,
    loading: false,
  });

  const [columnState, setColumnState] = useState([
    { id: "orderDate", label: "Order Date", checked: true },
    { id: "orderId", label: "Order id", checked: true },
    { id: "image", label: "Image", checked: true },
    { id: "customerName", label: "Customer Name", checked: true },
    { id: "phoneNo", label: "Phone No", checked: true },
    { id: "fabricGroup", label: "Fabric Group", checked: true },
    { id: "sizeAndQuantity", label: "Size & Quantity", checked: true },
    { id: "uploadDesign", label: "Upload Design", checked: true },
    { id: "shippingAddress", label: "Shipping Address", checked: true },
    { id: "deliveryDeadline", label: "Delivery Deadline", checked: true },
    { id: "status", label: "Status", checked: true },
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
  const fetchAllBulkOrder = useCallback(
    async (page) => {
      try {
        if (
          document.getElementById("search").value &&
          document.getElementById("startDate").value &&
          document.getElementById("endDate").value
        ) {
          setLoading(true);
          const response =
            await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
            await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
          const response = await Requests.BulkOrder.AllFilterByFromToDate(
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
          const searchResponse = await Requests.BulkOrder.AllFilterByFromToDate(
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
          const response = await Requests.BulkOrder.AllIndex(page, limit);
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
          const searchResponse = await Requests.BulkOrder.AllIndex();
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
          const allDataResponse = await Requests.BulkOrder.AllIndex();
          if (
            allDataResponse &&
            allDataResponse.data &&
            allDataResponse.data.body
          ) {
            setAllData(allDataResponse.data.body.order);
            allDataResponse.data.body.order.map(async (bulk) => {
              const imageResponse = await Axios.get(
                `${Requests.HostUrl + bulk.image}`,
                {
                  responseType: "arraybuffer",
                }
              );
              setImageBuffer((oldArray) => [
                ...oldArray,
                { id: bulk._id, buffer: imageResponse.data },
              ]);
            });
          }
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
    [currentPage, limit, props.report]
  );

  useEffect(() => {
    fetchAllBulkOrder(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchAllBulkOrder(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    if (
      document.getElementById("search").value &&
      document.getElementById("startDate").value &&
      document.getElementById("endDate").value
    ) {
      setLoading(true);
      const response = await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
        dateYearFormat(document.getElementById("startDate").value),
        dateYearFormat(document.getElementById("endDate").value),
        document.getElementById("search").value,
        page,
        newPerPage
      );
      setData(response.data.body.order);
      setLimit(newPerPage);
      const searchResponse =
        await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
      const response = await Requests.BulkOrder.AllFilterByFromToDate(
        dateYearFormat(document.getElementById("startDate").value),
        dateYearFormat(document.getElementById("endDate").value),
        page,
        newPerPage
      );
      setData(response.data.body.order);
      setLimit(newPerPage);
      const searchResponse = await Requests.BulkOrder.AllFilterByFromToDate(
        dateYearFormat(document.getElementById("startDate").value),
        dateYearFormat(document.getElementById("endDate").value)
      );
      if (searchResponse && searchResponse.data && searchResponse.data.body) {
        setSearchableData(searchResponse.data.body.order);
      }
      setLoading(false);
    } else {
      setLoading(true);
      const response = await Requests.BulkOrder.AllIndex(page, newPerPage);
      setData(response.data.body.order);
      setLimit(newPerPage);
      const searchResponse = await Requests.BulkOrder.AllIndex();
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
          await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
          await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
        const response = await Requests.BulkOrder.SearchAllIndex(data);
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
      fetchAllBulkOrder(1);
    }
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.BulkOrder.SearchAllIndex(value);
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
            await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
            await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
            const response = await Requests.BulkOrder.AllFilterByFromToDate(
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
              await Requests.BulkOrder.AllFilterByFromToDate(
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
          fetchAllBulkOrder(1);
        }
      }
    } else {
      fetchAllBulkOrder(1);
    }
  };

  // filter by end date
  const handleEndDateFilter = async (data) => {
    if (date !== null) {
      if (document.getElementById("search").value) {
        try {
          setLoading(true);
          const response =
            await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
            await Requests.BulkOrder.AllFilterByFromToDateWithSearch(
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
            const response = await Requests.BulkOrder.AllFilterByFromToDate(
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
              await Requests.BulkOrder.AllFilterByFromToDate(
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
          fetchAllBulkOrder(1);
        }
      }
    } else {
      fetchAllBulkOrder(1);
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

  const downloadCSV = async (array) => {
    const workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet("ExcelJS sheet");
    var columns = [];
    columnState.map((item) => {
      if (item.checked) {
        columns.push({
          header:
            item.id === "orderDate"
              ? "Order Date"
              : item.id === "orderId"
              ? "Order id"
              : item.id === "image"
              ? "Image"
              : item.id === "customerName"
              ? "Customer Name"
              : item.id === "phoneNo"
              ? "Phone No"
              : item.id === "fabricGroup"
              ? "Fabric Group"
              : item.id === "sizeAndQuantity"
              ? "Size & Quantity"
              : item.id === "uploadDesign"
              ? "Upload Design"
              : item.id === "shippingAddress"
              ? "Shipping Address"
              : item.id === "deliveryDeadline"
              ? "Delivery Deadline"
              : item.id === "status"
              ? "Status"
              : "",
          key: item.id,
          width: 17,
        });
      }
      return item;
    });
    worksheet.columns = columns;
    let position = 2;
    if (document.getElementById("search").value || (date && toDate)) {
      searchableData.map(async (row, index) => {
        worksheet.addRow({
          orderDate:
            columnState.find((i) => i.id === "orderDate").checked &&
            row.orderDate,
          orderId:
            columnState.find((i) => i.id === "orderId").checked && row.orderId,
          customerName:
            columnState.find((i) => i.id === "customerName").checked &&
            row.name,
          phoneNo:
            columnState.find((i) => i.id === "phoneNo").checked && row.phone,
          fabricGroup:
            columnState.find((i) => i.id === "fabricGroup").checked &&
            row.fabric.fabric_name,
          sizeAndQuantity:
            columnState.find((i) => i.id === "sizeAndQuantity").checked &&
            JSON.stringify(row.quantity)
              .slice(1, -1)
              .replace(/"/g, "")
              .replace(/:/g, " (")
              .replace(/,/g, "pc), ")
              .concat("pc)"),
          uploadDesign:
            columnState.find((i) => i.id === "uploadDesign").checked &&
            row.uploadImage
              ? row.uploadImage.image.split("/")[4]
              : "N/A",
          shippingAddress:
            columnState.find((i) => i.id === "shippingAddress").checked &&
            row.shippingAddress,
          deliveryDeadline:
            columnState.find((i) => i.id === "deliveryDeadline").checked &&
            `${moment(row.startDate).format("MM/DD/YYYY")} - ${moment(
              row.endDate
            ).format("MM/DD/YYYY")}`,
          status:
            columnState.find((i) => i.id === "status").checked && row.status,
        });
        if (columnState.find((i) => i.id === "image").checked) {
          const imageId1 = workbook.addImage({
            buffer: imageBuffer.find((i) => i.id === row._id).buffer,
            extension: row.image.split(".")[1],
          });
          worksheet.addImage(imageId1, `C${position}:C${position}`);
          // worksheet.addImage(imageId1, `G${position}:G${position}`);
          position++;
        }
      });
    } else {
      allData.map(async (row, index) => {
        worksheet.addRow({
          orderDate:
            columnState.find((i) => i.id === "orderDate").checked &&
            row.orderDate,
          orderId:
            columnState.find((i) => i.id === "orderId").checked && row.orderId,
          customerName:
            columnState.find((i) => i.id === "customerName").checked &&
            row.name,
          phoneNo:
            columnState.find((i) => i.id === "phoneNo").checked && row.phone,
          fabricGroup:
            columnState.find((i) => i.id === "fabricGroup").checked &&
            row.fabric.fabric_name,
          sizeAndQuantity:
            columnState.find((i) => i.id === "sizeAndQuantity").checked &&
            JSON.stringify(row.quantity)
              .slice(1, -1)
              .replace(/"/g, "")
              .replace(/:/g, " (")
              .replace(/,/g, "pc), ")
              .concat("pc)"),
          uploadDesign:
            columnState.find((i) => i.id === "uploadDesign").checked &&
            row.uploadImage
              ? row.uploadImage.image.split("/")[4]
              : "N/A",
          shippingAddress:
            columnState.find((i) => i.id === "shippingAddress").checked &&
            row.shippingAddress,
          deliveryDeadline:
            columnState.find((i) => i.id === "deliveryDeadline").checked &&
            `${moment(row.startDate).format("MM/DD/YYYY")} - ${moment(
              row.endDate
            ).format("MM/DD/YYYY")}`,
          status:
            columnState.find((i) => i.id === "status").checked && row.status,
        });
        if (columnState.find((i) => i.id === "image").checked) {
          const imageId1 = workbook.addImage({
            buffer: imageBuffer.find((i) => i.id === row._id).buffer,
            extension: row.image.split(".")[1],
          });
          worksheet.addImage(imageId1, `C${position}:C${position}`);
          // worksheet.addImage(imageId1, `G${position}:G${position}`);
          position++;
        }
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
    if (columnState.find((i) => i.id === "image").checked) {
      worksheet.properties.defaultRowHeight = 70;
    }
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";
    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, "fileName" + fileExtension);
  };

  const exportPDF = () => {
    let element = document.getElementsByClassName("sc-fLlhyt ifOHjV")[0];
    console.log(element);
    const doc = new jsPDF("p", "pt", "letter");
    doc.html(element, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
    });
  };

  // Delete
  // Handle order delete
  const handleorderDelete = async () => {
    try {
      setDelete({ ...isDelete, loading: true });
      const response = await Requests.BulkOrder.Delete(isDelete.value._id);
      if (response && response.status === 200) {
        Toastify.Success("Order Deleted Successfully");
        fetchAllBulkOrder(1);
      }
      setDelete({ ...isDelete, loading: false, show: false });
    } catch (error) {
      setDelete({ ...isDelete, loading: false, show: false });
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
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
      omit: !columnState.find((i) => i.id === "orderDate").checked,
    },
    {
      name: "Order ID",
      selector: (row) => row.orderId || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "orderId").checked,
    },
    {
      name: "Image",
      selector: (row) =>
        row.image ? (
          <Image
            src={Requests.HostUrl + row.image}
            alt="Store image"
            x={50}
            y={50}
          />
        ) : (
          <p>"N/A"</p>
        ),
      sortable: true,
      omit: !columnState.find((i) => i.id === "image").checked,
    },
    {
      name: "Customer Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "customerName").checked,
    },
    {
      name: "Phone No",
      selector: (row) => row.phone || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "phoneNo").checked,
    },
    {
      name: "Fabric Group",
      selector: (row) => row.fabric.fabric_name || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "fabricGroup").checked,
    },
    {
      name: "Size & Quantity",
      minWidth: "500px",
      selector: (row) =>
        JSON.stringify(row.quantity)
          .slice(1, -1)
          .replace(/"/g, "")
          .replace(/:/g, " (")
          .replace(/,/g, "pc), ")
          .concat("pc)") || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "sizeAndQuantity").checked,
    },
    {
      name: "Upload Design",
      selector: (row) =>
        row.uploadImage ? row.uploadImage.image.split("/")[4] : "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "uploadDesign").checked,
    },
    {
      name: "Shipping Address",
      selector: (row) => row.shippingAddress || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "shippingAddress").checked,
    },
    {
      name: "Delivery Deadline",
      minWidth: "180px",
      selector: (row) =>
        `${moment(row.startDate).format("MM/DD/YYYY")} - ${moment(
          row.endDate
        ).format("MM/DD/YYYY")}` || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "deliveryDeadline").checked,
    },
    {
      name: "Status",
      selector: (row) => row.status || "N/A",
      sortable: true,
      omit: !columnState.find((i) => i.id === "status").checked,
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/bulkorder/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          {/* <Link to={`/dashboard/odpstore/edit/${row._id}`}> */}
          <SuccessButton type="button" className="btn-circle me-1">
            <Edit2 size={18} />
          </SuccessButton>
          {/* </Link> */}
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() => setDelete({ ...isDelete, value: row, show: true })}
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
      omit:
        !columnState.find((i) => i.id === "orderDate").checked &&
        !columnState.find((i) => i.id === "orderId").checked &&
        !columnState.find((i) => i.id === "image").checked &&
        !columnState.find((i) => i.id === "customerName").checked &&
        !columnState.find((i) => i.id === "phoneNo").checked &&
        !columnState.find((i) => i.id === "fabricGroup").checked &&
        !columnState.find((i) => i.id === "sizeAndQuantity").checked &&
        !columnState.find((i) => i.id === "uploadDesign").checked &&
        !columnState.find((i) => i.id === "shippingAddress").checked &&
        !columnState.find((i) => i.id === "deliveryDeadline").checked &&
        !columnState.find((i) => i.id === "status").checked,
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
              clearSearch={() => fetchAllBulkOrder(1)}
            />
          </Card.Body>
        </Card.Simple>
        {/* Delete order confirmation modal */}
        <DeleteModal
          show={isDelete.show}
          loading={isDelete.loading}
          message={
            <Text className="fs-15">
              Want to delete {isDelete.value ? isDelete.value.orderId : null}{" "}
              order ?
            </Text>
          }
          onHide={() => setDelete({ value: null, show: false, loading: false })}
          doDelete={handleorderDelete}
        />
      </Container.Column>
    </div>
  );
});

export default AllOrder;
