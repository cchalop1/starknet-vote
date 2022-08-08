import { useStarknetCall } from "@starknet-react/core";
import { useMemo } from "react";
import { Contract } from "starknet";
import { toBN } from "starknet/dist/utils/number";
import { feltToString, stringToFelt } from "../utils/felt";

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
      // console.log(value.creator)
      // console.log(value.max_vote.toNumber())
      console.log(value.creator.toString(16))
      const creator = feltToString(value.text)
      console.log(creator)
      // console.log(value.creator)
      // TODO: format object for proposal
      return 
    }
  }, [data]);

  // console.log(data, loading);

  return (
    <div className="m-10 p-2 rounded border">
      <div>Hello</div>
    </div>
  );
};

export default Proposal;
