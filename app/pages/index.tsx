import type { NextPage } from "next";
import CreateProposal from "../components/CreateProposal";
import ProposalList from "../components/ProposalList";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <CreateProposal />
        <ProposalList />
      </div>
    </div>
  );
};

export default Home;
