import { useStarknet } from "@starknet-react/core";

const Header = () => {
  const { account, connect, connectors } = useStarknet();

  const connectWallet = () => {
    console.log(connectors);
    if (connectors.length === 0) {
      alert(
        "You must need install a stacknet wallet for interact with this app"
      );
      return;
    }
    connect(connectors[0]);
  };

  return (
    <div className="h-12 border-b flex items-center justify-between p-2">
      <div className="text-xl font-bold cursor-pointer">StarkNet - Vote</div>
      <div>
        {account ? (
          account
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
};
export default Header;
