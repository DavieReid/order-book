import { Column, useTable } from "react-table";
import styles from "./Table.module.css";
interface TableProps<RowData extends Record<string, unknown>> {
  columns: Column<RowData>[];
  data: RowData[];
}

export default function Table<T extends Record<string, unknown>>({
  columns,
  data = [],
}: TableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table className={styles.root} {...getTableProps()}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className={styles.th} {...column.getHeaderProps()}>
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
            <tr className={styles.tr} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className={styles.td} {...cell.getCellProps()}>
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
