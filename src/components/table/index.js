import React, { useRef, forwardRef, useImperativeHandle } from "react";
import ReactDataTable from "react-data-table-component";
import { NoContent } from "../204";
import { Loader } from "../loading";
import { SearchWithSuggestions } from "../search";

export const DataTable = forwardRef((props, ref) => {
  const searchRef = useRef(null);
  useImperativeHandle(ref, () => ({
    searchValueClear() {
      searchRef.current.queryClear();
    },
  }));
  return (
    <ReactDataTable
      columns={props.columns}
      data={props.data}
      progressPending={props.loading}
      progressComponent={<Loader />}
      customStyles={props.customStyles}
      noDataComponent={
        <NoContent message={props.noDataMessage || "No content available."} />
      }
      pagination
      paginationServer
      paginationTotalRows={props.totalRows}
      paginationDefaultPage={props.currentPage && props.currentPage}
      onChangeRowsPerPage={props.handlePerRowsChange}
      onChangePage={props.handlePageChange}
      subHeader={props.searchable}
      expandableRows={props.expandableRows}
      expandableRowsComponent={props.expandableRowsComponent}
      expandOnRowClicked={props.expandOnRowClicked}
      expandOnRowDoubleClicked={props.expandOnRowDoubleClicked}
      expandableRowsHideExpander={props.expandableRowsHideExpander}
      expandableRowDisabled={props.expandableRowDisabled}
      subHeaderComponent={
        <SearchWithSuggestions
          ref={searchRef}
          placeholder={props.placeholder}
          searchLoading={props.searchLoading}
          search={(query) => props.search(query)}
          suggestion={props.suggestion}
          clear={() => props.clearSearch()}
        />
      }
    />
  );
});
