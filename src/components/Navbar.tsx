"use client";

import React from "react";
import { Button } from "./ui/button";
import "../config";
import * as fcl from "@onflow/fcl";

export default function Navbar() {
  const [user, setUser] = React.useState({ loggedIn: null });

  React.useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const AuthenticatedState = () => {
    return (
      <div className="text-white">
        Address: {user?.addr ?? "No Address"}
        <Button onClick={fcl.unauthenticate}>LogOut</Button>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div>
        <Button onClick={fcl.logIn}>Connect</Button>
      </div>
    );
  };

  return (
    <nav>
      <div className="text-cyan-50">Hello</div>
      <div>
        {user.loggedIn ? <AuthenticatedState /> : <UnauthenticatedState />}
      </div>
    </nav>
  );
}
