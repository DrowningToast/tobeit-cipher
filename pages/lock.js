const Lock = () => {
  return (
    <div className="min-h-screen relative bg-red-700 grid place-items-center text-5xl font-bold font-tech">
      {/* <Confetti className="absolute inset-0" /> */}

      <h1 className="text-white">{"Incorrect, this device is locked"}</h1>
    </div>
  );
};

export default Lock;
