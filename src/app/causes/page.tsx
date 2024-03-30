import Navbar from "@/components/Navbar";
import { Card, CardHeader } from "@/components/ui/card";

export default function Causes() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center">
        <div className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="h-[10vh] w-[350px]">
            <CardHeader>Cause 1</CardHeader>
          </Card>
          <Card className="h-[10vh] w-[350px]">
            <CardHeader>Cause 2</CardHeader>
          </Card>
          <Card className="h-[10vh] w-[350px]">
            <CardHeader>Cause 3</CardHeader>
          </Card>
          <Card className="h-[10vh] w-[350px]">
            <CardHeader>Cause 4</CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
}
