import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Edit2, Trash2 } from "react-feather";
import { Text } from "../../components/text";
import { DataTable } from "../../components/table";
import { Image } from "../../components/image/Index";
import { TitleBar } from "../../components/titleBar";
import { Card } from "../../components/card";
import { Container } from "../../components/container";
import {
  DangerButton,
  PrimaryButton,
  SecondarySMButton,
  SuccessButton,
} from "../../components/button";
import { Toastify } from "../../components/toastify";
import { Images } from "../../utils/images";
import { CustomError } from "../../utils/error";
import { Requests } from "../../utils/http";
import { DeleteModal } from "../../components/modal";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchLoading, setsearchLoading] = useState(false);
  const [isDefault, setDefault] = useState({ id: null, loading: false });
  const [isDelete, setDelete] = useState({
    value: null,
    show: false,
    loading: false,
  });

  // fetch data
  const fetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Element2.Index(page, limit);
        if (response && response.status === 200) {
          console.log(response.data.data);
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
    [limit]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // handle paginate page change
  const handlePageChange = (page) => fetchData(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Element2.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.Search.Element2(data);
    if (response && response.status === 200) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.Element2(value);
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
      setDefault({ id: value, loading: true });
      const response = await Requests.Element2.MakeDefault(value);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
        fetchData(1);
      }
      setDefault({ id: value, loading: true });
    } catch (error) {
      if (error) {
        setDefault({ id: value, loading: true });
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
      name: "Title image",
      selector: (row) =>
        row.title_image ? (
          <Image src={row.title_image} alt="Element image" x={50} y={50} />
        ) : (
          <Image src={Images.Person} alt="" x={50} y={50} />
        ),
      maxWidth: "15px",
    },
    {
      name: "Title",
      sortable: true,
      selector: (row) => row.title || "N/A",
    },
    {
      name: "Priority",
      sortable: true,
      selector: (row) => row.priority,
    },
    {
      name: "Stock Status",
      sortable: true,
      selector: (row) =>
        row?.stock_status ? (
          <Text className="fs-14 mb-0">Available</Text>
        ) : (
          <Text className="fs-14 mb-0">Not available</Text>
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
            <>
              <SecondarySMButton
                className="btn-sm"
                onClick={() => handleDefault(row._id)}
                disabled={row._id === isDefault.id && isDefault.loading}
              >
                <Text className="fs-14 mb-0">
                  {row._id === isDefault.id && isDefault.loading
                    ? "Loading..."
                    : "Make Default"}
                </Text>
              </SecondarySMButton>
            </>
          )}
        </div>
      ),
    },
    {
      name: "Hidden",
      sortable: true,
      selector: (row) =>
        row.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />,
    },
    {
      name: "Action",
      sortable: true,
      minWidth: "200px",
      selector: (row) => (
        <div>
          <Link to={`/dashboard/elements2/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`/dashboard/elements2/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
          {row.is_default ? (
            <DangerButton onClick={() => Toastify.Error("Can't Be Deleted")}>
              <Trash2 size={18} />
            </DangerButton>
          ) : (
            <DangerButton
              onClick={() =>
                setDelete({ value: row._id, show: true, loading: false })
              }
            >
              <Trash2 size={18} />
            </DangerButton>
          )}
        </div>
      ),
    },
  ];

  // delete element
  const handleElementDelete = async () => {
    try {
      setDelete({ ...isDelete, loading: true });
      const response = await Requests.Element2.Delete(isDelete.value);
      if (response.status) {
        fetchData(1);
        setDelete({ value: null, show: false, loading: false });
      }
    } catch (error) {}
  };

  return (
    <div className="mb-4">
      {/* Title bar */}
      <TitleBar
        mainTitle="Manage Elements"
        subTitle="Manage your elements"
        tag="Home / Elements /"
        pageTag="Manage element"
      />

      {/* Add element button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/elements2/store"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">Add element</Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main element card */}
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
              placeholder={"Search elements"}
              search={handleSearch}
              suggestion={handleSuggestion}
              searchLoading={searchLoading}
              clearSearch={() => fetchData(1)}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>

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
        doDelete={handleElementDelete}
      />
    </div>
  );
};

export default Index;
