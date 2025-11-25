import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex rounded-[50px] bg-theme-2 text-theme-5 text-xl w-full h-full px-2 py-4 items-center justify-center space-x-4 shadow-lg">
      <span>Loading</span>
      <div className="relative">
        <Loader2 className="flex inset-0 animate-spin-1 text-amber-600" />
        <Loader2 className="absolute inset-0 animate-spin-3 text-theme-2 z-20" />
        <Loader2 className="absolute inset-0 animate-spin-2 text-orange-600 z-10" />
        <Loader2 className="absolute inset-0 animate-spin-4 text-theme-3 z-30" />
      </div>
    </div>
  );
};

export default Loading;
