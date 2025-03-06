import  SigninForm  from "./ui/sign-in-form";
import styles from "./page.module.css"
import Link from 'next/link';

export default function SigninPage() {
  return (
    <div className={styles.page}>
        <SigninForm/>
        <Link href="/auth/signup">Don't have an account? Sign up</Link>
    </div>
  );
}