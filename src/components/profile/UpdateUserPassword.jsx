import { useContext, useState } from "react";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import { AuthContext } from "../../state-management/contextApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const UpdateProfilePassword = () => {
  const navigate = useNavigate();
  const { updateUserPassword } = useContext(AuthContext);
  let { user } = useAuth();
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword,setNewPassword] = useState("")

  const handleSubmit =  async(e) => {
    e.preventDefault();
    try {
        const res = await updateUserPassword({
            oldPassword,newPassword
        })
      toast.success("successfully user password has been updated");
      setOldPassword("")
      setNewPassword("")
      navigate("/user/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <aside className={Styles.content}>
      <main className={Styles.updateForm}>
        <h1>update password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Current Password</label>
            <input
              type="text"
              value={oldPassword}
              placeholder="enter your password..."
              required
              onChange={(e) => setOldPassword(e.target.value)}
            />
              <label htmlFor="newPassword">new Password</label>
            <input
              type="text"
              value={newPassword}
              placeholder="enter your password..."
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button>update password</button>
          </div>
        </form>
      </main>
    </aside>
  );
};

export default UpdateProfilePassword;