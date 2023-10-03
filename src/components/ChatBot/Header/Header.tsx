import Image from "next/image";
import styles from "./Header.module.scss";
//images
import green_dot from "@images/icons/green_dot.svg";
import robot from "@images/icons/robot.svg";
import arrow from "@images/icons/arrow.svg";
import three_dots from "@images/icons/three_dots.svg";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Image src={robot} width={77} height={77} alt="robot" />
        <div>
          <h1 className={styles.header__title}>Adam</h1>
          <p className={styles.header__subtitle}>Il tuo Assistente IA</p>
          <p className={styles.header__status}>
            <Image src={green_dot} width={10} height={10} alt="green_dot" />{" "}
            Online per assisterti
          </p>
        </div>
        <div className={styles.header__options}>
          <Image src={arrow} width={28} height={28} alt="arrow" />
          <Image src={three_dots} width={32} height={27} alt="three_dots" />
        </div>
      </div>
    </header>
  );
};

export default Header;
