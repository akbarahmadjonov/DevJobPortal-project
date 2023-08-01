import { useNavigate } from "react-router-dom";

export default function Verify(params) {
  const navigate = useNavigate();
  const { email, fullName, userName } = JSON.parse(
    localStorage.getItem("userData")
  );
  const logOut = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  return (
    <>
      <div
        className={`bg-white relative drop-shadow-2xl transition-shadow shadow-blue-700 mt-[100px] flex flex-col items-center justify-center h-[800px] text-[#707ff4] backdrop-blur-md w-full p-[40px] `}
      >
        <h1 className="text-7xl font-bold">
          Welcome <span className="underline">{fullName}</span>.
        </h1>
        <div className="w-full flex items-center justify-between text-4xl m-[40px]">
          <p>Email: {email}</p>
          <p>UserName: {userName}</p>
        </div>
        <button
          onClick={logOut}
          className="bg-red-600 text-4xl px-[40px] py-[20px] rounded-md hover:bg-red-500 active:bg-red-700 text-white font-bold absolute right-[50px] bottom-10"
        >
          Log Out
        </button>
      </div>
    </>
  );
}
