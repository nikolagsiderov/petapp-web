"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const MyServicesContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 pl-24 pr-4">
      <div
        className="
    lg:ml-48 lg:mr-20
    pt-12
  "
      >
        {children}
      </div>
    </div>
  );
};

export default MyServicesContainer;
