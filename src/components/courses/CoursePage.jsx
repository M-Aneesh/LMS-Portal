import { useEffect, useState } from "react";
import { useAuth } from '../../hooks/FetchUser';
import Styles from "./_course.module.css";
import CourseModal from "./CourseModal";


const CoursePage = () => {
  const { getAllCoursesApi } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectCourse, setSelectCourse] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await getAllCoursesApi();
        console.log(data);
        
        setCourses(data.courses ?? []);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    getCourses();
  }, []);

  const handleViewDetails = (course) => {
    setSelectCourse(course);
  };

  const handleCloseModal = () => {
    setSelectCourse(null);
  };

  return (
    <main className={Styles.coursePage}>
      <header className={Styles.coursePage__header}>
        <h1 className={Styles.coursePage__title}>All Courses</h1>
      </header>

      <section className={Styles.coursePage__grid}>
        {courses.map((course) => (
          <article className={Styles.courseCard} key={course._id}>
            <img
              className={Styles.courseCard__image}
              src={course.thumbnail?.url}
              alt={course.name}
            />

            <div className={Styles.courseCard__content}>
              <h2 className={Styles.courseCard__title}>
                {course.name}
              </h2>

              <p className={Styles.courseCard__description}>
                {course.description}
              </p>

              <button
                className={Styles.courseCard__button}
                onClick={() => handleViewDetails(course)}
              >
                View Details
              </button>
            </div>
          </article>
        ))}
      </section>

      {selectCourse && (
        <CourseModal
          course={selectCourse}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default CoursePage;