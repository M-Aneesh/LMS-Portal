import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import { useEffect, useState } from "react";

// let courses = [
//   {
//     course_name: "reactjs",
//     trainer: "shashi",
//     duration: "1month",
//     price: 10000,
//     date: "10/5/2026",
//   },
//   {
//     course_name: "spring",
//     trainer: "dixit",
//     duration: "1month",
//     price: 10000,
//     date: "11/5/2026",
//   },
// ];
const ProfileIndexPage = () => {
  const { user , getAllCoursesApi} = useAuth();
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
        {/* <div className={Styles.courses}>
          {courses?.map((course) => {
            return (
              <main key={course?._id}>
                <h1>{course.name}</h1>
                <p>
                  <span>level</span> <span>{course?.level}</span>
                </p>
                <p>
                  <span>tags</span> <span>{course?.tags}</span>
                </p>
                <p>
                  <span>price</span> <span>{course?.price}</span>
                </p>
              </main>
            );
          })}

        </div> */}
      </main>
    </aside>
  );
};

export default ProfileIndexPage;