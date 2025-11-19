import { Input } from "./input";

const SearchBar = () => {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-2.5 h-4 w-4 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        placeholder="Search"
        className="pl-9 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 h-8 text-xs"
      />
    </div>
  );
};

export default SearchBar;
