export const truncateAddress = (address: string) => {
  if (!address) return;
  if (address.length < 5) return address;
  return (
    address.slice(0, 5) +
    "..." +
    address.slice(address.length - 5, address.length)
  );
};
