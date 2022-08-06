import { useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";
import { toBN } from "starknet/dist/utils/number";
import { useVoteContract } from "../hooks/useStrarkVote";
import Proposal from "./Proposal";

const ProposalList = () => {
  const { contract } = useVoteContract();
  const { data, loading } = useStarknetCall({
    contract,
    method: "count_proposals",
    args: [],
  });

  const proposalCount = useMemo(() => {
    if (data && data.length > 0) {
      const value = toBN(data[0]);
      return Number(value.toString(10));
    }
  }, [data]);

  if (loading) {
    return <div>loading...</div>;
  }
  
  return (
    <div>
      {Array.from(Array(proposalCount).keys()).map((idx) => (
        <Proposal contract={contract} id={idx} key={idx} />
      ))}
    </div>
  );
};

export default ProposalList;
