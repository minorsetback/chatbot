import Image from "next/image";
import logo from "@images/icons/logo.png";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <span className={styles.footer__wrapper_text}>Powered by</span>
        <Image src={logo} width={90} height={35} alt="logo" />
      </div>
    </footer>
  );
};
export default Footer;
