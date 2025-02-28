import { SignupForm } from "./ui/sign-up-form";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.page}>
        <SignupForm/>
    </div>
  );
}