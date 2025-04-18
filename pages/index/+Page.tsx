import { Link } from "@/components/Link.js";
import { Input } from "@/ui/input.js";
import { Button } from "@/ui/button.js";
import { Bell, MessageSquare, Search } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/ui/avatar.js";
import { PinGrid } from "@/components/pin-grid.js";
import { Header } from "@/components/header.js";

const Head = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-600">
            <span className="text-xl font-bold text-white">
              P
            </span>
          </div>
        </Link>
        <Header />
      </div>
      <div className="flex-1 max-w-xl px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search for ideas"
            className="w-full pl-10 pr-4 py-2.5 rounded-full border-gray-300 bg-gray-100 focus:bg-white"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Head />
      <main className="container max-w-7xl mx-auto px-4 py-6">
        <PinGrid />
      </main>
    </div>
  );
}