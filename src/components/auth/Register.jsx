import { toast } from 'react-hot-toast'
import Styles from './_auth.module.css'
import { useState , useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../state-management/contextApi'
import ActivationCode from './ActivationCode'



const Register = () => {
    const navigate = useNavigate()
    const {register} = useContext(AuthContext)
    let [mailUrl , setMailUrl] = useState(localStorage.getItem("mailUrl"))
    let [state , setState] = useState({
        name:'',
        email:'',
        password:'',
        isLoading:false,
    })
    let {name , email , password , isLoading } = state
    let handleChange = e =>{
        const {name,value} = e.target
        setState({...state , [name]:value})
    }
    let handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            let payload = ({
                name,
                email,
                password
            });
            setState({isLoading:true})
            const data = await register(payload)
            // toast.success(`Activation code: ${data}` , {duration:300000 , id:'activation-toast'})
            toast.custom(
    (t) => (
        <div className={Styles.toast}>
            <span>Activation code: {data}</span>

            <button className='btn'
                onClick={() => {
                    navigator.clipboard.writeText(data)
                    toast.success("Copied!", { duration: 1000 })
                }}
            >
                Copy
            </button>
        </div>
    ),
    {
        duration: 300000,
        id: "activation-toast",
        // style: {
        //     marginTop: "70px"
        // }
    }
)
            navigate("/auth/activate")

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong...")
        }finally{
            setState({isLoading:false, name:'',password:'',email:''})
          
        }
    }
  return (
    <section id={Styles.auth}>
        <article className={Styles.auth_block}>
            <header>
                <h1>Register</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Enter your name..."
                        className="form-control"
                        value={name}
                        id="name"
                        onChange={handleChange}
                        required
                    />
                </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter your Email..."
                        className="form-control"
                        value={email}
                        id="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        className="form-control"
                        value={password}
                        id="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className='form-group'>
                    <button type='submit'>{isLoading? 'Registering...': 'Register'}</button>
                </div>
                
                {/* <div className='form-group'>
                    <button type='submit'>Forget Password?</button>
                </div> */}
                </form>
            </main>
        </article>
    </section>
  )
}

export default Register