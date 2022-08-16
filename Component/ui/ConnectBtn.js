import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
export const YourApp = ({ name, price, setIsMounted }) => {
  const router = useRouter();
  let i = 0;
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                // i++z
                return (
                  <button
                    className="btn  connect-btn mb-2"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <img
                      className="icon-space"
                      src={"/bitc.png"}
                      style={{ height: "21.17px" }}
                    />{" "}
                    {name} {price}
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              setIsMounted(true);

              return (
                <>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      className="btn  connect-btn mb-0"
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 32, height: 32 }}
                            />
                          )}
                        </div>
                      )}
                      Change Chain
                    </button>
                    <button
                      style={{ background: "red" }}
                      className="btn   connect-btn mb-2"
                      onClick={openAccountModal}
                      type="button"
                    >
                      ({account.displayName})
                       {" "}Disconnect
                    </button>
                  </div>
                  {/* <p style={{width: '100%', justifyContent: 'center',alignItems: 'center', textAlign: 'center'}}>Clik to select Chain</p> */}
                </>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
