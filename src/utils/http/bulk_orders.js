import Axios from "axios";
import { API } from "../Api";

// ** ALL
// List of All bulk-order
const AllIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}bulk-orders?page=${page}&limit=${limit}`,
    header
  );
};

// Search all bulk-order
const SearchAllIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(`${API}bulk-orders?searchText=${query}`, header);
};

//All bulk-order filter by from and to date
const AllFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}`,
    config
  );
};

//All bulk-order filter by from and to date with search
const AllFilterByFromToDateWithSearch = async (
  formDate,
  toDate,
  query,
  page,
  limit
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}`,
    config
  );
};

// ** Pending
// List of Pending bulk-order
const PendingIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}bulk-orders?page=${page}&limit=${limit}&status=pending`,
    header
  );
};

// Search Pending order
const SearchPendingIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}bulk-orders?status=pending&searchText=${query}`,
    header
  );
};

//Pending order filter by from and to date
const PendingFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&status=pending`,
    config
  );
};

//Pending bulk-order filter by from and to date with search
const PendingFilterByFromToDateWithSearch = async (
  formDate,
  toDate,
  query,
  page,
  limit
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=pending`,
    config
  );
};

// ** Delivery
// List of Delivery bulk-order
const DeliveryIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}bulk-orders?page=${page}&limit=${limit}&status=delivered`,
    header
  );
};

// Search Delivery order
const SearchDeliveryIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}bulk-orders?status=delivered&searchText=${query}`,
    header
  );
};

//Delivery order filter by from and to date
const DeliveryFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&status=delivered`,
    config
  );
};

//Delivery bulk-order filter by from and to date with search
const DeliveryFilterByFromToDateWithSearch = async (
  formDate,
  toDate,
  query,
  page,
  limit
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=delivered`,
    config
  );
};

// ** Booked
// List of Booked bulk-order
const BookedIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}bulk-orders?page=${page}&limit=${limit}&status=confirmed`,
    header
  );
};

// Search Booked order
const SearchBookedIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}bulk-orders?status=confirmed&searchText=${query}`,
    header
  );
};

//Booked order filter by from and to date
const BookedFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&status=confirmed`,
    config
  );
};

//Booked bulk-order filter by from and to date with search
const BookedFilterByFromToDateWithSearch = async (
  formDate,
  toDate,
  query,
  page,
  limit
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=confirmed`,
    config
  );
};

// ** Cancelled
// List of Cancel bulk-order
const CancelIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}bulk-orders?page=${page}&limit=${limit}&status=cancelled`,
    header
  );
};

// Search Cancel order
const SearchCancelIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}bulk-orders?status=cancelled&searchText=${query}`,
    header
  );
};

//Cancel order filter by from and to date
const CancelFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&status=cancelled`,
    config
  );
};

//Cancel bulk-order filter by from and to date with search
const CancelFilterByFromToDateWithSearch = async (
  formDate,
  toDate,
  query,
  page,
  limit
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}bulk-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=cancelled`,
    config
  );
};

// Show single e-order
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}bulk-orders/${id}`, header);
};

const Delete = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(`${API}bulk-orders/${id}`, config);
};

const BulkOrder = {
  AllIndex,
  SearchAllIndex,
  Show,
  AllFilterByFromToDate,
  AllFilterByFromToDateWithSearch,
  PendingIndex,
  SearchPendingIndex,
  PendingFilterByFromToDate,
  PendingFilterByFromToDateWithSearch,
  DeliveryIndex,
  SearchDeliveryIndex,
  DeliveryFilterByFromToDate,
  DeliveryFilterByFromToDateWithSearch,
  BookedIndex,
  SearchBookedIndex,
  BookedFilterByFromToDate,
  BookedFilterByFromToDateWithSearch,
  CancelIndex,
  SearchCancelIndex,
  CancelFilterByFromToDate,
  CancelFilterByFromToDateWithSearch,
  Delete,
};

export default BulkOrder;
