import { networkInterfaces } from "os";

export default function ipAddresses() {
  return Array.from(
    new Set(
      Object.values(networkInterfaces())
        .flat()
        .filter((iface) => iface && !iface.internal)
        .map((iface) => iface!.address)
    )
  );
}
