import Navbar from "@/components/Navbar";
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

export default function Causes() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center">
        <div className="min-w-[80vw] grid grid-cols-1 md:grid-cols-3 gap-3">
          {causes.map((cause, index) => (
            <Card key={index} className="p-2">
              <CardContent>
                <img src={cause.image} className="w-[400px] h-[300px]" />
              </CardContent>
              <CardHeader>{cause.title}</CardHeader>
              <CardDescription>
                <p>{cause.description}</p>
              </CardDescription>
              <CardFooter className="flex justify-end">
                <Dialog>
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
                          Name
                        </Label>
                        <Input
                          id="name"
                          type="number"
                          placeholder="pay via flow"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="destructive">Pay</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
