import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit2, Eye, Trash2 } from "react-feather";
import {
  PrimaryButton,
  SuccessButton,
  DangerButton,
} from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Image } from "../../components/image/Index";
import { Toastify } from "../../components/toastify";
import { DeleteModal } from "../../components/modal";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Images } from "../../utils/images";
import { Requests } from "../../utils/http";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
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
        const response = await Requests.EProduct.Index(page, limit);
        if (response && response.status === 200) {
          setData(response.data.body.product);
          setTotalRows(response.data.body.total);
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

  // Handle submit
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.EProduct.Store(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
      }
      document.getElementById("upload-csv").value = "";
      setLoading(false);
      fetchData(1);
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
  const handlePageChange = (page) => fetchData(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.EProduct.Index(page, newPerPage);
    setData(response.data.body.product);
    setLimit(newPerPage);
    setLoading(false);
  };

  // data columns
  const columns = [
    {
      name: "Title image",
      selector: (row) =>
        row.thumbnail && row.thumbnail.small ? (
          <Image
            src={Requests.HostUrl + row.thumbnail.small}
            alt="Product image"
            x={50}
            y={50}
          />
        ) : (
          <Image src={Images.Person} alt="" x={50} y={50} />
        ),
      maxWidth: "15px",
    },
    {
      name: "Title",
      sortable: true,
      selector: (row) => row.name || "N/A",
      minWidth: "430px",
    },
    {
      name: "Tilte (BN)",
      sortable: true,
      selector: (row) => row.banglaName || "N/A",
      minWidth: "130px",
    },
    {
      name: "Price",
      sortable: true,
      selector: (row) => row.price || 0,
    },
    {
      name: "Brand",
      sortable: true,
      selector: (row) =>
        row.brand && row.brand.title ? row.brand.title : "N/A",
      minWidth: "120px",
    },
    {
      name: "Category",
      sortable: true,
      selector: (row) =>
        row.category && row.category.name ? row.category.name : "N/A",
    },
    {
      name: "Purchase Price",
      sortable: true,
      selector: (row) => row.purchasePrice || 0,
      minWidth: "130px",
    },
    {
      name: "Sale Price",
      sortable: true,
      selector: (row) => row.salePrice || 0,
      minWidth: "130px",
    },
    {
      name: "Discount Type",
      selector: (row) => row.discountType || "N/A",
      sortable: true,
      minWidth: "130px",
    },
    {
      name: "Discount Amount",
      sortable: true,
      selector: (row) => row.discountAmount || 0,
      minWidth: "150px",
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "250px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/e-products/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/e-products/edit/${row._id}`}>
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

  // delete product
  const handleProductDelete = async () => {
    try {
      setDelete({ ...isDelete, loading: true });
      const response = await Requests.EProduct.Delete(isDelete.value);
      if (response.status) {
        Toastify.Success("Successfully Deleted");
        fetchData(1);
        setDelete({ value: null, show: false, loading: false });
      }
    } catch (error) {
      Toastify.Error("Can't Be Deleted");
    }
  };

  return (
    <div className="mb-4">
      {/* Title bar */}
      <TitleBar
        mainTitle="Manage E-Products"
        subTitle="Manage your e-products"
        tag="Home / E-Products /"
        pageTag="Manage e-products"
      />

      {/* Add e-products button */}
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
            console.log(file);
            formData.append("productList", file);
            handleSubmit(formData);
          }}
        />
        <Link to={"/dashboard/e-products/store"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">Add e-products</Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main e-products card */}
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
              // placeholder={"Search elements"}
              // search={handleSearch}
              // suggestion={handleSuggestion}
              // searchLoading={searchLoading}
              // clearSearch={() => fetchData(1)}
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
        doDelete={handleProductDelete}
      />
    </div>
  );
};

export default Index;
