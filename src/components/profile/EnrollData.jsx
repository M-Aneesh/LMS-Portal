import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EnrollData = () => {
  const {
    user,
    getAllCoursesApi,
    getEnrollCourseApi,
  } = useAuth();

  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEnrolledCourses = async () => {
      if (!user?.courses?.length) {
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }

      try {
        // Get all course details
        const courseResponse = await getAllCoursesApi();
        const allCourses = courseResponse?.courses ?? [];

        console.log("ALL COURSES:", allCourses);
        console.log(
          "ALL COURSES LENGTH:",
          allCourses.length
        );

        // Get IDs of courses the user enrolled in
        const enrolledCourseIds = user.courses.map(
          (course) => course._id
        );

        console.log(
          "ENROLLED COURSE IDS:",
          enrolledCourseIds
        );

        // Get course details + content
        const enrolledData = await Promise.all(
          enrolledCourseIds.map(async (courseId) => {
            const course = allCourses.find(
              (item) => item._id === courseId
            );

            if (!course) {
              return null;
            }

            const contentResponse =
              await getEnrollCourseApi(courseId);

            console.log(
              "CONTENT FOR COURSE:",
              courseId,
              contentResponse
            );

            return {
              courseId,
              course,
              content: contentResponse?.content ?? [],
            };
          })
        );

        setEnrolledCourses(
          enrolledData.filter(
            (item) => item !== null
          )
        );
      } catch (error) {
        console.error(
          "Error fetching enrolled courses:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getEnrolledCourses();
  }, [user]);

  return (
    <section>
      <h2>My Courses</h2>

      {loading && (
        <p>Loading enrolled courses...</p>
      )}

      {!loading &&
        enrolledCourses.length === 0 && (
          <p>
            You haven't enrolled in any courses yet.
          </p>
        )}

      {!loading &&
        enrolledCourses.map((item) => (
          <article
            className={Styles.profileCourse}
            key={item.course?._id}
          >
            <div className={Styles.profileCourse__media}> 
                <img className={Styles.profileCourse__image} src={item.course?.thumbnail?.url} alt={item.course?.name} /> <button className={Styles.profileCourse__askButton}
                     onClick={() => navigate("/ask-question", 
                     { state: { courseId: item.course?._id, courseTitle: item.course?.name, content: item.content, }, 
                     }) } > Ask Question </button> 
            </div>

            {/* Course Details */}
            <div
              className={Styles.profileCourse__details}
            >
              <h3
                className={
                  Styles.profileCourse__title
                }
              >
                {item.course?.name}
              </h3>

              <p
                className={
                  Styles.profileCourse__description
                }
              >
                {item.course?.description}
              </p>

              <p>
                Lessons: {item.content.length}
              </p>

              {/* Course Content */}
              <div
                className={
                  Styles.profileCourse__content
                }
              >
                <h4>Course Content</h4>

                {item.content.length === 0 ? (
                  <p>
                    No course content available.
                  </p>
                ) : (
                  item.content.map((lesson) => (
                    <div
                      className={
                        Styles.profileCourse__lesson
                      }
                      key={lesson._id}
                    >
                      <h5>{lesson.title}</h5>

                      <p>
                        {lesson.description}
                      </p>

                      <div>
                        <span>
                          Section:{" "}
                          {lesson.videoSection}
                        </span>

                        <span>
                          Duration:{" "}
                          {lesson.videoLength} minutes
                        </span>
                      </div>

                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Watch Video
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </article>
        ))}
    </section>
  );
};

export default EnrollData;