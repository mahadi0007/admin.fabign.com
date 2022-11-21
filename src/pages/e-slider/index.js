import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit2, Trash2 } from "react-feather";
import {
  DangerButton,
  PrimaryButton,
  SuccessButton,
} from "../../components/button";
import { Container } from "../../components/container";
import { DeleteModal } from "../../components/modal";
import { Image } from "../../components/image/Index";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import parse from "html-react-parser";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [sliderDelete, setESliderDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch Banner data
  const fetchESlider = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await Requests.ESlider.Index(page);
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
    fetchESlider(1);
  }, [fetchESlider]);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchESlider(page);
  };

  // Handle e-slider delete
  const handleESliderDelete = async () => {
    try {
      setESliderDelete({ ...sliderDelete, loading: true });
      const response = await Requests.ESlider.Delete(sliderDelete.value._id);
      if (response && response.status === 200) {
        fetchESlider(1);
        Toastify.Success("Slider Deleted Successfully");
      }
      setESliderDelete({ ...sliderDelete, loading: false, show: false });
    } catch (error) {
      setESliderDelete({ ...sliderDelete, loading: false, show: false });
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
      selector: (row) => parse(row.title) || "N/A",
      sortable: true,
    },
    {
      name: "Details",
      selector: (row) => parse(row.details) || "N/A",
      sortable: true,
    },
    {
      name: "Publish",
      selector: (row) => (row.publish === true ? "True" : "False" || "N/A"),
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "180px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/e-slider/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`/dashboard/e-slider/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>

          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setESliderDelete({ ...sliderDelete, value: row, show: true })
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
          mainTitle="Manage E-slider"
          subTitle="Manage your e-slider"
          tag="Home / E-slider /"
          pageTag="Manage slider"
        />

        {/* Add e-banner button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/e-slider/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add e-slider</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main e-banner card */}
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Body>
              <DataTable
                columns={columns}
                data={data}
                loading={loading}
                totalRows={totalRows}
                handlePageChange={handlePageChange}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete e-slider confirmation modal */}
      <DeleteModal
        show={sliderDelete.show}
        loading={sliderDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {sliderDelete.value ? sliderDelete.value.title : null} slider ?
          </Text>
        }
        onHide={() =>
          setESliderDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleESliderDelete}
      />
    </div>
  );
};

export default Index;
