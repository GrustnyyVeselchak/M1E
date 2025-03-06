import styles from "./page.module.css"
import { verifySession } from '../auth/signin/lib/dal';

export default async function DashboardPage() {
  const session = await verifySession();

  return (
    <div className={styles.page}>
      <h1>Dashboard</h1>
      <p>Welcome, User {session.userId}!</p>
    </div>
  );
}