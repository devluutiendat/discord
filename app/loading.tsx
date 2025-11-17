const Loading = () => {
  return (
    <div className="flex items-center justify-center text-gray-700">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
