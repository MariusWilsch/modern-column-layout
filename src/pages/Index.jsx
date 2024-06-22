import React from 'react';

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 min-w-full">
      <div className="flex w-3/4 h-5/6">
        <div className="flex-1 bg-white border border-gray-300 rounded-lg m-2 flex items-center justify-center">
          <h2 className="text-black">Column 1</h2>
        </div>
        <div className="flex-1 bg-green-200 border border-gray-300 rounded-lg m-2 flex items-center justify-center">
          <h2 className="text-black">Column 2</h2>
        </div>
      </div>
    </div>
  );
};

export default Index;