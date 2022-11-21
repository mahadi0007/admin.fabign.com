import Axios from "axios";
import { API } from "../Api";

// ** ALL
// List of All odp-order
const AllIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}odp-orders?page=${page}&limit=${limit}`,
    header
  );
};

// Search all order
const SearchAllIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(`${API}odp-orders?searchText=${query}`, header);
};

//All order filter by from and to date
const AllFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}`,
    config
  );
};

//All odp-order filter by from and to date with search
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}`,
    config
  );
};

// ** Pending
// List of Pending e-order
const PendingIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}odp-orders?page=${page}&limit=${limit}&status=pending`,
    header
  );
};

// Search Pending order
const SearchPendingIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}odp-orders?status=pending&searchText=${query}`,
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&status=pending`,
    config
  );
};

//Pending odp-order filter by from and to date with search
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=pending`,
    config
  );
};

// ** Delivery
// List of Delivery e-order
const DeliveryIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}odp-orders?page=${page}&limit=${limit}&status=delivered`,
    header
  );
};

// Search Delivery order
const SearchDeliveryIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}odp-orders?status=delivered&searchText=${query}`,
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&status=delivered`,
    config
  );
};

//Delivery odp-order filter by from and to date with search
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=delivered`,
    config
  );
};

// ** Booked
// List of Booked e-order
const BookedIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}odp-orders?page=${page}&limit=${limit}&status=confirmed`,
    header
  );
};

// Search Booked order
const SearchBookedIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}odp-orders?status=confirmed&searchText=${query}`,
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&status=confirmed`,
    config
  );
};

//Booked odp-order filter by from and to date with search
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=confirmed`,
    config
  );
};

// ** Cancelled
// List of Cancel e-order
const CancelIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}odp-orders?page=${page}&limit=${limit}&status=cancelled`,
    header
  );
};

// Search Cancel order
const SearchCancelIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}odp-orders?status=cancelled&searchText=${query}`,
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&status=cancelled`,
    config
  );
};

//Cancel odp-order filter by from and to date with search
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
    `${API}odp-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=cancelled`,
    config
  );
};

// Show single e-order
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}odp-orders/${id}`, header);
};

const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}odp-orders/${id}`, data, header);
};

const Delete = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await Axios.delete(`${API}odp-orders/${id}`, config);
};

const ODPOrder = {
  AllIndex,
  SearchAllIndex,
  Show,
  Update,
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

export default ODPOrder;
