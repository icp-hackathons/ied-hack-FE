import { AuthClient } from "@dfinity/auth-client";

const MAX_TTL = BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000);

export async function connectToNNS() {
  let authClient = await AuthClient.create();

  // start the login process and wait for it to finish
  await authClient?.login({
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app"
        : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
    onError: async () => {
      throw new Error("Unable to connect to nns");
    },
    maxTimeToLive: MAX_TTL,
  });

  return authClient;
}
