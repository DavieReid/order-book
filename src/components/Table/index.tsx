import { Column, useTable } from "react-table";
import clsx from "clsx";
import Big from "big.js";

import styles from "./Table.module.css";
import React from "react";
import { useHighestTotalInBook } from "../../store";

interface TableProps<RowData extends Record<string, unknown>> {
  columns: Column<RowData>[];
  data: RowData[];
  headerClassName?: string;
  rowClassName?: string;
}

function getDepthLevel(levelTotal: number, highTotal: number) {
  const depth = new Big(levelTotal).div(highTotal).times(100);
  return depth.toFixed(2);
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
      <div {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          const { total } = row.original;
          const depthLevel = getDepthLevel(total as number, highestTotalInBook);

          const depthLevelStyle: React.CSSProperties = {
            backgroundSize: `${depthLevel}%`,
          };

          return (
            <div
              className={clsx(styles.tr, styles.bodyRow, rowClassName)}
              style={depthLevelStyle}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <div className={styles.td} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
