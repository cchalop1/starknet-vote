import { useStarknetCall, useStarknetInvoke } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { Option } from "./Proposal";

type ProposalOptionProps = {
  id: number;
  contract: any;
  option: Option;
};

const ProposalOption = (props: ProposalOptionProps) => {
  const { invoke, error } = useStarknetInvoke({
    contract: props.contract,
    method: "vote_for_proposal",
  });

  const { data, loading } = useStarknetCall({
    contract: props.contract,
    method: "get_proposal_answers",
    args: [props.id, props.option.id],
  });

  const [vote, setVote] = useState(0);

  useEffect(() => {
    if (data) {
      setVote(data.amount.toNumber());
    }
  }, [data]);

  const voteForOption = async (optionId: number) => {
    const args = [props.id, optionId];
    const res = await invoke({
      args,
    }).catch((e) => {
      console.error(e);
    });
    console.log(res);
    // TODO: lisen event
  };

  return (
    <button
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={() => {
        voteForOption(props.option.id);
      }}
    >
      {props.option.text} - {vote}
    </button>
  );
};

export default ProposalOption;
