import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/FetchUser";
import { toast } from "react-hot-toast";
import Styles from "./_course.module.css";
import CourseForm from "./CourseForm";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getAllCoursesAdminApi,
    editCourseApi,
  } = useAuth();

  const [initialValues, setInitialValues] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllCoursesAdminApi();

        const courses = response.courses ?? [];

        const course = courses.find(
          (item) => item._id === id
        );

        if (!course) {
          setError("Course not found.");
          return;
        }

        // Keep the complete thumbnail object
        // This contains both url and public_id
        setExistingThumbnail(course.thumbnail);
        console.log("FULL COURSE:", course);
console.log("COURSE THUMBNAIL:", course.thumbnail);
        setInitialValues({
          name: course.name || "",
          description: course.description || "",
          price: course.price ?? "",
          estimatedPrice: course.estimatedPrice ?? "",

          // FileReader will put a Base64 string here
          thumbnail: "",

          tags: course.tags || "",
          level: course.level || "",
          demoUrl: course.demoUrl || "",

          benefits:
            course.benefits?.length > 0
              ? course.benefits
              : [{ title: "" }],

          prerequisites:
            course.prerequisites?.length > 0
              ? course.prerequisites
              : [{ title: "" }],
          courseData:
            course.courseData?.length > 0
              ? course.courseData
              : [
                  {
                    title: "",
                    description: "",
                    videoUrl: "",
                    videoSection: "",
                    videoLength: "",
                  },
                ],
        });
      } catch (error) {
        console.error("Fetch course error:", error);

        setError(
          error.response?.data?.message ||
          "Failed to fetch course"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, getAllCoursesAdminApi]);

  const handleEditCourse = async (values) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        estimatedPrice: Number(values.estimatedPrice),
        tags: values.tags,
        level: values.level,
        demoUrl: values.demoUrl,
        benefits: values.benefits,
        prerequisites: values.prerequisites,
        courseData: values.courseData,
      };

      // New thumbnail selected
      if (values.thumbnail) {
        payload.thumbnail = values.thumbnail;

        // Send the existing Cloudinary public_id
        if (
          existingThumbnail &&
          typeof existingThumbnail === "object" &&
          existingThumbnail.public_id
        ) {
          payload.public_id = existingThumbnail.public_id;
        }
      }
//       if (values.thumbnail) {
//   payload.thumbnail = {
//     url: values.thumbnail,
//     public_id: existingThumbnail?.public_id
//   };
// }

     console.log("NEW THUMBNAIL:", values.thumbnail);
console.log("EXISTING THUMBNAIL:", existingThumbnail);
console.log("PUBLIC ID:", existingThumbnail?.public_id);
console.log("FINAL EDIT PAYLOAD:", payload);


      await editCourseApi(id, payload);

      toast.success("Course updated successfully!");

      navigate("/admin/courses");
    } catch (error) {
      console.error("Edit course error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update course"
      );
    }
  };

  if (loading) {
    return <p>Loading course...</p>;
  }

  if (error) {
    return (
      <section className={Styles.coursePage}>
        <p>{error}</p>

        <button
          type="button"
          onClick={() => navigate("/admin/courses")}
        >
          Back to Courses
        </button>
      </section>
    );
  }

  if (!initialValues) {
    return null;
  }

  return (
    <section className={Styles.coursePage}>
      <header className={Styles.coursePage__header}>
        <h2 className={Styles.coursePage__title}>
          Edit Course
        </h2>
      </header>

      <CourseForm
        initialValues={initialValues}
        onSubmit={handleEditCourse}
        isEdit={true}
        existingThumbnail={existingThumbnail}
      />
    </section>
  );
};

export default EditCourse;