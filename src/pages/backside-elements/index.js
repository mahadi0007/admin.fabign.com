import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "../../components/button";
import { Toastify } from "../../components/toastify";
import { Images } from "../../utils/images";
import { CustomError } from "../../utils/error";
import { Requests } from "../../utils/http";
import { Trash2 } from "react-feather";
import { DeleteModal } from "../../components/modal";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  // const [searchLoading, setsearchLoading] = useState(false)
  const [isDefault, setDefault] = useState({ id: null, loading: false });
  const [elementDelete, setElementDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch data
  const fetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.BacksideElement.Index(page, limit);
        console.log(response);
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
    const response = await Requests.BacksideElement.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle search
  // const handleSearch = async data => {
  //     setsearchLoading(true)
  //     const response = await Requests.Search.BacksideElement(data)
  //     if (response && response.status === 200) setData(response.data.data)
  //     setsearchLoading(false)
  // }

  // Handle search suggestion
  // const handleSuggestion = async (value) => {
  //     let data = {
  //         results: [],
  //         message: null
  //     }
  //     const response = await Requests.Search.BacksideElement(value)
  //     if (response && response.data.data && response.data.data.length) {
  //         for (let i = 0; i < response.data.data.length; i++) {
  //             const element = response.data.data[i]
  //             data.results.push(element.title)
  //         }
  //     } else {
  //         data.message = "No results found"
  //     }
  //     return data
  // }

  // Handle default
  // const handleDefault = async (value) => {
  //     try {
  //         setDefault({ id: value, loading: true })
  //         const response = await Requests.Element.MakeDefault(value)
  //         if (response && response.status === 201) {
  //             Toastify.Success(response.data.message)
  //             fetchData(1)
  //         }
  //         setDefault({ id: value, loading: true })
  //     } catch (error) {
  //         if (error) {
  //             setDefault({ id: value, loading: true })
  //             if (error.response) {
  //                 await CustomError(error.response)
  //             } else {
  //                 Toastify.Error("Something going wrong.")
  //             }
  //         }
  //     }
  // }

  // data columns

  // make default
  const handleDefault = async (value) => {
    console.log(value);
    try {
      setDefault({ id: value._id, loading: true });

      const data = {
        element_id: value._id,
        category_id: value.category._id,
      };

      const response = await Requests.BacksideElement.MakeDefault(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
        fetchData(1);
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

  // delete back elements
  const handleDelete = async (data) => {
    try {
      setElementDelete({ ...elementDelete, loading: true });
      const response = await Requests.BacksideElement.Delete(
        elementDelete.value._id
      );
      if (response && response.status === 200) {
        fetchData(1);
        Toastify.Success("Element Deleted Successfully");
      }
      setElementDelete({ ...elementDelete, show: false, loading: false });
    } catch (error) {
      if (error) {
        setElementDelete({ ...elementDelete, show: false, loading: false });
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

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
      name: "Price",
      sortable: true,
      selector: (row) => row.price || 0,
    },
    {
      name: "Priority",
      sortable: true,
      selector: (row) => row.priority,
    },
    {
      name: "Category",
      selector: (row) => (row.category && row.category.title) || "N/A",
      sortable: true,
    },
    {
      name: "Default",
      minWidth: "150px",
      selector: (row) => (
        <div className="">
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
      minWidth: "150px",
      cell: (row) => (
        <div>
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setElementDelete({ ...elementDelete, value: row, show: true })
            }
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-4">
      {/* Title bar */}
      <TitleBar
        mainTitle="Manage Backside Elements"
        subTitle="Manage your backside elements"
        tag="Home / Backside elements /"
        pageTag="Manage backside element"
      />

      {/* Add backside element button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/backside-elements/store"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">Add backside element</Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main backside element card */}
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

              // searchable
              // placeholder={"Search backside elements"}
              // search={handleSearch}
              // suggestion={handleSuggestion}
              // searchLoading={searchLoading}
              // clearSearch={() => fetchData(1)}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
      {/* Delete Button confirmation modal */}
      <DeleteModal
        show={elementDelete.show}
        loading={elementDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {elementDelete.value ? elementDelete.value.title : null} ?
          </Text>
        }
        onHide={() =>
          setElementDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleDelete}
      />
    </div>
  );
};

export default Index;
