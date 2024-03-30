import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import causes from "../../../funds.json";
import Image from "next/image";

export default function Causes() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center">
        <div className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          {causes.map((cause, index) => (
            <Card key={index} className="p-3">
              <CardContent>
                <img src={cause.image} className="w-[400px] h-[300px]" />
              </CardContent>
              <CardHeader>{cause.title}</CardHeader>
              <CardDescription>
                <p>{cause.description}</p>
              </CardDescription>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
