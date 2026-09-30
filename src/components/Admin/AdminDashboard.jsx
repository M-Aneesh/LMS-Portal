import { Outlet } from "react-router-dom";
import Styles from "./_admin.module.css";

const AdminDashboard = () => {
  return (
    <section className={Styles.admin_dashboard}>
      <article className={Styles.admin_container}>
        <Outlet />
      </article>
    </section>
  );
};

export default AdminDashboard;