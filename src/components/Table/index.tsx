import React from "react";
import { Column, useTable } from "react-table";
import clsx from "clsx";

import styles from "./Table.module.css";
import { useHighestTotalInBook } from "../../store";
import { getDepthLevel } from "../OrderBook/utils";

interface TableProps<RowData extends Record<string, unknown>> {
  columns: Column<RowData>[];
  data: RowData[];
  headerClassName?: string;
  rowClassName?: string;
}

export default function Table<T extends Record<string, unknown>>({
  columns,
  data = [],
  headerClassName,
  rowClassName,
}: TableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const highestTotalInBook = useHighestTotalInBook();

  // Render the UI for your table
  return (
    <div className={styles.root} {...getTableProps()}>
      <div className={clsx(styles.thead, headerClassName)}>
        {headerGroups.map((headerGroup) => (
          <div className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <span className={styles.th} {...column.getHeaderProps()}>
                {column.render("Header")}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.body} {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          const { totalRaw } = row.original;
          const depthLevel = getDepthLevel(
            totalRaw as number,
            highestTotalInBook
          );

          const depthLevelStyle: React.CSSProperties = {
            backgroundSize: `${depthLevel}% 100%`,
          };

          return (
            <div
              className={clsx(styles.tr, styles.bodyRow, rowClassName)}
              style={depthLevelStyle}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <span className={styles.td} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
