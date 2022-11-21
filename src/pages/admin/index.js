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
        const response = await Requests.Admin.Index(page, perPage);
        if (response && response.status === 200) {
          setData(response.data.data);
          setTotalRows(response.data.total);
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
    const response = await Requests.Admin.Index(page, newPerPage);
    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.Search.Admin(data);
    if (response.data) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.Admin(value);
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

  // delete admin
  const handleAdminDelete = async () => {
    try {
      setDelete({ ...isDelete, loading: true });
      const response = await Requests.Admin.Delete(isDelete.value);
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
      name: "",
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
      name: "Role",
      sortable: true,
      selector: (row) => row.role || "N/A",
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status || "N/A",
    },
    {
      name: "Online",
      sortable: true,
      selector: (row) => row.isOnline || "N/A",
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/admin/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/admin/edit/${row._id}`}>
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
          mainTitle="Manage Admin"
          subTitle="Manage your admin"
          tag="Home / Admin /"
          pageTag="Manage admin"
        />

        {/* Add category button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/admin/create"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add admin</Text>
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
        doDelete={handleAdminDelete}
      />
    </div>
  );
};

export default Index;
