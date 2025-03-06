import { SignupForm } from "./ui/sign-up-form";
import styles from "./page.module.css"
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className={styles.page}>
        <SignupForm/>
        <Link href="/auth/signin">Don't have an account? Sign up</Link>
    </div>
  );
}