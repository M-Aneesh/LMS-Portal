import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/FetchUser";
import Styles from "./_order.module.css";

const Createorders = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { getAllCoursesApi, createOrderApi, GetMe } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const data = await getAllCoursesApi();

        const selectedCourse = data.courses?.find(
          (item) => item._id === courseId
        );

        setCourse(selectedCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Unable to load course");
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [courseId]);

  const handleConfirmEnrollment = async () => {
    if (!course) return;

    const confirmEnrollment = window.confirm(
      `Are you sure you want to enroll in ${course.name}?`
    );

    if (!confirmEnrollment) return;

    try {
      setOrdering(true);

      const payload = {
        courseId: course._id,
        payment_info: {
          id: `mock_payment_${Date.now()}`,
          status: "succeeded",
        },
      };

      console.log("Order payload:", payload);

      const response = await createOrderApi(payload);

if (response?.success) {
  await GetMe();

  toast.success("Course enrolled successfully!");

  setTimeout(() => {
    navigate("/courses");
  }, 1500);
      } else {
        toast.error(response?.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Order creation failed:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to create order"
      );
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <main className={Styles.orderPage}>
        <div className={Styles.orderPage__loading}>
          Loading course...
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className={Styles.orderPage}>
        <div className={Styles.orderPage__empty}>
          <h2>Course not found</h2>

          <button
            className={Styles.orderPage__backButton}
            onClick={() => navigate("/courses")}
          >
            Back to Courses
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={Styles.orderPage}>
      <section className={Styles.orderCard}>

        <header className={Styles.orderCard__header}>
          <h1 className={Styles.orderCard__title}>
            Confirm Enrollment
          </h1>

          <p className={Styles.orderCard__subtitle}>
            Review your course details before confirming your enrollment.
          </p>
        </header>

        <div className={Styles.orderCard__course}>

          <img
            className={Styles.orderCard__image}
            src={course.thumbnail?.url}
            alt={course.name}
          />

          <div className={Styles.orderCard__details}>

            <h2 className={Styles.orderCard__courseTitle}>
              {course.name}
            </h2>

            <p className={Styles.orderCard__description}>
              {course.description}
            </p>

            <div className={Styles.orderCard__info}>

              <div className={Styles.orderCard__infoItem}>
                <span>Level</span>
                <strong>{course.level}</strong>
              </div>

              <div className={Styles.orderCard__infoItem}>
                <span>Students</span>
                <strong>{course.purchased ?? 0}</strong>
              </div>

              <div className={Styles.orderCard__infoItem}>
                <span>Rating</span>
                <strong>
                  {course.rating ?? "Not rated"} ⭐
                </strong>
              </div>

            </div>

          </div>
        </div>

        <div className={Styles.orderCard__priceSection}>
          <span>Total Amount</span>

          <strong>
            ₹{course.price}
          </strong>
        </div>

        <div className={Styles.orderCard__actions}>

          <button
            className={Styles.orderCard__cancelButton}
            onClick={() => navigate("/courses")}
            disabled={ordering}
          >
            Cancel
          </button>

          <button
            className={Styles.orderCard__confirmButton}
            onClick={handleConfirmEnrollment}
            disabled={ordering}
          >
            {ordering ? "Processing..." : "Confirm Enrollment"}
          </button>

        </div>

      </section>
    </main>
  );
};

export default Createorders;