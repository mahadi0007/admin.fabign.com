import Axios from "axios";
import { API } from "../Api";

// ** ALL
// List of All tailoring-sample-order
const AllIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-sample-orders?page=${page}&limit=${limit}`,
    header
  );
};

// Store order
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}tailoring-sample-orders`, data, header);
};

const ItemCancelation = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(
    `${API}tailoring-sample-orders/cancel-item/${id}`,
    data,
    header
  );
};

// Search all tailoring-sample-order
const SearchAllIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?searchText=${query}`,
    header
  );
};

//All tailoring-sample-order filter by from and to date
const AllFilterByFromToDate = async (formDate, toDate, page, limit) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&page=${page}&limit=${limit}`,
    config
  );
};

//All tailoring-sample-order filter by from and to date with search
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
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}`,
    config
  );
};

// ** Pending
// List of Pending tailoring-sample-order
const PendingIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-sample-orders?page=${page}&limit=${limit}&status=pending`,
    header
  );
};

// Search Pending tailoring-sample-order
const SearchPendingIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?status=pending&searchText=${query}`,
    header
  );
};

//Pending tailoring-sample-order filter by from and to date
const PendingFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&status=pending`,
    config
  );
};

//Pending tailoring-sample-order filter by from and to date with search
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
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=pending`,
    config
  );
};

// ** Delivery
// List of Delivery tailoring-sample-order
const DeliveryIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-sample-orders?page=${page}&limit=${limit}&status=delivered`,
    header
  );
};

// Search Delivery tailoring-sample-order
const SearchDeliveryIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?status=delivered&searchText=${query}`,
    header
  );
};

//Delivery tailoring-sample-order filter by from and to date
const DeliveryFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&status=delivered`,
    config
  );
};

//Delivery tailoring-sample-order filter by from and to date with search
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
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=delivered`,
    config
  );
};

// ** Booked
// List of Booked tailoring-sample-order
const BookedIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-sample-orders?page=${page}&limit=${limit}&status=confirmed`,
    header
  );
};

// Search Booked tailoring-sample-order
const SearchBookedIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?status=confirmed&searchText=${query}`,
    header
  );
};

//Booked tailoring-sample-order filter by from and to date
const BookedFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&status=confirmed`,
    config
  );
};

//Booked tailoring-sample-order filter by from and to date with search
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
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=confirmed`,
    config
  );
};

// ** Cancelled
// List of Cancel tailoring-sample-order
const CancelIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-sample-orders?page=${page}&limit=${limit}&status=cancelled`,
    header
  );
};

// Search Cancel tailoring-sample-order
const SearchCancelIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?status=cancelled&searchText=${query}`,
    header
  );
};

//Cancel tailoring-sample-order filter by from and to date
const CancelFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&status=cancelled`,
    config
  );
};

//Cancel tailoring-sample-order filter by from and to date with search
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
    `${API}tailoring-sample-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=cancelled`,
    config
  );
};

// Show single tailoring-sample-order
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}tailoring-sample-orders/${id}`, header);
};

const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}tailoring-sample-orders/${id}`, data, header);
};

const TailoringSampleOrder = {
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

export default TailoringSampleOrder;
