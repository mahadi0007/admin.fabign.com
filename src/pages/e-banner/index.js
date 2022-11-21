import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit2, Trash2 } from "react-feather";
import {
  SuccessButton,
  PrimaryButton,
  DangerButton,
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
  const [bannerDelete, setEBannerDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch Banner data
  const fetchEBanner = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Requests.EBanner.Index();
      console.log(response, "***");
      if (response && response.status === 200) {
        setData(response.data.body);
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
  }, []);

  useEffect(() => {
    fetchEBanner();
  }, [fetchEBanner]);

  // Handle e-banner delete
  const handleEBannerDelete = async () => {
    try {
      setEBannerDelete({ ...bannerDelete, loading: true });
      // const response = await Requests.EBanner.Delete(bannerDelete.value._id);
      // if (response && response.status === 200) {
      //   fetchEBanner(1);
      //   Toastify.Success("Banner Deleted Successfully");
      // }
      setEBannerDelete({ ...bannerDelete, loading: false, show: false });
    } catch (error) {
      setEBannerDelete({ ...bannerDelete, loading: false, show: false });
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
        row.banner ? (
          <Image
            src={Requests.HostUrl + row.banner}
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
      name: "Title",
      selector: (row) => row.title || "N/A",
      sortable: true,
    },
    {
      name: "Details",
      selector: (row) => row.details || "N/A",
      sortable: true,
    },
    {
      name: "Sub Title",
      selector: (row) => row.subTitle || "N/A",
      sortable: true,
    },
    {
      name: "Publish",
      selector: (row) => (row.published === true ? "True" : "False" || "N/A"),
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "180px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/e-banner/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`/dashboard/e-banner/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setEBannerDelete({ ...bannerDelete, value: row, show: true })
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
      {/* Title bar */}
      <TitleBar
        mainTitle="Manage E-banner"
        subTitle="Manage your e-banner"
        tag="Home / E-banner /"
        pageTag="Manage banner"
      />

      {/* Add e-banner button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/e-banner/store"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">Add e-banner</Text>
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
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
      {/* Delete e-slider confirmation modal */}
      <DeleteModal
        show={bannerDelete.show}
        loading={bannerDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {bannerDelete.value ? bannerDelete.value.title : null} banner ?
          </Text>
        }
        onHide={() =>
          setEBannerDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleEBannerDelete}
      />
    </div>
  );
};

export default Index;
