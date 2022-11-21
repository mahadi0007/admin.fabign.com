import React, { useState, forwardRef, useImperativeHandle } from "react";
import { DataTable } from "../table";

export const ExpandableRow = forwardRef((props, ref) => {
  const [updatedVariationData, setUpdatedVariationData] = useState([]);
  const columns = [
    {
      name: "SKU",
      sortable: true,
      selector: (row) => row.sku || "N/A",
      minWidth: "130px",
    },
    {
      name: "Value",
      sortable: true,
      selector: (row) => row.value || "N/A",
      minWidth: "130px",
    },
    {
      name: "Manage Stock",
      sortable: true,
      selector: (row) => "Yes",
      minWidth: "130px",
    },
    {
      name: "Stock Status",
      selector: (row) => "In Stock",
      sortable: true,
      minWidth: "130px",
    },
    {
      name: "Previous Stock",
      sortable: true,
      selector: (row) => (
        <div>
          <input
            type="number"
            name="stockamount"
            min={0}
            className="form-control shadow-none"
            placeholder="Enter price"
            defaultValue={row.stockAmount ? row.stockAmount : 0}
            readOnly
          />
        </div>
      ),
      minWidth: "150px",
    },
    {
      name: "Update Stock",
      sortable: true,
      selector: (row) => (
        <div>
          <input
            type="number"
            // name="stockamount"
            min={0}
            className="form-control shadow-none"
            placeholder="Enter price"
            defaultValue={row.stockAmount ? row.stockAmount : 0}
            //   onChange={(event) => handleStockVariation(row, event.target.value)}
            onChange={async (event) => {
              let value = event.target.value;
              console.log(value, row._id, row.productId);
              let newArr = [...updatedVariationData];
              if (newArr.find((i) => i.id === row.productId)) {
                console.log("if 1");
                console.log(newArr);
                let currentVariation = [
                  ...newArr.find((i) => i.id === row.productId).variation,
                ];
                console.log("currentVariation");
                console.log(currentVariation);
                console.log(currentVariation.find((i) => i.id === row._id));
                if (currentVariation.find((i) => i.id === row._id)) {
                  currentVariation.find((i) => i.id === row._id).stockAmount =
                    value;
                  console.log("if currentVariation");
                  console.log(currentVariation);
                } else {
                  currentVariation.push({
                    id: row._id,
                    stockAmount: value,
                  });
                  console.log("else currentVariation");
                  console.log(currentVariation);
                }
                newArr.find((i) => i.id === row.productId).variation =
                  currentVariation;
                console.log("updated newArr");
                console.log(newArr);
                props.updateVariation(newArr);
                setUpdatedVariationData(newArr);
              } else {
                console.log("else 3");
                console.log("currentupdatedVariationData");
                let newArr = [...updatedVariationData];
                console.log(newArr);
                newArr.push({
                  id: row.productId,
                  variation: [
                    {
                      id: row._id,
                      stockAmount: value,
                    },
                  ],
                });
                console.log("updated newArr");
                console.log(newArr);
                props.updateVariation(newArr);
                setUpdatedVariationData(newArr);
              }
            }}
          />
        </div>
      ),
      minWidth: "150px",
    },
  ];

  useImperativeHandle(ref, () => ({
    getData() {
      return updatedVariationData;
    },
  }));
  return <DataTable columns={columns} data={props.data} />;
});
