import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkVote from "../abi/main_abi.json";

export function useVoteContract() {
  return useContract({
    abi: StarkVote as Abi,
    address: "0x072e977548c926846a2bc652b398c3c45eaed9ef81a34a69bf336969258b45a7",
  });
}
