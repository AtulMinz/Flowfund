"use client";

import React from "react";
import { Button } from "./ui/button";
import "../config";
import * as fcl from "@onflow/fcl";
import { ModeToggle } from "./theme-switcher";

export default function Navbar() {
  const [user, setUser] = React.useState({ loggedIn: null });

  React.useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const AuthenticatedState = () => {
    return (
      <div>
        <span className="leading-7 [&:not(:first-child)]:mt-6 p-1">
          {user?.addr ?? "No Address"}
        </span>
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
      <div className="flex justify-end p-4 gap-3">
        <ModeToggle />
        {user.loggedIn ? <AuthenticatedState /> : <UnauthenticatedState />}
      </div>
    </nav>
  );
}
