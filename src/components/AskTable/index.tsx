import { useMemo } from "react";
import clsx from "clsx";
import { useAsks } from "../../store";
import PriceCell from "../OrderBook/PriceCell";
import Table from "../Table";

import styles from "./AskTable.module.css";
import { mapOrdersToRowData, OrderBookRowData } from "../OrderBook/utils";

const columns = [
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }: { value: string }) => (
      <PriceCell side="ask" value={value} />
    ),
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

const AskTable = () => {
  const asks = useAsks();
  const data = useMemo(() => mapOrdersToRowData(asks), [asks]);

  return (
    <Table<OrderBookRowData>
      columns={columns}
      data={data}
      rowClassName={clsx(styles.depthLevel)}
    />
  );
};

export default AskTable;
