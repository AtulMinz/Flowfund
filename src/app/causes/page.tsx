import Navbar from "@/components/Navbar";
import { Card, CardHeader } from "@/components/ui/card";
import causes from "../../../funds.json";

export default function Causes() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center">
        <div className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          {causes.map((cause, index) => (
            <Card key={index} className="h-[10vh]">
              <CardHeader>{cause.title}</CardHeader>
              <p>{cause.description}</p>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
