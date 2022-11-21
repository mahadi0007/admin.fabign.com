import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, PenTool, Trash2 } from "react-feather";
import {
  SuccessButton,
  PrimaryButton,
  DangerButton,
} from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { DeleteModal } from "../../components/modal";

const EAdditionalInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setDelete] = useState({
    value: null,
    show: false,
    loading: false,
  });

  // fetch Additional Info
  const fetchAdditionalInfo = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.EAdditionalInfo.Index(page, limit);
        if (response && response.status === 200) {
          setData(
            response.data && response.data.body && response.data.body.info
          );
          setTotalRows(response.data.body.total);
        }
        setCurrentPage(page);
        setLoading(false);
      } catch (error) {
        if (error) {
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
    [currentPage, limit]
  );

  useEffect(() => {
    fetchAdditionalInfo(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchAdditionalInfo(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.EAdditionalInfo.Index(page, newPerPage);
    setData(response.data.body.info);
    setLimit(newPerPage);
    setLoading(false);
  };

  // data columns
  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product.name || "N/A",
      sortable: true,
    },
    {
      name: "Number of FAQ",
      selector: (row) => row.info.length || "N/A",
      sortable: true,
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "350px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/e-AdditionalInfo/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`/dashboard/e-AdditionalInfo/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <PenTool size={18} />
            </SuccessButton>
          </Link>

          <DangerButton
            type="button"
            className="btn-circle me-1"
            onClick={() => setDelete({ ...isDelete, value: row, show: true })}
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
    },
  ];

  const handleElementDelete = async () => {
    try {
      setDelete({ ...isDelete, loading: true });
      const response = await Requests.EAdditionalInfo.Delete(
        isDelete.value._id
      );
      if (response.status) {
        Toastify.Success("Successfully Deleted");
        fetchAdditionalInfo(1);
        setDelete({ value: null, show: false, loading: false });
      }
    } catch (error) {
      Toastify.Error("Can't Be Deleted");
    }
  };

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage E-AdditionalInfo"
          subTitle="Manage your e-AdditionalInfo"
          tag="Home / E-AdditionalInfo /"
          pageTag="Manage AdditionalInfo"
        />

        {/* Add e-AdditionalInfo button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/e-AdditionalInfo/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add e-AdditionalInfo</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>
        {/* Main e-slider card */}
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Body>
              <DataTable
                columns={columns}
                data={data}
                loading={loading}
                totalRows={totalRows}
                currentPage={currentPage}
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
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
        doDelete={handleElementDelete}
      />
    </div>
  );
};

export default EAdditionalInfo;
