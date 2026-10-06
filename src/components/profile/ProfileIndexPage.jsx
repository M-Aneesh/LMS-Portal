import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import EnrollData from "./EnrollData";

const ProfileIndexPage = () => {
  const { user } = useAuth();

  return (
    <aside className={Styles.content}>
      <main>
        <div>
          <strong>Email</strong>
          <span>{user?.email}</span>
        </div>

        <div>
          <strong>Role</strong>
          <span>{user?.role}</span>
        </div>

        <EnrollData />
      </main>
    </aside>
  );
};

export default ProfileIndexPage;