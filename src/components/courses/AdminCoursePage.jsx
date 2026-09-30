import { useEffect, useState } from "react";
import { useAuth } from '../../hooks/FetchUser';
import Styles from "./_course.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";


const AdminCoursePage = () => {
    const navigate = useNavigate();
    const { getAllCoursesAdminApi } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getAdminCourses = async () => {
            try {
                const data = await getAllCoursesAdminApi();
                console.log(data);

                setCourses(data.courses ?? []);
            } catch (error) {
                console.log("Error fetching courses:", error);
            }
        };

        getAdminCourses();
    }, []);

    return (
        <main className={Styles.coursePage}>
            <header className={Styles.coursePage__header}>
                <h1 className={Styles.coursePage__title}>All Courses</h1>

                <Link
                    to="/admin/create-courses"
                    className={Styles.coursePage__createButton}> + Create Course</Link>
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

                            <div className={Styles.courseModal__details}>
                                <div className={Styles.courseModal__detail}>
                                    <span>Level</span>
                                    <strong>{course.level}</strong>
                                </div>

                                <div className={Styles.courseModal__detail}>
                                    <span>Rating</span>
                                    <strong>{course.rating ?? "Not rated"} ⭐</strong>
                                </div>

                                <div className={Styles.courseModal__detail}>
                                    <span>Students Enrolled</span>
                                    <strong>{course.purchased ?? 0}</strong>
                                </div>

                                <div className={Styles.courseModal__detail}>
                                    <span>Price</span>
                                    <strong>₹{course.price}</strong>
                                </div>
                            </div>
                            {course.benefits?.length > 0 && (
                                <div className={Styles.courseModal__section}>
                                    <h3>What You'll Learn</h3>
                                    <ul>
                                        {course.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {course.prerequisites?.length > 0 && (
                                <div className={Styles.courseModal__section}>
                                    <h3>Prerequisites</h3>
                                    <ul>
                                        {course.prerequisites.map((item, index) => (
                                            <li key={index}>{item.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button
                                className={Styles.courseCard__editButton}
                                onClick={() => navigate(`/admin/edit-courses/${course._id}`)}
                            >
                                Edit Course
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default AdminCoursePage;

