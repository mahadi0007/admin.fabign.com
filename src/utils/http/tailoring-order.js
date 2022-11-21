import Axios from "axios";
import { API } from "../Api";

// ** ALL
// List of All tailoring-order
const AllIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-orders?page=${page}&limit=${limit}`,
    header
  );
};

// Store order
const Store = async (data) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.post(`${API}tailoring-orders`, data, header);
};

const ItemCancelation = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(
    `${API}tailoring-orders/cancel-item/${id}`,
    data,
    header
  );
};

// Search all tailoring-order
const SearchAllIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(`${API}tailoring-orders?searchText=${query}`, header);
};

//All tailoring-order filter by from and to date
const AllFilterByFromToDate = async (formDate, toDate, page, limit) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&page=${page}&limit=${limit}`,
    config
  );
};

//All tailoring-order filter by from and to date with search
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
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}`,
    config
  );
};

// ** Pending
// List of Pending tailoring-order
const PendingIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-orders?page=${page}&limit=${limit}&status=pending`,
    header
  );
};

// Search Pending tailoring-order
const SearchPendingIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-orders?status=pending&searchText=${query}`,
    header
  );
};

//Pending tailoring-order filter by from and to date
const PendingFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&status=pending`,
    config
  );
};

//Pending tailoring-order filter by from and to date with search
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
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=pending`,
    config
  );
};

// ** Delivery
// List of Delivery tailoring-order
const DeliveryIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-orders?page=${page}&limit=${limit}&status=delivered`,
    header
  );
};

// Search Delivery tailoring-order
const SearchDeliveryIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-orders?status=delivered&searchText=${query}`,
    header
  );
};

//Delivery tailoring-order filter by from and to date
const DeliveryFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&status=delivered`,
    config
  );
};

//Delivery tailoring-order filter by from and to date with search
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
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=delivered`,
    config
  );
};

// ** Booked
// List of Booked tailoring-order
const BookedIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-orders?page=${page}&limit=${limit}&status=confirmed`,
    header
  );
};

// Search Booked tailoring-order
const SearchBookedIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-orders?status=confirmed&searchText=${query}`,
    header
  );
};

//Booked tailoring-order filter by from and to date
const BookedFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&status=confirmed`,
    config
  );
};

//Booked tailoring-order filter by from and to date with search
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
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=confirmed`,
    config
  );
};

// ** Cancelled
// List of Cancel tailoring-order
const CancelIndex = async (page, limit) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(
    `${API}tailoring-orders?page=${page}&limit=${limit}&status=cancelled`,
    header
  );
};

// Search Cancel tailoring-order
const SearchCancelIndex = async (query) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  return await Axios.get(
    `${API}tailoring-orders?status=cancelled&searchText=${query}`,
    header
  );
};

//Cancel tailoring-order filter by from and to date
const CancelFilterByFromToDate = async (formDate, toDate) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await Axios.get(
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&status=cancelled`,
    config
  );
};

//Cancel tailoring-order filter by from and to date with search
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
    `${API}tailoring-orders?fromDate=${formDate}&toDate=${toDate}&searchText=${query}&page=${page}&limit=${limit}&status=cancelled`,
    config
  );
};

// Show single tailoring-order
const Show = async (id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.get(`${API}tailoring-orders/${id}`, header);
};

const Update = async (data, id) => {
  const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };

  return await Axios.put(`${API}tailoring-orders/${id}`, data, header);
};

const TailoringOrder = {
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

export default TailoringOrder;
