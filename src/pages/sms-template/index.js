import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PrimaryButton,
  DangerButton,
  SuccessButton,
} from "../../components/button";
import { Eye, Edit2, Trash2 } from "react-feather";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";
import { Card } from "../../components/card";
import { DeleteModal } from "../../components/modal";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchLoading, setsearchLoading] = useState(false);
  const [sizeProfileDelete, setSizeProfileDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch Size data
  const fetchSize = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Size.Index(page, limit);
        if (response && response.status === 200) {
          setData(response.data.data);
          console.log(response.data.data);
          setTotalRows(response.data.total);
        }
        setLoading(false);
      } catch (error) {
        if (error) {
          console.log("error");
          console.log(error);
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
    fetchSize(1);
  }, [fetchSize]);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchSize(page);
  };
  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Size.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };

  // data columns
  const columns = [
    {
      name: "Profile Name",
      selector: (row) => row.profile_name || "N/A",
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.size || 0,
    },
    {
      name: "Category",
      selector: (row) => row?.category?.title || "N/A",
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/size/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`size/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setSizeProfileDelete({
                ...sizeProfileDelete,
                value: row,
                show: true,
              })
            }
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
    },
  ];

  // delete profiles
  const handleDeleteProfile = async () => {
    try {
      setSizeProfileDelete({ ...sizeProfileDelete, loading: true });
      const response = await Requests.Size.Delete(sizeProfileDelete.value._id);
      if (response && response.status === 200) {
        fetchSize(1);
        Toastify.Success("Size Profile Deleted Successfully");
      }
      setSizeProfileDelete({
        ...sizeProfileDelete,
        loading: false,
        show: false,
      });
    } catch (error) {
      setSizeProfileDelete({
        ...sizeProfileDelete,
        loading: false,
        show: false,
      });
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage SMS Template"
          subTitle="Manage your sms template"
          tag="Home / SMS Template /"
          pageTag="Manage sms template"
        />

        {/* Add sms template button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/sms/sms-template/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add sms template</Text>
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
                // searchable
                // placeholder={"Search"}
                // search={handleSearch}
                // suggestion={handleSuggestion}
                // searchLoading={searchLoading}
                // clearSearch={() => fetchSize(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>
      {/* Delete sub category confirmation modal */}
      <DeleteModal
        show={sizeProfileDelete.show}
        loading={sizeProfileDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {sizeProfileDelete.value ? sizeProfileDelete.value.title : null}{" "}
            sub-category ?
          </Text>
        }
        onHide={() =>
          setSizeProfileDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleDeleteProfile}
      />
    </div>
  );
};

export default Index;
