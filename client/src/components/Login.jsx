import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const Login = () => {
    const navigateTo = useNavigate();
    const [user, setUser] = useState({
        email: "", password: ""
    });

    let fieldName, fieldValue;
    const handleInputs = (e) => {
        fieldName = e.target.name;
        fieldValue = e.target.value;

        setUser({ ...user, [fieldName]: fieldValue });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        const res = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if (data.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("Logged In Successfully")

            navigateTo("/")
        }
    }
    return (
        <div className="form-group">

            <form method='POST' className='container'>
                <h1 className=''>Login</h1>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" name='email' value={user.email} onChange={handleInputs} id="floatingInput" placeholder="93136*****" />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" name='password' value={user.password} onChange={handleInputs} id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" onClick={PostData} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login