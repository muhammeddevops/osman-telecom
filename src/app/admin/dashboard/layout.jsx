import dbConnect from "@/db/config";
import { Inter } from "next/font/google";
import NavBar from "./dbComponents/Navbar";
import SideBar from "./dbComponents/SideBar";
// core styles are required for all packages
import "@mantine/core/styles.css";

const inter = Inter({ subsets: ["latin"] });

const navbarStyle = {
  width: "85%",
  height: "100%",
  position: "absolute",
  top: "0px",
  right: "0px",
};

// const gridStyles = {
//   display: "grid",
//   // gridTemplateColumns: "1fr 5fr",
//   gridGap: "10px",
// };

const leftColumnStyles = {
  backgroundColor: "#EFEFEF",
};

const rightColumnStyles = {
  backgroundColor: "#DDD",
};

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  await dbConnect();

  return (
    <main>
      <div
        // className={gridStyles}
        // className="grid grid-cols-2"
        className={`${inter.className} flex flex-row`}
      >
        <div className="bg-green-500">
          <SideBar />
        </div>

        <div className=" flex flex-col w-full h-full m-0">
          <div
            className={navbarStyle}
            // className="w-5/6 absolute top-0 right-0 m-0"
          >
            <NavBar />
          </div>

          <div className="flex-initial w-full  pt-[90px] pl-[50px]">
            {children}
          </div>
        </div>
        {/* */}
      </div>
    </main>
  );
}