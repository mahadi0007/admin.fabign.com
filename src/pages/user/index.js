import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Eye, Trash2 } from "react-feather";
import {
  PrimaryButton,
  SuccessButton,
  DangerButton,
} from "../../components/button";
import { Container } from "../../components/container";
import { Image } from "../../components/image/Index";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { DeleteModal } from "../../components/modal";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchLoading, setsearchLoading] = useState(false);
  const [isDelete, setDelete] = useState({
    value: null,
    show: false,
    loading: false,
  });
  // fetch admin data
  const fetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.User.Index(page, perPage);
        if (response && response.status === 200) {
          setData(response.data.data);
          setTotalRows(
            response.data.pagination ? response.data.pagination.items : 0
          );
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
    [perPage]
  );

  // Handle submit
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.User.Store(data);
      console.log("response");
      console.log(response);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      document.getElementById("upload-csv").value = "";
      fetchData(1);
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
        fetchData(1);
      }
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchData(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.User.Index(page, newPerPage);
    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.Search.User(data);
    if (response.data) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.User(value);
    if (response && response.data.data && response.data.data.length) {
      for (let i = 0; i < response.data.data.length; i++) {
        const element = response.data.data[i];
        data.results.push(element.name);
      }
    } else {
      data.message = "No results found";
    }
    return data;
  };

  // delete user
  const handleUserDelete = async () => {
    try {
      setDelete({ ...isDelete, loading: true });
      const response = await Requests.User.Delete(isDelete.value);
      if (response.status) {
        Toastify.Success("Successfully Deleted");
        fetchData(1);
        setDelete({ value: null, show: false, loading: false });
      }
    } catch (error) {
      Toastify.Error("Can't Be Deleted");
    }
  };

  // data columns
  const columns = [
    {
      name: "Image",
      selector: (row) =>
        row.image ? <Image src={row.image} alt="..." x={50} y={50} /> : "N/A",
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name || "N/A",
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row.phone || "N/A",
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.email || "N/A",
    },
    {
      name: "Gender",
      sortable: true,
      selector: (row) => row.gender || "N/A",
    },
    {
      name: "Marital Status",
      sortable: true,
      selector: (row) => row.maritalStatus || "N/A",
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/user/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/user/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>

          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setDelete({ ...isDelete, value: row._id, show: true })
            }
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage User"
          subTitle="Manage your user"
          tag="Home / User /"
          pageTag="Manage user"
        />

        {/* Add category button */}
        <Container.Column className="text-end">
          <label
            htmlFor="upload-csv"
            className="btn custom-btn-primary px-4 mb-3 me-2 shadow-none"
          >
            <Text className="fs-15 mb-0 ">Import CSV</Text>
          </label>
          <input
            type="file"
            className="upload d-none"
            id="upload-csv"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={async (event) => {
              const formData = new FormData();
              const file = event.target.files[0];
              formData.append("userList", file);
              handleSubmit(formData);
            }}
          />

          <Link to={"/dashboard/user/create"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add User</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main category card */}
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Body>
              <DataTable
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
                clearSearch={() => fetchData(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>
      {/* Delete Modal */}
      <DeleteModal
        show={isDelete.show}
        loading={isDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete {isDelete.value ? isDelete.value.title : null} ?
          </Text>
        }
        onHide={() => setDelete({ value: null, show: false, loading: false })}
        doDelete={handleUserDelete}
      />
    </div>
  );
};

export default Index;
