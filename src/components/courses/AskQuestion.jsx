import Styles from "./_course.module.css";
import { useAuth } from "../../hooks/FetchUser";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const AskQuestion = () => {
  const { addQuestionApi } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    courseId,
    courseTitle,
    content = [],
  } = location.state || {};

  const validationSchema = Yup.object({
    contentId: Yup.string().required(
      "Please select a lesson"
    ),

    question: Yup.string()
      .trim()
      .required("Please enter your question")
      .min(
        5,
        "Question must be at least 5 characters"
      ),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const payload = {
        question: values.question,
        courseId: courseId,
        contentId: values.contentId,
      };

      console.log(
        "QUESTION PAYLOAD:",
        payload
      );

      const response =
        await addQuestionApi(payload);

      console.log(
        "QUESTION RESPONSE:",
        response
      );

      toast.success(
        "Question submitted successfully!"
      );

      resetForm();

      navigate("/user/profile");
    } catch (error) {
      console.error(
        "Error submitting question:",
        error
      );

      toast.error(
        "Failed to submit question. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
    If someone directly opens /ask-question
    without coming from EnrollData, there will
    be no course information.
  */
  if (!courseId || !courseTitle) {
    return (
      <section
        className={Styles.askQuestion}
      >
        <div
          className={
            Styles.askQuestion__card
          }
        >
          <h2>Ask Question</h2>

          <p>
            Course information is missing.
            Please go back to your profile
            and select a course.
          </p>

          <button
            onClick={() =>
              navigate("/profile")
            }
          >
            Go to Profile
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={Styles.askQuestion}
    >
      <div
        className={
          Styles.askQuestion__card
        }
      >
        <h2>Ask a Question</h2>

        {/* Course Title */}
        <div
          className={
            Styles.askQuestion__course
          }
        >
          <label>Course</label>

          <h3>{courseTitle}</h3>
        </div>

        <Formik
          initialValues={{
            contentId: "",
            question: "",
          }}
          validationSchema={
            validationSchema
          }
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* Lesson Dropdown */}
              <div
                className={
                  Styles.askQuestion__field
                }
              >
                <label htmlFor="contentId">
                  Select Lesson
                </label>

                <Field
                  as="select"
                  id="contentId"
                  name="contentId"
                >
                  <option value="">
                    -- Select a lesson --
                  </option>

                  {content.map((lesson) => (
                    <option
                      key={lesson._id}
                      value={lesson._id}
                    >
                      {lesson.title}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="contentId"
                  component="p"
                  className={Styles.error}
                />
              </div>

              {/* Question */}
              <div
                className={
                  Styles.askQuestion__field
                }
              >
                <label htmlFor="question">
                  Your Question
                </label>

                <Field
                  as="textarea"
                  id="question"
                  name="question"
                  rows="6"
                  placeholder="Enter your question about this lesson..."
                />

                <ErrorMessage
                  name="question"
                  component="p"
                  className={Styles.error}
                />
              </div>

              {/* Actions */}
              <div
                className={
                  Styles.askQuestion__actions
                }
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate(-1)
                  }
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Question"}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default AskQuestion;