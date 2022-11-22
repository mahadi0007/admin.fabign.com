import React, { useCallback, useEffect, useState } from "react";
import { Edit2 } from "react-feather";
import { Link } from "react-router-dom";
import { PrimaryButton, SuccessButton } from "../../components/button";
import { Container } from "../../components/container";
import { Image } from "../../components/image/Index";
import { DeleteModal } from "../../components/modal";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [categoryDelete, setCategoryDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch e-brand data
  const fetchEBrand = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.EBrand.Index(page, limit);
        if (
          response &&
          response.data &&
          response.data.body &&
          response.status === 200
        ) {
          setData(response.data.body.brand);
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

  useEffect(() => {
    fetchEBrand(1);
  }, [fetchEBrand]);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchEBrand(page);
  };
  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.EBrand.Index(page, newPerPage);
    setData(response.data.body.brand);
    setLimit(newPerPage);
    setLoading(false);
  };
  // Handle category delete
  const handleEBrandDelete = async () => {
    try {
      setCategoryDelete({ ...categoryDelete, loading: true });
      const response = await Requests.EBrand.Delete(categoryDelete.value._id);
      if (response && response.status === 200) {
        fetchEBrand(1);
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
        row.logo ? (
          <Image
            src={Requests.HostUrl + row.logo}
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
      name: "Name",
      selector: (row) => row.title || "N/A",
      sortable: true,
    },
    {
      name: "Product count",
      selector: (row) => row.productCount || "N/A",
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "150px",
      cell: (row) => (
        <div>
          {/* <Link to={`/dashboard/employee-management/profile-show/${row.uid}`}>
                        <SuccessButton
                            type="button"
                            className="btn-circle me-1"
                        ><Eye size={18} />
                        </SuccessButton>
                    </Link> */}

          <Link to={`/dashboard/e-brand/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>

          {/* {row.is_deleteable === true ?
                        <DangerButton
                            type="button"
                            className="btn-circle"
                            onClick={() => setCategoryDelete({ ...categoryDelete, value: row, show: true })}
                        ><Trash2 size={18} />
                        </DangerButton>
                        : null
                    } */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage E-brand"
          subTitle="Manage your e-brand"
          tag="Home / E-Brand /"
          pageTag="Manage brand"
        />

        {/* Add e-brand button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/e-brand/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add e-brand</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main e-brand card */}
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
                // placeholder={"Search"}
                // search={handleSearch}
                // suggestion={handleSuggestion}
                // searchLoading={searchLoading}
                // clearSearch={() => fetchEBrand(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete e-brand confirmation modal */}
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
        doDelete={handleEBrandDelete}
      />
    </div>
  );
};

export default Index;
