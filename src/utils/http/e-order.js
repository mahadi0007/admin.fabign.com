import Axios from "axios";
import { API } from "../Api";

// ** ALL
// List of All e-order
const AllIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-orders?page=${page}&limit=${limit}`, header);
};

// Store order
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}e-orders`, data, header);
};

const ItemCancelation = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}e-orders/cancel-item/${id}`, data, header);
};

// Search all e-order
const SearchAllIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(`${API}e-orders?searchText=${query}`, header);
};

//All e-order filter by from and to date
const AllFilterByFromToDate = async (formDate, toDate, page, limit) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&page=${page}&limit=${limit}`,
    config
  );
};

//All e-order filter by from and to date with search
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
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}`,
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
    `${API}e-orders?page=${page}&limit=${limit}&status=pending`,
    header
  );
};

// Search Pending e-order
const SearchPendingIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}e-orders?status=pending&searchText=${query}`,
    header
  );
};

//Pending e-order filter by from and to date
const PendingFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&status=pending`,
    config
  );
};

//Pending e-order filter by from and to date with search
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
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=pending`,
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
    `${API}e-orders?page=${page}&limit=${limit}&status=delivered`,
    header
  );
};

// Search Delivery e-order
const SearchDeliveryIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}e-orders?status=delivered&searchText=${query}`,
    header
  );
};

//Delivery e-order filter by from and to date
const DeliveryFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&status=delivered`,
    config
  );
};

//Delivery e-order filter by from and to date with search
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
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=delivered`,
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
    `${API}e-orders?page=${page}&limit=${limit}&status=confirmed`,
    header
  );
};

// Search Booked e-order
const SearchBookedIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}e-orders?status=confirmed&searchText=${query}`,
    header
  );
};

//Booked e-order filter by from and to date
const BookedFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&status=confirmed`,
    config
  );
};

//Booked e-order filter by from and to date with search
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
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=confirmed`,
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
    `${API}e-orders?page=${page}&limit=${limit}&status=cancelled`,
    header
  );
};

// Search Cancel e-order
const SearchCancelIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}e-orders?status=cancelled&searchText=${query}`,
    header
  );
};

//Cancel e-order filter by from and to date
const CancelFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&status=cancelled`,
    config
  );
};

//Cancel e-order filter by from and to date with search
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
    `${API}e-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=cancelled`,
    config
  );
};

// Show single e-order
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}e-orders/${id}`, header);
};

const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}e-orders/${id}`, data, header);
};

const EOrder = {
  AllIndex,
  Store,
  ItemCancelation,
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
};

export default EOrder;
