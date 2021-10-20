import { useAsks } from "../../store";

const AskTable = () => {
  const asks = useAsks();

  console.log(asks);

  return <div>Hello</div>;
};

export default AskTable;
