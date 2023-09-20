import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { createContext, useState } from 'react';
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';
import UserDetails from '../UserDetails/UserDetails';

const auth = getAuth(app);
export const userContext = createContext({});

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [user, setUser] = useState({});

    const handleOnSubmit = (event)=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            setUser(user);
            console.log(user);
            setSuccess(true);
            form.reset();
        })
        .catch(error => console.log(error))
    }

    const handleEmailBlur = (event)=>{
        const email = event.target.value;
        setUserEmail(email);
        // console.log(email);
    }

    const handleForgetPassword = ()=>{
        if(!userEmail){
            alert('Please Enter Your Email Address');
            return;
        }

        sendPasswordResetEmail(auth, userEmail)
        .then(()=>{
            alert('Please Check Your email and reset your password')
        })
        .catch((error)=>{

        })
    }

    console.log(user);

    // <userContext.Provider value={user}>
    //     <UserDetails></UserDetails>
    // </userContext.Provider>

    return (
        <div className='w-25 mx-auto my-5 p-4 shadow-lg rounded-3'>
            {
                success && <p className='text-success mt-2'>Welcome {user.displayName}</p>
            }
            <form onSubmit={handleOnSubmit} className=''>
                <h4>Please Login</h4>
                <div className="mb-3">
                    <label className="form-label">Eamil</label>
                    <input onBlur={handleEmailBlur} type="email" name="email" className="form-control" placeholder="Email Please" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password Please" required/>
                </div>

                

                <p>New User in Website <Link to='/register'>Please Register Your Account</Link></p>

                <button type="submit" className="btn btn-primary" >Login</button>
                {
                    success && <p className='text-success mt-2'>Login Successfully</p>
                }
            </form>

            <p className='mt-3'>Forget Password? <button onClick={handleForgetPassword} className='btn btn-link'>Please Reset Password</button></p>
        </div>
        
    );
};

export default Login;