import { useContext, useState } from "react";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/FetchUser";
import { AuthContext } from "../../state-management/contextApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const UpdataProfilePicture = () => {
  const navigate = useNavigate();
  const { updateProfilePicture } = useContext(AuthContext);
  let { user } = useAuth();
  const [preview , setPreview] = useState(null)


  const handleFileChange =  (e) => {
    let file = e.target.files?.[0]
    if(!file) return;
    if(!file.type.startsWith('image/')){
        toast.error('Image file can use png , jpeg , webp')
        return
    }
    if(file.size > 2*1024*1024){
        toast.error('Image must be less than 2Mb')
        return
    }
  
  const reader=new FileReader()
  console.log(reader.result);
  reader.onload=()=>{
    if(reader.readyState === 2){
        setPreview(reader.result)
    }
  }
  reader.readAsDataURL(file)
  }
    const handleSubmit = (e)=>{
        e.preventDefault()
        try{
            updateProfilePicture(preview)
            console.log(preview);
        }catch(error){
            console.error(error);
            
        }
    }
  return (
    <aside className={Styles.content}>
      <main className={Styles.updateForm}>
        <h1>update profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Update Picture</label>
            <input
              type="file"
              required
             accept="image/*"
             onChange={handleFileChange}
            />
          </div>
            {
                preview && <picture>
                    <img src={preview} alt="image" height={100} width={100} />
                </picture>
            }
          <div className="form-group">
            <button>update Profile Picture</button>
          </div>
        </form>
      </main>
    </aside>
  );
};

export default UpdataProfilePicture;