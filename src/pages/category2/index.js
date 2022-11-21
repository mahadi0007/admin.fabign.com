import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Eye, EyeOff, Trash2 } from "react-feather";
import {
  DangerButton,
  PrimaryButton,
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
  const [categoryDelete, setCategoryDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch category data
  const fetchCategory = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Category2.Index(page, limit);
        if (response && response.status === 200) {
          console.log(response.data.data);
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
    [limit]
  );

  useEffect(() => {
    fetchCategory(1);
  }, [fetchCategory]);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchCategory(page);
  };
  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Category2.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };
  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.Search.Category2(data);
    if (response.data) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.Category2(value);
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

  // Handle category delete
  const handleCategoryDelete = async () => {
    try {
      setCategoryDelete({ ...categoryDelete, loading: true });
      const response = await Requests.Category2.Delete(
        categoryDelete.value._id
      );
      if (response && response.status === 200) {
        fetchCategory(1);
        Toastify.Success("Category Deleted Successfully");
      }
      setCategoryDelete({ ...categoryDelete, loading: false, show: false });
    } catch (error) {
      setCategoryDelete({ ...categoryDelete, loading: false, show: false });
      if (error) {
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
          <Image
            src={row.title_image}
            className="my-1"
            alt="..."
            x={50}
            y={50}
          />
        ) : (
          "N/A"
        ),
      maxWidth: "15px",
    },
    {
      name: "Main image",
      selector: (row) =>
        row.main_image ? (
          <Image src={row.main_image} alt="..." x={50} y={50} />
        ) : (
          "N/A"
        ),
      maxWidth: "15px",
    },
    {
      name: "Title",
      selector: (row) => row.title || "N/A",
      sortable: true,
    },
    {
      name: "Hidden",
      selector: (row) =>
        row.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />,
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/category2/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/category2/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>

          {row.is_deleteable === true ? (
            <DangerButton
              type="button"
              className="btn-circle"
              onClick={() =>
                setCategoryDelete({
                  ...categoryDelete,
                  value: row,
                  show: true,
                })
              }
            >
              <Trash2 size={18} />
            </DangerButton>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage Category"
          subTitle="Manage your category"
          tag="Home / Category /"
          pageTag="Manage category"
        />

        {/* Add category button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/category2/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add category</Text>
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
                clearSearch={() => fetchCategory(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete Category confirmation modal */}
      <DeleteModal
        show={categoryDelete.show}
        loading={categoryDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {categoryDelete.value ? categoryDelete.value.title : null} category
            ?
          </Text>
        }
        onHide={() =>
          setCategoryDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleCategoryDelete}
      />
    </div>
  );
};

export default Index;
