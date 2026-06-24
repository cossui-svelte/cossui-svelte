import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";

export default function Particle() {
  return (
    <Avatar>
      <AvatarFallback>
        <UserIcon className="size-4" />
      </AvatarFallback>
    </Avatar>
  );
}
