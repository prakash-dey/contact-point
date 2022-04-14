import { useState, useEffect } from "react";
import { useNavigate} from 'react-router';
import './loginForm.css'


function LoginForm() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate('/home');
    }
  }, [formErrors]);


// Function for validating the input
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }else if(isNaN(values.password)){
      errors.password = "Only numbers are expected";
    }else if(eval(values.password.split("").join("+"))!==10){
      errors.password = "Result of addition must be 10";
    }
    return errors;
  };

  // Sign in form
  return (
    
<div class="container" id="container">
	
	<div class="form-container sign-in-container">
		<form onSubmit={handleSubmit}>
			<h1>Sign in</h1>
			<input type="email" placeholder="Email"  value={formValues.email} onChange={handleChange} name="email"/>
      <span className="error-msg">{formErrors.email}</span>
			<input type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange} />
      <span className="error-msg">{formErrors.password}</span>
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Be part of Us</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>



  );
}

export default LoginForm;