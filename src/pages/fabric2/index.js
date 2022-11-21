import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Eye, EyeOff, Trash2 } from "react-feather";
import {
  DangerButton,
  PrimaryButton,
  SecondarySMButton,
  SuccessButton,
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
  const [limit, setLimit] = useState(10);
  const [searchLoading, setsearchLoading] = useState(false);
  const [isDefault, setDefault] = useState({ id: null, loading: false });
  const [fabricDelete, setFabricDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch febric data
  const fetchFebric = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Fabric2.Index(page, limit);
        console.log(response, "index");
        if (response && response.status === 200) {
          setData(response.data.data);
          setTotalRows(response.data.data.length);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error) {
          setLoading(false);
          if (error?.response) {
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
    fetchFebric(1);
  }, [fetchFebric]);

  // handle paginate page change
  const handlePageChange = (page) => fetchFebric(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Fabric2.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };
  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.Search.Fabric2(data);
    if (response.data) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.Fabric2(value);
    if (response && response.data.data && response.data.data.length) {
      for (let i = 0; i < response.data.data.length; i++) {
        const element = response.data.data[i];
        data.results.push(element.title);
      }
    } else {
      data.message = "No results found";
    }
    return data;
  };

  // Handle default
  const handleDefault = async (value) => {
    try {
      setDefault({ id: value._id, loading: true });

      const data = {
        id: value._id,
        category: value.category,
      };

      const response = await Requests.Fabric2.MakeDefault(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
        fetchFebric(1);
      }

      setDefault({ id: value._id, loading: true });
    } catch (error) {
      if (error) {
        setDefault({ id: value._id, loading: true });
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  // handle fabric Delete
  const handleFabricDelete = async () => {
    try {
      setFabricDelete({ ...fabricDelete, loading: true });
      const response = await Requests.Fabric2.Delete(fabricDelete.value._id);
      if (response && response.status === 200) {
        fetchFebric(1);
        Toastify.Success("Fabric Deleted Successfully");
      }
      setFabricDelete({ ...fabricDelete, show: false, loading: false });
    } catch (error) {
      if (error) {
        setFabricDelete({ ...fabricDelete, show: false, loading: false });
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
      name: "Image",
      maxWidth: "100px",
      selector: (row) =>
        row.main_image ? (
          <Image
            src={row.main_image}
            className="my-1"
            alt="..."
            x={50}
            y={50}
          />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Title",
      selector: (row) => row.title || "N/A",
    },
    {
      name: "Original Price",
      sortable: true,
      selector: (row) => row.original_price || 0,
    },
    {
      name: "Hidden",
      sortable: true,
      selector: (row) =>
        row.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />,
    },
    {
      name: "Stock Status",
      sortable: true,
      selector: (row) =>
        row.stock_status ? (
          <Text className="fs-14 text-success mb-0 p-2">Active</Text>
        ) : (
          <Text className="fs-14 text-danger mb-0 p-2">Deactive</Text>
        ),
    },
    {
      name: "Default",
      minWidth: "150px",
      selector: (row) => (
        <div>
          {row.is_default ? (
            <Text className="fs-14 text-success mb-0">Default</Text>
          ) : (
            <SecondarySMButton
              className="btn-sm"
              onClick={() => handleDefault(row)}
              disabled={row._id === isDefault.id && isDefault.loading}
            >
              <Text className="fs-14 mb-0">
                {row._id === isDefault.id && isDefault.loading
                  ? "Loading..."
                  : "Make Default"}
              </Text>
            </SecondarySMButton>
          )}
        </div>
      ),
    },
    {
      name: "Action",
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/fabric2/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/fabric2/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setFabricDelete({ ...fabricDelete, value: row, show: true })
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
          mainTitle="Manage fabric"
          subTitle="Manage your fabrics"
          tag="Home / Fabric /"
          pageTag="Manage fabric"
        />

        {/* Add fabric button */}
        <Container.Column className="text-end">
          <Link to={`/dashboard/fabric2/store`}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add fabric</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main fabric card */}
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
                clearSearch={() => fetchFebric(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete fabric confirmation modal */}
      <DeleteModal
        show={fabricDelete.show}
        loading={fabricDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {fabricDelete.value ? fabricDelete.value.title : null} ?
          </Text>
        }
        onHide={() =>
          setFabricDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleFabricDelete}
      />
    </div>
  );
};

export default Index;
