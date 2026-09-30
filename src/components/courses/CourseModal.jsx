import Styles from "./_course.module.css";

const CourseModal = ({ course, onClose }) => {
  return (
    <div
      className={Styles.courseModal}
      onClick={onClose}
    >
      <div
        className={Styles.courseModal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={Styles.courseModal__close}
          onClick={onClose}
          aria-label="Close course details"
        >
          &times;
        </button>

        <img
          className={Styles.courseModal__image}
          src={course.thumbnail?.url}
          alt={course.name}
        />

        <div className={Styles.courseModal__body}>
          <h2 className={Styles.courseModal__title}>
            {course.name}
          </h2>

          <p className={Styles.courseModal__description}>
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
            className={Styles.courseModal__enrollButton}
            onClick={() => {
              console.log("Enroll in course:", course._id);
            }}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;