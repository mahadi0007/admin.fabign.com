import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";
import {
  DangerButton,
  PrimaryButton,
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
  const [variationDelete, setVariationDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch Banner data
  const fetchVariationData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Variation.Index(page, limit);
        if (response && response.status === 200) {
          setData(response.data.body.variation);
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
    fetchVariationData(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchVariationData(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Variation.Index(page, newPerPage);
    setData(response.data.body.variation);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle variation delete
  const handleVariationDelete = async () => {
    try {
      setVariationDelete({ ...variationDelete, loading: true });
      const response = await Requests.Variation.Delete(
        variationDelete.value._id
      );
      if (response && response.status === 200) {
        fetchVariationData(1);
        Toastify.Success("Slider Deleted Successfully");
      }
      setVariationDelete({ ...variationDelete, loading: false, show: false });
    } catch (error) {
      setVariationDelete({ ...variationDelete, loading: false, show: false });
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
      name: "Variations",
      selector: (row) => row.name || "N/A",
      sortable: true,
    },
    {
      name: "Values",
      selector: (row) => (
        <div
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={row.values}
          style={{ cursor: "pointer" }}
        >
          {row.values && row.values.length > 0
            ? row.values.map((item, i) => {
                return (
                  <span key={i}>
                    {item}
                    {i < row.values.length - 1 ? ", " : null}{" "}
                  </span>
                );
              })
            : "N/A"}
        </div>
      ),
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "150px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/variation/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>

          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setVariationDelete({ ...variationDelete, value: row, show: true })
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
          mainTitle="Manage Variation"
          subTitle="Manage your variation"
          tag="Home / Variation /"
          pageTag="Manage variation"
        />

        {/* Add variation button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/variation/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add variation</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main variation card */}
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
        show={variationDelete.show}
        loading={variationDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {variationDelete.value ? variationDelete.value.name : null}{" "}
            variation ?
          </Text>
        }
        onHide={() =>
          setVariationDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleVariationDelete}
      />
    </div>
  );
};

export default Index;
