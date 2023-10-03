import Image from "next/image";
import logo from "@images/icons/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className=" fixed w-full pt-[14px] pb-[16px] bg-gradient-to-r from-[#2228ac] from-[26.59%] to-[#3c96bd] to-[104.29%]">
      <div className="flex justify-center items-center gap-1.5">
        <span className=" text-[#f9f9f9] font-inter text-xs font-semibold">Powered by</span>
        <Image src={logo} width={90} height={35} alt="logo" />
      </div>
    </footer>
  );
};
export default Footer;