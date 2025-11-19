import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const User = () => {
  return (
    <div className="p-4 border-t border-slate-700 space-y-3">
      <div className="flex items-center gap-3 px-2">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-purple-600 text-white font-bold">
            A
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">Antonio E.</p>
          <p className="text-xs text-slate-400 truncate">Online</p>
        </div>
      </div>
    </div>
  );
};

export default User;
