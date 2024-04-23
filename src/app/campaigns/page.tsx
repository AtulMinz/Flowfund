//@ts-nocheck
"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import causes from "../../../funds.json";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import * as fcl from "@onflow/fcl";
import toast from "react-hot-toast";

export default function Causes() {
  const [value, setValue] = React.useState();

  const transactionFund = async (toAddress: string, amount: string) => {
    const cadence = `
    import FungibleToken from 0x9a0766d93b6608b7
    import FlowToken from 0x7e60df042a9c0868
      transaction(recipient: Address, amount: UFix64) {
        prepare(signer: AuthAccount) {
          let sender = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow Provider reference to the Vault")

          let receiverAccount = getAccount(recipient)

          let receiver = receiverAccount.getCapability(/public/flowTokenReceiver)
          .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
          ??panic("Could not borrow Receiver reference to the Vault")

          let tempVault <- sender.withdraw(amount: amount)
          receiver.deposit(from: <- tempVault)
        }
      }
    `;

    const transactionId = await fcl.mutate({
      cadence,
      limit: 9999,
      args: (arg, t) => [
        arg(toAddress, t.Address),
        arg(Number.parseFloat(amount).toFixed(2), t.UFix64),
      ],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
    });
    const transaction = await fcl.tx(transactionId).onceSealed();
    toast.success("Done!");

    console.log(transaction);
  };
  return (
    <>
      <main className="flex justify-center items-center">
        <div className="w-10/12">
          <div className="min-w-[80vw] grid grid-cols-1 md:grid-cols-3 gap-3">
            {causes.map((cause, index) => (
              <Card key={index} className="m-5">
                <CardContent className="p-2">
                  <img src={cause.image} className="w-[400px] h-[300px]" />
                </CardContent>
                <CardHeader>{cause.title}</CardHeader>
                <CardDescription className="m-2">
                  <p>{cause.description}</p>
                </CardDescription>
                <CardFooter className="flex justify-end">
                  <Dialog classname="">
                    <DialogTrigger asChild>
                      <Button variant={"destructive"}>Fund</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{cause.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="name"
                            type="number"
                            placeholder="Flow quantity"
                            className="col-span-3"
                            onChange={(e) => {
                              setValue(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            transactionFund("0xad537ac6daff46c1", value)
                          }
                        >
                          Pay
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
