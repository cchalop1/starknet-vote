import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkVote from "../abi/main_abi.json";

export function useVoteContract() {
  return useContract({
    abi: StarkVote as Abi,
    address: "0x01f16149eeb1f0723caf37f62e47e200f4513b22bec775daaa191f126e7db122",
  });
}
