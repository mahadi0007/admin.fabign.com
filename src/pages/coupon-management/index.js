import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertOctagon, Check, Trash2, Eye, Edit2 } from "react-feather";
import {
  PrimaryButton,
  DangerButton,
  SuccessButton,
} from "../../components/button";
import { Container } from "../../components/container";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [couponDelete, setCouponDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch Banner data
  const fetchPromotionData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Coupon.Index(page, limit);
        console.log("response");
        console.log(response);
        if (response && response.status === 200) {
          setData(response.data.body.coupon);
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
    fetchPromotionData(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchPromotionData(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Coupon.Index(page, newPerPage);
    setData(response.data.body.coupon);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle promotion delete
  const handleElementDelete = async () => {
    try {
      setCouponDelete({ ...couponDelete, loading: true });
      const response = await Requests.Coupon.Delete(couponDelete.value._id);
      if (response.status) {
        Toastify.Success("Successfully Deleted");
        fetchPromotionData(1);
        setCouponDelete({ value: null, show: false, loading: false });
      }
    } catch (error) {
      Toastify.Error("Can't Be Deleted");
    }
  };

  // approve
  const handleApprove = async (data) => {
    try {
      const newData = {
        status: data.status === "apporved" ? "pending" : "apporved",
      };
      const response = await Requests.Coupon.Update(newData, data._id);
      if (response && response.status) {
        if (data.status === "apporved") {
          Toastify.Success("Coupon Not Approved");
          fetchPromotionData(1);
        } else {
          Toastify.Success("Coupon Approved");
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
      name: "Coupon Code",
      minWidth: "110px",
      selector: (row) => (row.coupon_code ? row.coupon_code : "N/A"),
    },
    {
      name: "Coupon Amount",
      minWidth: "120px",
      selector: (row) => (row.coupon_amount ? row.coupon_amount : 0),
    },
    {
      name: "Product",
      sortable: true,
      minWidth: "200px",
      selector: (row) => (
        <ul className="pl-3 my-2">
          {row.products &&
            row.products.map((item, i) => (
              <li key={i}>
                <p className="text-capitalize mb-1">{item.name}</p>
              </li>
            ))}
        </ul>
      ),
    },
    {
      name: "Valid Until",
      minWidth: "120px",
      selector: (row) => (row.endDate ? row.endDate : "N/A"),
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
      selector: (row) => (row.created_by.name ? row.created_by.name : "N/A"),
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "250px",
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
          <Link to={`/dashboard/coupon-management/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/coupon-management/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setCouponDelete({ ...couponDelete, value: row, show: true })
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
          mainTitle="Manage Coupon"
          subTitle="Manage your coupon"
          tag="Home / Coupon /"
          pageTag="Manage coupon"
        />

        {/* Add e-banner button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/coupon-management/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add Coupon</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

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
        show={couponDelete.show}
        loading={couponDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {couponDelete.value ? couponDelete.value.coupon_code : null} coupon
            code ?
          </Text>
        }
        onHide={() =>
          setCouponDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleElementDelete}
      />
    </div>
  );
};

export default Index;
