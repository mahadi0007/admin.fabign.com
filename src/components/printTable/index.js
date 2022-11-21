import React from "react";
import ReactDataTable from "react-data-table-component";
import { NoContent } from "../204";
import { Loader } from "../loading";
import { SearchWithSuggestions } from "../search";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

class DataTable extends React.Component {
  doSomeThing = () => {
    console.log("doSomeThing");
    window.html2canvas = html2canvas;
    // const doc = new jsPDF("p", "pt", "letter");

    var doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      // format: [4, 2]
    });

    var content = document.getElementsByClassName("sc-fLlhyt ifOHjV")[0];
    console.log("content", content);
    console.log("document.body", document.body);
    doc.html(content, {
      callback: function (doc) {
        console.log("in callback");
        doc.save("sample.pdf");
      },
    });
  };
  render() {
    return (
      <ReactDataTable
        columns={this.props.columns}
        data={this.props.data}
        progressPending={this.props.loading}
        progressComponent={<Loader />}
        customStyles={this.props.customStyles}
        noDataComponent={
          <NoContent
            message={this.props.noDataMessage || "No content available."}
          />
        }
        pagination
        paginationServer
        paginationTotalRows={this.props.totalRows}
        onChangeRowsPerPage={this.props.handlePerRowsChange}
        onChangePage={this.props.handlePageChange}
        subHeader={this.props.searchable}
        subHeaderComponent={
          <SearchWithSuggestions
            placeholder={this.props.placeholder}
            searchLoading={this.props.searchLoading}
            search={(query) => this.props.search(query)}
            suggestion={this.props.suggestion}
            clear={() => this.props.clearSearch()}
          />
        }
      />
    );
  }
}

export default DataTable;
