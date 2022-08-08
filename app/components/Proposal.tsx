import { useStarknetCall } from "@starknet-react/core";
import { useMemo, useState } from "react";
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
      return {
        creator: value.creator.toString(16),
        max_vote: value.max_vote.toNumber(),
        text: "",
        options: ["option 1"],
      };
    }
  }, [data]);

  // console.log(data, loading);

  if (!proposal) return <div></div>;
  return (
    <div className="m-10 p-2 rounded border">
      <div>Hello</div>
      <div className="">0x{proposal.creator}</div>
      <div className="mt-2 flex">
        {proposal.options.map((option, key) => (
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" key={key}>{option}</button>
        ))}
      </div>
    </div>
  );
};

export default Proposal;
