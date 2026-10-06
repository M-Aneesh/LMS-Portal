
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Styles from "./_course.module.css";
import { toast } from "react-hot-toast";

const MAX_SIZE = 2 * 1024 * 1024;

const CourseForm = ({
  initialValues,
  onSubmit,
  isEdit = false,
  existingThumbnail = "",
}) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Course name is required"),

    description: Yup.string()
      .required("Description is required"),

    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0, "Price cannot be negative"),

    estimatedPrice: Yup.number()
      .typeError("Estimated price must be a number")
      .required("Estimated price is required")
      .moreThan(
        Yup.ref("price"),
        "Estimated price must be greater than the actual price"
      ),
      thumbnail: Yup.string().test(
        "required",
        "Thumbnail is required",
        (value) => isEdit || Boolean(value)
        ),
    tags: Yup.string()
      .required("Tags are required"),

    level: Yup.string()
      .oneOf(
        ["Beginner", "Intermediate", "Advance"],
        "Select a valid level"
      )
      .required("Level is required"),

    demoUrl: Yup.string()
      .required("Demo URL is required")
      .url("Enter a valid URL")
      .matches(
        /^https?:\/\//,
        "URL must start with http:// or https://"
      ),

    benefits: Yup.array()
      .of(
        Yup.object({
          title: Yup.string()
            .required("Benefit is required"),
        })
      )
      .min(1, "Add at least one benefit"),

    prerequisites: Yup.array()
      .of(
        Yup.object({
          title: Yup.string()
            .required("Prerequisite is required"),
        })
      )
      .min(1, "Add at least one prerequisite"),
    courseData: Yup.array()
      .of(
        Yup.object({
          title: Yup.string()
            .required("Content title is required"),

          description: Yup.string()
            .required("Content description is required"),

          videoUrl: Yup.string()
            .required("Video URL is required")
            .url("Enter a valid video URL"),

          videoSection: Yup.string()
            .required("Video section is required"),

          videoLength: Yup.number()
            .typeError("Video length must be a number")
            .required("Video length is required")
            .min(0, "Video length cannot be negative"),
        })
      )
      .min(1, "Add at least one course content"),
  });

  return (
    <div className={Styles.courseCard}>
      <div className={Styles.courseCard__content}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className={Styles.courseForm}>

              {/* Course name */}
              <div className={Styles.courseForm__group}>
                <label>Course Name</label>

                <Field
                  type="text"
                  name="name"
                  placeholder="Enter course name"
                  className={Styles.courseForm__input}
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Description */}
              <div className={Styles.courseForm__group}>
                <label>Description</label>

                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter course description"
                  className={Styles.courseForm__textarea}
                />

                <ErrorMessage
                  name="description"
                  component="p"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Price fields */}
              <div className={Styles.courseForm__row}>
                <div className={Styles.courseForm__group}>
                  <label>Price</label>

                  <Field
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    className={Styles.courseForm__input}
                  />

                  <ErrorMessage
                    name="price"
                    component="p"
                    className={Styles.courseForm__error}
                  />
                </div>

                <div className={Styles.courseForm__group}>
                  <label>Estimated Price</label>

                  <Field
                    type="number"
                    name="estimatedPrice"
                    placeholder="Enter estimated price"
                    className={Styles.courseForm__input}
                  />

                  <ErrorMessage
                    name="estimatedPrice"
                    component="p"
                    className={Styles.courseForm__error}
                  />
                </div>
              </div>

              {/* Thumbnail */}
              {/* Thumbnail */}
            <div className={Styles.courseForm__group}>
            <label>Course Thumbnail</label>

            {isEdit && existingThumbnail && !values.thumbnail && (
            <div>
                <p>Current thumbnail:</p>

                <img
                src={
                    typeof existingThumbnail === "string"
                    ? existingThumbnail
                    : existingThumbnail.url
                }
                alt="Current course thumbnail"
                width="180"
                />
            </div>
            )}

            <input
                type="file"
                accept="image/*"
                className={Styles.courseForm__input}
                onChange={(event) => {
                const file = event.currentTarget.files?.[0];

                if (!file) return;

                // Validate file type
                if (!file.type.startsWith("image/")) {
                    toast.error("Only image files are allowed");
                    event.target.value = "";
                    return;
                }

                // Validate file size
                if (file.size > MAX_SIZE) {
                    toast.error("Image must be less than 2MB");
                    event.target.value = "";
                    return;
                }

                const reader = new FileReader();

                reader.onload = () => {
                    setFieldValue("thumbnail", reader.result);
                };

                reader.readAsDataURL(file);
                }}
            />

            <ErrorMessage
                name="thumbnail"
                component="p"
                className={Styles.courseForm__error}
            />

            <p className={Styles.courseForm__helper}>
                Maximum image size: 2MB.
                {isEdit && " Leave empty to keep the current thumbnail."}
            </p>

            {/* New thumbnail preview */}
            {values.thumbnail && (
                <div>
                <p>Thumbnail Preview:</p>

                <img
                    src={values.thumbnail}
                    alt="Course thumbnail preview"
                    width="180"
                />
                </div>
            )}
            </div>

              {/* Tags */}
              <div className={Styles.courseForm__group}>
                <label>Tags</label>

                <Field
                  type="text"
                  name="tags"
                  placeholder="React, JavaScript, Web Development"
                  className={Styles.courseForm__input}
                />

                <ErrorMessage
                  name="tags"
                  component="p"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Level */}
              <div className={Styles.courseForm__group}>
                <label>Course Level</label>

                <Field
                  as="select"
                  name="level"
                  className={Styles.courseForm__input}
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">
                    Intermediate
                  </option>
                  <option value="Advance">Advance</option>
                </Field>

                <ErrorMessage
                  name="level"
                  component="p"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Demo URL */}
              <div className={Styles.courseForm__group}>
                <label>Demo URL</label>

                <Field
                  type="url"
                  name="demoUrl"
                  placeholder="https://example.com"
                  className={Styles.courseForm__input}
                />

                <ErrorMessage
                  name="demoUrl"
                  component="p"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Benefits */}
              <div className={Styles.courseForm__section}>
                <h3>Course Benefits</h3>

                <FieldArray name="benefits">
                  {({ push, remove }) => (
                    <>
                      {values.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className={Styles.courseForm__dynamicRow}
                        >
                          <div
                            className={Styles.courseForm__dynamicField}
                          >
                            <Field
                              name={`benefits.${index}.title`}
                              placeholder="Enter benefit"
                              className={Styles.courseForm__input}
                            />

                            <ErrorMessage
                              name={`benefits.${index}.title`}
                              component="p"
                              className={Styles.courseForm__error}
                            />
                          </div>

                          {values.benefits.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className={Styles.courseForm__removeButton}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => push({ title: "" })}
                        className={Styles.courseForm__addButton}
                      >
                        + Add Benefit
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Prerequisites */}
              <div className={Styles.courseForm__section}>
                <h3>Prerequisites</h3>

                <FieldArray name="prerequisites">
                  {({ push, remove }) => (
                    <>
                      {values.prerequisites.map(
                        (prerequisite, index) => (
                          <div
                            key={index}
                            className={Styles.courseForm__dynamicRow}
                          >
                            <div
                              className={Styles.courseForm__dynamicField}
                            >
                              <Field
                                name={`prerequisites.${index}.title`}
                                placeholder="Enter prerequisite"
                                className={Styles.courseForm__input}
                              />

                              <ErrorMessage
                                name={`prerequisites.${index}.title`}
                                component="p"
                                className={Styles.courseForm__error}
                              />
                            </div>

                            {values.prerequisites.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className={Styles.courseForm__removeButton}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() => push({ title: "" })}
                        className={Styles.courseForm__addButton}
                      >
                        + Add Prerequisite
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              {/* Course Content */}
              <div className={Styles.courseForm__section}>
                <h3>Course Content</h3>

                <FieldArray name="courseData">
                  {({ push, remove }) => (
                    <>
                      {values.courseData.map((content, index) => (
                        <div
                          key={index}
                          className={Styles.courseForm__contentItem}
                        >
                          <div className={Styles.courseForm__dynamicField}>

                            <label>Content Title</label>

                            <Field
                              name={`courseData.${index}.title`}
                              placeholder="Enter content title"
                              className={Styles.courseForm__input}
                            />

                            <ErrorMessage
                              name={`courseData.${index}.title`}
                              component="p"
                              className={Styles.courseForm__error}
                            />

                            <label>Content Description</label>

                            <Field
                              as="textarea"
                              name={`courseData.${index}.description`}
                              placeholder="Enter content description"
                              className={Styles.courseForm__textarea}
                            />

                            <ErrorMessage
                              name={`courseData.${index}.description`}
                              component="p"
                              className={Styles.courseForm__error}
                            />

                            <label>Video URL</label>

                            <Field
                              type="url"
                              name={`courseData.${index}.videoUrl`}
                              placeholder="https://youtube.com/watch?v=..."
                              className={Styles.courseForm__input}
                            />

                            <ErrorMessage
                              name={`courseData.${index}.videoUrl`}
                              component="p"
                              className={Styles.courseForm__error}
                            />

                            <label>Video Section</label>

                            <Field
                              type="text"
                              name={`courseData.${index}.videoSection`}
                              placeholder="Introduction"
                              className={Styles.courseForm__input}
                            />

                            <ErrorMessage
                              name={`courseData.${index}.videoSection`}
                              component="p"
                              className={Styles.courseForm__error}
                            />

                            <label>Video Length</label>

                            <Field
                              type="number"
                              name={`courseData.${index}.videoLength`}
                              placeholder="Video length in minutes"
                              className={Styles.courseForm__input}
                            />

                            <ErrorMessage
                              name={`courseData.${index}.videoLength`}
                              component="p"
                              className={Styles.courseForm__error}
                            />

                            {values.courseData.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className={Styles.courseForm__removeButton}
                              >
                                Remove Content
                              </button>
                            )}

                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          push({
                            title: "",
                            description: "",
                            videoUrl: "",
                            videoSection: "",
                            videoLength: "",
                          })
                        }
                        className={Styles.courseForm__addButton}
                      >
                        + Add Course Content
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={Styles.courseForm__submit}
              >
                {isSubmitting
                  ? "Please wait..."
                  : isEdit
                  ? "Update Course"
                  : "Create Course"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CourseForm;