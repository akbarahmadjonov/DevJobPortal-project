import { createContext, useContext, useState } from "react";

export const JobContext = createContext();

// export const useJobContext = () => {
//   return useContext(JobContext);
// };

export const JobProvider = ({ children }) => {
  const [companyJob, setCompanyJob] = useState([]);
  // console.log("Context companyJob:", companyJob);

  return (
    <JobContext.Provider value={{ companyJob, setCompanyJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
