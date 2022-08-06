import { useState } from "react";

const CreateProposal = () => {
  const [data, setData] = useState({ text: "", max_vote: 0 });

  const createProposal = () => {


  };

  return (
    <div>
      <input
        className="w-full"
        type="text"
        value={data.text}
        onChange={(e) => setData({ ...data, text: e.target.value })}
        placeholder="What are your favorite project on Starknet ?"
      />
      <input
        type="number"
        placeholder="number of options"
        value={data.max_vote}
        onChange={(e) => setData({ ...data, max_vote: Number(e.target.value) })}
      />
      <button onClick={createProposal}>Create</button>
      {/* TODO: list of options */}
    </div>
  );
};

export default CreateProposal;
