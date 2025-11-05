import React from "react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base } from "viem/chains";
import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const PRICE_PER_LITER = "0.001"; // in ETH, adjust as needed

const chains = [base];
const projectId = "YOUR_WALLETCONNECT_PROJECT_ID";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="relative">
            <Header />

            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-32 pb-20">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl -z-10"></div>
                <div className="text-center max-w-5xl mx-auto">
                  <div className="inline-block mb-4">
                    <span className="inline-flex items-center px-6 py-2 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-300">
                      🚀 Built on Base Network • Fast & Secure
                    </span>
                  </div>
                  <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight">
                    Fuel Delivery Reimagined with Blockchain
                  </h1>
                  <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Experience seamless fuel delivery with crypto payments on
                    Base's low-fee blockchain network. Order from anywhere,
                    track in real-time.
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:scale-105 transition duration-300 shadow-lg shadow-purple-500/25">
                      Order Now
                    </button>
                    <button className="bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition duration-300 border border-white/20">
                      Learn More
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition duration-300">
                      <div className="text-3xl font-bold text-blue-400">
                        24/7
                      </div>
                      <div className="text-gray-400 mt-2">Delivery Service</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition duration-300">
                      <div className="text-3xl font-bold text-purple-400">
                        0.1%
                      </div>
                      <div className="text-gray-400 mt-2">Transaction Fee</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition duration-300">
                      <div className="text-3xl font-bold text-pink-400">
                        100%
                      </div>
                      <div className="text-gray-400 mt-2">Secure Payments</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent"></div>
              <div className="container mx-auto px-4 relative">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Why Choose FuelBase?
                  </h2>
                  <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                    Experience the future of fuel delivery with our
                    blockchain-powered platform
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <FeatureCard
                    icon="🏠"
                    title="On-demand Delivery"
                    description="Order fuel directly from your home or business location with real-time tracking"
                  />
                  <FeatureCard
                    icon="💸"
                    title="Crypto Payments"
                    description="Secure and fast payments using Base tokens with minimal transaction fees"
                  />
                  <FeatureCard
                    icon="📍"
                    title="Real-time Tracking"
                    description="Monitor your order and delivery status directly on the blockchain"
                  />
                </div>
              </div>
            </section>

            {/* Order Section */}
            <section className="container mx-auto px-4 py-20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl -z-10"></div>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Place Your Order
                  </h2>
                  <p className="text-gray-400 mt-4">
                    Quick and secure fuel delivery at your doorstep
                  </p>
                </div>
                <OrderForm
                  contractAddress={CONTRACT_ADDRESS}
                  pricePerLiter={PRICE_PER_LITER}
                />
              </div>
            </section>

            {/* Order History Section */}
            <section className="py-20 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent"></div>
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Your Orders
                  </h2>
                  <p className="text-gray-400 mt-4">
                    Track and manage your fuel delivery orders
                  </p>
                </div>
                <OrderHistory contractAddress={CONTRACT_ADDRESS} />
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-12 relative">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                  <div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                      <span className="text-2xl">⛽</span>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        FuelBase
                      </h3>
                    </div>
                    <p className="text-gray-400">
                      Revolutionary fuel delivery on the Base Network
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-purple-400">
                      Quick Links
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-400 hover:text-white cursor-pointer">
                        About Us
                      </p>
                      <p className="text-gray-400 hover:text-white cursor-pointer">
                        How It Works
                      </p>
                      <p className="text-gray-400 hover:text-white cursor-pointer">
                        FAQ
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-purple-400">
                      Connect
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-400 hover:text-white cursor-pointer">
                        Twitter
                      </p>
                      <p className="text-gray-400 hover:text-white cursor-pointer">
                        Discord
                      </p>
                      <p className="text-gray-400 hover:text-white cursor-pointer">
                        GitHub
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8 pt-8 border-t border-gray-800">
                  <p className="text-gray-400">
                    Built on Base Network • Powered by Smart Contracts
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="group relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
    <div className="relative bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition duration-300">
      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition duration-300">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default App;
