import type { NextPage } from "next";
import CreateProposal from "../components/CreateProposal";
import ProposalList from "../components/ProposalList";

const Home: NextPage = () => {
  return (
    <div className="">
      <CreateProposal />
      <ProposalList />
    </div>
  );
};

export default Home;
