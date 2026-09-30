import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../hooks/FetchUser';
import toast from 'react-hot-toast'
import Styles from "./_course.module.css";

const MAX_SIZE = 2 * 1024 * 1024;

const initialValues = {
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    thumbnail: null,
    tags: '',
    level: '',
    demoUrl: '',
    benefits: [
        {
            title: '',
        }
    ],
    prerequisites: [
        {
            title: '',
        }
    ],
    courseData:[
        {
            title:'',
            description:'',
            videoUrl:'',
            videoSection:'',
            videoLength:'',
        }
    ]
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Course name is required"),

  description: Yup.string()
    .required("Course description is required"),

  price: Yup.number()
    .typeError("Enter a valid price")
    .min(0, "Price cannot be negative")
    .required("Course price is required"),

  estimatedPrice: Yup.number()
    .typeError("Enter a valid estimated price")
    .moreThan(
      Yup.ref("price"),
      "Estimated price should be greater than price"
    )
    .required("Estimated price is required"),

  thumbnail: Yup.mixed()
    .required("Course thumbnail is required")
    .test(
      "fileType",
      "Please upload a valid image",
      (file) => !file || file.type.startsWith("image/")
    )
    .test(
      "fileSize",
      "Image size should be less than 2MB",
      (file) => !file || file.size <= MAX_SIZE
    ),

  tags: Yup.string()
    .required("Course tags are required"),

  level: Yup.string()
    .oneOf(
      ["Beginner", "Intermediate", "Advance"],
      "Please select a valid course level"
    )
    .required("Course level is required"),

  demoUrl: Yup.string()
    .required("Demo URL is required")
    .matches(
      /^https?:\/\//,
      "URL must start with http:// or https://"
    )
    .url("Please enter a valid URL"),

  benefits: Yup.array().of(
    Yup.object({
      title: Yup.string()
        .required("Please enter at least one benefit"),
    })
  ),

  prerequisites: Yup.array().of(
    Yup.object({
      title: Yup.string()
        .required("Please enter at least one prerequisite"),
    })
  ),
});
const CreateCourse =  () => {
    const {createCourseApi} = useAuth()
    const handleCreateCourse = async(values , {resetForm})=>{
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

        // courseData is intentionally omitted for now
      };

      console.log("Course payload:", payload);

      const response = await createCourseApi(payload);

      console.log("Course created:", response);

      toast.success("Course created successfully!");

      resetForm();
    } catch (error) {
      console.error(
        "Error creating course:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create course"
      );
    }
  };

  return (
  <div className={Styles.coursePage}>
    <div className={Styles.coursePage__header}>
      <h1 className={Styles.coursePage__title}>
        Create Course
      </h1>
    </div>

    <div className={Styles.courseCard}>
      <div className={Styles.courseCard__content}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateCourse}
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className={Styles.courseForm}>

              {/* Course Name */}
              <div className={Styles.courseForm__group}>
                <label htmlFor="name">Course Name</label>

                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter course name"
                  className={Styles.courseForm__input}
                />

                <ErrorMessage
                  name="name"
                  component="div"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Description */}
              <div className={Styles.courseForm__group}>
                <label htmlFor="description">
                  Course Description
                </label>

                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter course description"
                  className={Styles.courseForm__textarea}
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Price Fields */}
              <div className={Styles.courseForm__row}>
                <div className={Styles.courseForm__group}>
                  <label htmlFor="price">Price</label>

                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter course price"
                    className={Styles.courseForm__input}
                  />

                  <ErrorMessage
                    name="price"
                    component="div"
                    className={Styles.courseForm__error}
                  />
                </div>

                <div className={Styles.courseForm__group}>
                  <label htmlFor="estimatedPrice">
                    Estimated Price
                  </label>

                  <Field
                    type="number"
                    id="estimatedPrice"
                    name="estimatedPrice"
                    placeholder="Enter estimated price"
                    className={Styles.courseForm__input}
                  />

                  <ErrorMessage
                    name="estimatedPrice"
                    component="div"
                    className={Styles.courseForm__error}
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div className={Styles.courseForm__group}>
                <label htmlFor="thumbnail">
                  Course Thumbnail
                </label>

                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  className={Styles.courseForm__input}
                  onChange={(event) => {
                    const file =
                      event.currentTarget.files?.[0] || null;

                    setFieldValue("thumbnail", file);
                  }}
                />

                <ErrorMessage
                  name="thumbnail"
                  component="div"
                  className={Styles.courseForm__error}
                />

                {values.thumbnail && (
                  <p className={Styles.courseForm__helper}>
                    Selected: {values.thumbnail.name}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className={Styles.courseForm__group}>
                <label htmlFor="tags">Tags</label>

                <Field
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="React, JavaScript, CSS"
                  className={Styles.courseForm__input}
                />

                <ErrorMessage
                  name="tags"
                  component="div"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Level */}
              <div className={Styles.courseForm__group}>
                <label htmlFor="level">Course Level</label>

                <Field
                  as="select"
                  id="level"
                  name="level"
                  className={Styles.courseForm__input}
                >
                  <option value="">Select course level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advance</option>
                </Field>

                <ErrorMessage
                  name="level"
                  component="div"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Demo URL */}
              <div className={Styles.courseForm__group}>
                <label htmlFor="demoUrl">Demo URL</label>

                <Field
                  type="url"
                  id="demoUrl"
                  name="demoUrl"
                  placeholder="https://youtube.com/watch?v=xyz"
                  className={Styles.courseForm__input}
                />

                <ErrorMessage
                  name="demoUrl"
                  component="div"
                  className={Styles.courseForm__error}
                />
              </div>

              {/* Benefits */}
              <div className={Styles.courseForm__section}>
                <h3>Course Benefits</h3>

                <FieldArray name="benefits">
                  {({ push, remove }) => (
                    <div>
                      {values.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className={Styles.courseForm__dynamicRow}
                        >
                          <div className={Styles.courseForm__dynamicField}>
                            <Field
                              name={`benefits.${index}.title`}
                              placeholder="Enter benefit"
                              className={Styles.courseForm__input}
                            />

                            <ErrorMessage
                              name={`benefits.${index}.title`}
                              component="div"
                              className={Styles.courseForm__error}
                            />
                          </div>

                          {values.benefits.length > 1 && (
                            <button
                              type="button"
                              className={Styles.courseForm__removeButton}
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        className={Styles.courseForm__addButton}
                        onClick={() => push({ title: "" })}
                      >
                        + Add Benefit
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Prerequisites */}
              <div className={Styles.courseForm__section}>
                <h3>Course Prerequisites</h3>

                <FieldArray name="prerequisites">
                  {({ push, remove }) => (
                    <div>
                      {values.prerequisites.map(
                        (prerequisite, index) => (
                          <div
                            key={index}
                            className={Styles.courseForm__dynamicRow}
                          >
                            <div className={Styles.courseForm__dynamicField}>
                              <Field
                                name={`prerequisites.${index}.title`}
                                placeholder="Enter prerequisite"
                                className={Styles.courseForm__input}
                              />

                              <ErrorMessage
                                name={`prerequisites.${index}.title`}
                                component="div"
                                className={Styles.courseForm__error}
                              />
                            </div>

                            {values.prerequisites.length > 1 && (
                              <button
                                type="button"
                                className={Styles.courseForm__removeButton}
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        )
                      )}

                      <button
                        type="button"
                        className={Styles.courseForm__addButton}
                        onClick={() => push({ title: "" })}
                      >
                        + Add Prerequisite
                      </button>
                    </div>
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
                  ? "Creating Course..."
                  : "Create Course"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);
};

export default CreateCourse;