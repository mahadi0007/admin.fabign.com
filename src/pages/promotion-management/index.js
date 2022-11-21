import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertOctagon, Check, Trash2 } from "react-feather";
import { DangerButton, SuccessButton } from "../../components/button";
import { Container } from "../../components/container";
import { DeleteModal } from "../../components/modal";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import moment from "moment";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [promotionDelete, setPromotionDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch Banner data
  const fetchPromotionData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Promotion.Index(page, limit);
        console.log("response");
        console.log(response);
        if (response && response.status === 200) {
          setData(response.data.body.promotion);
          setTotalRows(response.data.body.total);
        }
        setCurrentPage(page);
        setLoading(false);
      } catch (error) {
        console.log("error");
        console.log(error);
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
    fetchPromotionData(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchPromotionData(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Promotion.Index(page, newPerPage);
    setData(response.data.body.promotion);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle promotion delete
  const handleElementDelete = async () => {
    try {
      setPromotionDelete({ ...promotionDelete, loading: true });
      const response = await Requests.Promotion.Delete(
        promotionDelete.value._id
      );
      if (response.status) {
        Toastify.Success("Successfully Deleted");
        fetchPromotionData(1);
        setPromotionDelete({ value: null, show: false, loading: false });
      }
    } catch (error) {
      Toastify.Error("Can't Be Deleted");
    }
  };

  // approve
  const handleApprove = async (data) => {
    try {
      const newData = {
        approve: data.status === "apporved" ? "pending" : "apporved",
      };
      const response = await Requests.Promotion.Approve(newData, data._id);
      if (response && response.status) {
        if (data.status === "apporved") {
          Toastify.Success("Promotion Not Approved");
          fetchPromotionData(1);
        } else {
          Toastify.Success("Promotion Approved");
          fetchPromotionData(1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // data columns
  const columns = [
    {
      name: "Campaign Title",
      minWidth: "120px",
      selector: (row) => (row?.campaign?.title ? row.campaign.title : "N/A"),
    },
    {
      name: "Promo Code",
      minWidth: "110px",
      selector: (row) => (row.promo_code ? row.promo_code : "N/A"),
    },
    {
      name: "Promo Amount",
      minWidth: "120px",
      selector: (row) => (row.promo_amount ? row.promo_amount : 0),
    },
    {
      name: "Commission after Promotion",
      minWidth: "200px",
      selector: (row) =>
        row.campaign ? row.campaign.sellingPrice - row.promo_amount : 0,
    },
    {
      name: "Valid Until",
      minWidth: "120px",
      selector: (row) =>
        row.endDate ? moment(row.endDate).format("D MMMM, YYYY") : "N/A",
    },
    {
      name: "Redeemed",
      selector: (row) => (row.redeemed ? row.redeemed : 0),
    },
    {
      name: "Status",
      selector: (row) => (row.status ? row.status : "N/A"),
    },
    {
      name: "Created By",
      selector: (row) => (row.user.name ? row.user.name : "N/A"),
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "150px",
      cell: (row) => (
        <div>
          {row.status === "apporved" ? (
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
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setPromotionDelete({ ...promotionDelete, value: row, show: true })
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
          mainTitle="Manage Promotion"
          subTitle="Manage your promotion"
          tag="Home / Promotion /"
          pageTag="Manage promotion"
        />

        {/* Main promotion card */}
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

      {/* Delete e-banner confirmation modal */}
      <DeleteModal
        show={promotionDelete.show}
        loading={promotionDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {promotionDelete.value ? promotionDelete.value.promo_code : null}{" "}
            promo code ?
          </Text>
        }
        onHide={() =>
          setPromotionDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleElementDelete}
      />
    </div>
  );
};

export default Index;
