"use client";

import { normalize } from "viem/ens";
import { useEnsAddress } from "wagmi";

export default function UserPage({ params }: { params: { topic: string; label: string } }) {
  const x = params.topic !== "eth" ? ".eth" : "";

  const fullname = `${params.label}` + "." + `${params.topic}` + x;

  console.log(fullname);

  const address = useEnsAddress({
    name: normalize(fullname),
    chainId: 1,
  });

  console.log("hey");
  console.log(address.data);
  return <>hi</>;
}
