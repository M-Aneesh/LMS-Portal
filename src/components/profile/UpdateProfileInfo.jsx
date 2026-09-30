import { useContext, useState } from "react";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import { AuthContext } from "../../state-management/contextApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const UpdateProfileInfo = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = useContext(AuthContext);
  let { user } = useAuth();
  let [name, setName] = useState(user.name);

  const handleSubmit =  (e) => {
    e.preventDefault();
    try {
    updateUserInfo({name}); 
       
      toast.success("successfully user profile has been updated");
      navigate("/user/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <aside className={Styles.content}>
      <main className={Styles.updateForm}>
        <h1>update profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              value={name}
              placeholder="enter name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button>update info</button>
          </div>
        </form>
      </main>
    </aside>
  );
};

export default UpdateProfileInfo;