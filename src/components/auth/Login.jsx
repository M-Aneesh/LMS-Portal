import { toast } from 'react-hot-toast'
import Styles from './_auth.module.css'
import { useState , useContext , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../state-management/contextApi'



const Login = () => {
    useEffect(()=>{
        toast.dismiss('activation-toast')
    },[])
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    let [state , setState] = useState({
        email:'',
        password:'',
        isLoading:false,
    })
    let {email , password , isLoading} = state
    let handleChange = e =>{
        const {name,value} = e.target
        setState({...state , [name]:value})
    }
    let handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            let payload = ({
                email,
                password
            });
            setState({...state , isLoading:true})
           await login(payload)
            toast.success("Successfully user has logged in...")
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error("Please provide correct credentials...")
        }finally{
            setState({isLoading:false,password:'',email:''})
        }
    }
  return (
    <section id={Styles.auth}>
        <article className={Styles.auth_block}>
            <header>
                <h1>Login</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
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
                    <label htmlFor="email">Password</label>
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
                    <button type='submit'>{isLoading? 'Logging in...': 'Login'}</button>
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

export default Login