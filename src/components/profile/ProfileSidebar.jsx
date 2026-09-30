import { Link } from "react-router-dom";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import { FaPencilAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";

const ProfileSidebar = () => {
  const { user } = useAuth();
  return (
    <aside className={Styles.sidebar}>
      <picture>
        <Link to={'update-profile-picture'} className={Styles.profilePic} >
        <HiOutlinePencilAlt />
        <img
          src={user?.avatar?.url} alt="avatar"
        />
        </Link>
      </picture>
      <figcaption>
        <Link to={"update-user-info"}>
          <span className={Styles.icon}>
            <FaPencilAlt />
          </span>
        </Link>

        <h1>{user ? user?.name : 'loading...'}</h1>
      </figcaption>
      <Link to={"update-user-password"}>
        <span className={Styles.passicon}>
          <TbPasswordUser />
        </span>
      </Link>
    </aside>
  );
};

export default ProfileSidebar;