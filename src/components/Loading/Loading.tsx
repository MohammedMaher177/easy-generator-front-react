// import { Spinner } from "@radix-ui/themes"
import styles from "./loading.module.css";

type Props = {};

export default function Loading({}: Props) {
  return (
    <span className={styles.loader}></span>
    // <div className="text-center">
    //     <Spinner aria-label="Center-aligned spinner example" />
    //     <h1>LOADING .....</h1>
    // </div>
  );
}
