import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertOctagon, Check, Trash2, Eye } from "react-feather";
import { SuccessButton, DangerButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { DeleteModal } from "../../components/modal";

const ERating = () => {
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

  // fetch Rating data
  const fetchRating = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Rating.Index(page, limit);
        if (response && response.status === 200) {
          setData(response.data.body.ratingReview);
          setTotalRows(response.data.body.total);
        }
        setCurrentPage(page);
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
    [currentPage, limit]
  );

  useEffect(() => {
    fetchRating(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchRating(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Rating.Index(page, newPerPage);
    setData(response.data.body.ratingReview);
    setLimit(newPerPage);
    setLoading(false);
  };

  // approve
  const handleApprove = async (data) => {
    try {
      const newData = {
        approve: data.approved === true ? false : true,
      };
      const response = await Requests.Rating.Approve(newData, data._id);
      if (response && response.status) {
        if (data.approved === true) {
          Toastify.Success("Rating Not Approved");
          fetchRating(1);
        } else {
          Toastify.Success("Rating Approved");
          fetchRating(1);
        }
      }
    } catch (error) {}
  };

  // data columns
  const columns = [
    {
      name: "Review",
      selector: (row) => row.review || "N/A",
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.user.name || "N/A",
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row) => row.rating || "N/A",
      sortable: true,
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "250px",
      cell: (row) => (
        <div>
          {row.approved ? (
            <SuccessButton
              type="button"
              className="btn-circle me-1"
              onClick={() => handleApprove(row)}
            >
              <Check size={18} />
            </SuccessButton>
          ) : (
            <SuccessButton
              type="button"
              className="btn-circle me-1"
              onClick={() => handleApprove(row)}
            >
              <AlertOctagon size={18} />
            </SuccessButton>
          )}
          <Link to={`/dashboard/e-rating/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
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
      const data = {
        ratingId: isDelete.value._id,
        productid: isDelete.value.product,
      };
      const response = await Requests.Rating.Delete(data);
      if (response.status) {
        Toastify.Success("Successfully Deleted");
        fetchRating(1);
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
          mainTitle="Manage E-Rating"
          subTitle="Manage your e-rating"
          tag="Home / E-Rating /"
          pageTag="Manage Rating"
        />

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

export default ERating;
