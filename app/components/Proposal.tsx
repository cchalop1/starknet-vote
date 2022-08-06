import { useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";
import { Contract } from "starknet";
import { toBN } from "starknet/dist/utils/number";

type ProposalType = {
  id: number;
  // TODO: type for contract from useContract
  contract: any;
};

const Proposal = ({ contract, id }: ProposalType) => {
  const { data, loading } = useStarknetCall({
    contract,
    method: "get_proposal",
    args: [id],
  });

  const proposal = useMemo(() => {
    if (data && data.length > 0) {
      const value = data[0];
      console.log(value.creator)
      // TODO: format object for proposal
      return 
    }
  }, [data]);

  console.log(data, loading);

  return (
    <div className="m-10 p-2">
      <div>bonjour o</div>
    </div>
  );
};

export default Proposal;
