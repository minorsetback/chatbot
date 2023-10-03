import Image from "next/image";
//images
import green_dot from "@images/icons/green_dot.svg";
import robot from "@images/icons/robot.svg";
import arrow from "@images/icons/arrow.svg";
import three_dots from "@images/icons/three_dots.svg";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#2228ac] from-0.01% to-97.8% to-[#3c96bd] pt-[27px] pb-[17px] pr-[23px] pl-[23px] border-b border-[#333] shadow-md">
      <div className="flex justify-between items-center">
        <Image src={robot} width={77} height={77} alt="robot" />
        <div>
          <h1 className="text-[#fff] font-inter text-[26px] font-semibold">
            Adam
          </h1>
          <p className="text-[#fff] font-inter text-base tracking-wider font-medium mb-1">
            Il tuo Assistente IA
          </p>
          <p className="text-[#fff] font-inter text-xs tracking-wider font-normal flex gap-[5px]">
            <Image src={green_dot} width={10} height={10} alt="green_dot" />{" "}
            Online per assisterti
          </p>
        </div>
        <div className="flex gap-2.5 mb-[33px]">
          <Image src={arrow} width={28} height={28} alt="arrow" />
          <Image src={three_dots} width={32} height={27} alt="three_dots" />
        </div>
      </div>
    </header>
  );
};

export default Header;
