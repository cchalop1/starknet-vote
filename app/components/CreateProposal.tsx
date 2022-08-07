import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import * as IPFS from "ipfs-core";

type ProposalContent = {
  text: string;
  options: Array<string>;
};

const CreateProposal = () => {
  const [data, setData] = useState<ProposalContent>({
    text: "",
    options: [""],
  });

  const createProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.options.length === 0) {
      alert("You need to add some options");
      return;
    }
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add(JSON.stringify(data));
    console.info(cid.toString());
    // TODO: call contract create proposal
    console.log(data);
  };

  const addOption = () => {
    setData({ ...data, options: [...data.options, ""] });
  };

  const deleteOption = (idxToDelete: number) => {
    setData({
      ...data,
      options: data.options.filter((_, idx) => idx !== idxToDelete),
    });
  };
  return (
    <div className="pt-8">
      <form onSubmit={createProposal}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Vote Content
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          required
          value={data.text}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          placeholder="What are your favorite project on Starknet ?"
        />
        <div className="flex flex-col">
          {data.options.map((option, idx) => (
            <div key={idx} className="flex items-center mt-2">
              <input
                className="shadow appearance-none border w-1/3 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={option}
                required
                placeholder={`option ${idx}`}
                onChange={(e) => {
                  let options: Array<string> = data.options;
                  options[idx] = e.target.value;
                  setData({ ...data, options });
                }}
              />
              <FiTrash2
                className="cursor-pointer ml-2"
                size={20}
                onClick={() => deleteOption(idx)}
              />
            </div>
          ))}
        </div>
        <FiPlus className="cursor-pointer mt-2" onClick={addOption} size={20} />
        <div className="flex justify-center mt-4 w-full">
          <button
            className="py-2 px-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full text-center mr-2 mb-2"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProposal;
