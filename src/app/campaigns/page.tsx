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
  const transactionFund = async (deposit) => {
    const transactionId = await fcl.mutate({
      cadence: `
      import Payfund from 0x0311f7cb910e8830
      transaction(deposit: String) {
        prepare(signer: AuthAccount) {
        }
  
        execute {
          Payfund.payflow(deposits: deposit)
          log("Done!")
        }
      }
      `,

      args: (arg, t) => [arg(deposit, t.String)],
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
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => transactionFund("0xad537ac6daff46c1")}
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
