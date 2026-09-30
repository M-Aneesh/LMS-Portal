
import { useAuth } from "../../hooks/FetchUser";
import { toast } from "react-hot-toast";
import Styles from "./_course.module.css";
import CourseForm from "./CourseForm";

const initialValues = {
  name: "",
  description: "",
  price: "",
  estimatedPrice: "",
  thumbnail: "",
  tags: "",
  level: "",
  demoUrl: "",
  benefits: [{ title: "" }],
  prerequisites: [{ title: "" }],
};

const CreateCourse = () => {
  const { createCourseApi } = useAuth();

  const handleCreateCourse = async (values, { resetForm }) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        estimatedPrice: Number(values.estimatedPrice),
        thumbnail: values.thumbnail,
        tags: values.tags,
        level: values.level,
        demoUrl: values.demoUrl,
        benefits: values.benefits,
        prerequisites: values.prerequisites,
      };

      await createCourseApi(payload);

      toast.success("Course created successfully!");

      resetForm();
    } catch (error) {
      console.error("Create course error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to create course"
      );
    }
  };

  return (
    <section className={Styles.coursePage}>
      <header className={Styles.coursePage__header}>
        <h2 className={Styles.coursePage__title}>
          Create Course
        </h2>
      </header>

      <CourseForm
        initialValues={initialValues}
        onSubmit={handleCreateCourse}
      />
    </section>
  );
};

export default CreateCourse;