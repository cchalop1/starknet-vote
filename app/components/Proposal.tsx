import { useStarknetCall, useStarknetInvoke } from "@starknet-react/core";
import { useMemo, useState } from "react";
import { Contract } from "starknet";
import { toBN } from "starknet/dist/utils/number";
import { feltToString, stringToFelt } from "../utils/felt";
import * as IPFS from "ipfs-core";
import ProposalOption from "./ProposalOption";

type ProposalType = {
  id: number;
  // TODO: type for contract from useContract
  contract: any;
};

export type Option = {
  id: number;
  text: string;
};

const Proposal = ({ contract, id }: ProposalType) => {
  const [proposalContent, setProposalContent] = useState<any>(null);

  const { data, loading } = useStarknetCall({
    contract,
    method: "get_proposal",
    args: [id],
  });

  const { data: ipfsData } = useStarknetCall({
    contract,
    method: "view_proposal_text",
    args: [id],
  });

  const proposal = useMemo(() => {
    if (data && data.length > 0) {
      const value = data[0];
      return {
        creator: value.creator.toString(16),
        max_vote: value.max_vote.toNumber(),
      };
    }
  }, [data]);
  const proposal_content = useMemo(async () => {
    if (ipfsData && ipfsData.length > 0) {
      const firstPart = ipfsData.text1.toString();
      const secondePart = ipfsData.text2.toString();

      const ipfsHash =
        feltToString(toBN(firstPart)) + feltToString(toBN(secondePart));

      try {
        const res = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
        const json = await res.json();
        setProposalContent(json);
      } catch (e) {}

      return {
        options: [],
      };
    }
  }, [ipfsData]);

  if (!proposal || !proposalContent) return <div></div>;
  return (
    <div className="m-10 p-2 rounded border">
      <div className="font-bold">{proposalContent.text}</div>
      <div className="">0x{proposal.creator}</div>
      <div className="mt-2 flex">
        {proposalContent.options.map((option, key) => (
          <ProposalOption
            key={key}
            contract={contract}
            id={id}
            option={{ id, text: option }}
          />
        ))}
      </div>
    </div>
  );
};

export default Proposal;
