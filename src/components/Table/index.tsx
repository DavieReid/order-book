import { Column, useTable } from "react-table";
import "./Table.css";

const defaultColumns = [
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Total",
    accessor: "total",
  },
];

interface TableProps<RowData extends Record<string, unknown>> {
  columns?: Column<RowData>[];
  data: RowData[];
}

export default function Table<T extends Record<string, unknown>>({
  columns = defaultColumns,
  data = [],
}: TableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table className="table-root" {...getTableProps()}>
      <thead className="thead">
        {headerGroups.map((headerGroup) => (
          <tr className="tr" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="th" {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr className="tr" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className="td" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
