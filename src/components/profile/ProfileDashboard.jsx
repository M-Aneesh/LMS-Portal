import React, { Fragment } from "react";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import ProfileSidebar from "./profileSideBar";
import { Outlet } from "react-router-dom";
import Spinner from '../../spinner'

const ProfileDashboard = () => {
  const { user } = useAuth();
  return (
    <section className={Styles.profileDashboard}>
      <article className={Styles.container}>
        {user === null ? (
          <Spinner />
        ) : (
          <>
            <ProfileSidebar />
            <Outlet />
          </>
        )}
      </article>
    </section>
  );
};

export default ProfileDashboard;