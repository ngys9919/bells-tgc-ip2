import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';
import { useJwt, useLoginUsername, usePreviousLoginUser, useLoginSuperUser } from './UserStore';

function UserLogin() {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [togglepassword, setTogglePassword] = useState([]);

  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();
  const { setJwt } = useJwt();
  const { setLoginUsername, getLoginUsername, setCurrentLoginUsername } = useLoginUsername();
  const { setPreviousLoginUser } = usePreviousLoginUser();
  const { setLoginSuperUser, resetLoginSuperUser } = useLoginSuperUser();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/users/login', values);
      // const response = await axios.post('http://localhost:3000/api/users/login', values);
      console.log('Login successful:', response.data);
      // todo: store the JWT 
      setJwt(response.data.token); // Store the JWT
      actions.setSubmitting(false);
      showMessage('Login successful!', 'success');
      // alert(JSON.stringify(values, null, 2));
      if ((response.data.username == "admin") && (loginEmail == "admin@aieshop.com.sg")) {
        // alert("Admin SuperUser");
        // Sweet Alert2
        Swal.fire({
          title: "Admin SuperUser",
          text: "You have all access rights!",
          icon: "success"
        });
        setLoginSuperUser();
      } else {
        // alert("Normal User");
        // Sweet Alert2
        Swal.fire({
          title: "Normal User",
          text: "You have read access only!",
          icon: "info"
        });
        resetLoginSuperUser();
      }
      document.getElementById("loginlogout").innerHTML = "Logout";
      console.log(response.data.username);
      setLoginUsername(response.data.username);
      setCurrentLoginUsername(response.data.username);
      setPreviousLoginUser(response.data.username);
      const loginUsername = getLoginUsername();
      console.log(loginUsername);
      setLocation('/');
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.error('Network error:', error);
        showMessage('Network error!', 'error');
        document.getElementById("loginlogout").innerHTML = "Login";
        actions.setErrors({ submit: error.response.message });
        actions.setSubmitting(false);
      } else if (error.code === 'ERR_BAD_REQUEST') {
        console.error('Login error:', error);
        showMessage('Login error!', 'error');
        document.getElementById("loginlogout").innerHTML = "Login";
        actions.setErrors({ submit: error.response.data.message });
        actions.setSubmitting(false);
      }

    }
  };

  // const togglePasswordChecked = () => {
  //   setTogglePassword(!togglepassword);
  // }

  const togglePasswordChecked = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);

    if (e.target.checked) {

      // straightforward method:
      // 1. clone the array
      const cloned = togglepassword.slice();

      // 2. update (i.e mutate) the array
      cloned.push(e.target.value);

      // 3. set the cloned as the new state
      setTogglePassword(cloned);

      // alert("Show Password!");
      // alert(loginPassword);
      // Swal.fire({
      //   title: "This is your entered password: ",
      //   text: loginPassword,
      //   icon: "success",
      //   draggable: true
      // });

      // A message with auto close timer
      let timerInterval;
      Swal.fire({
        draggable: true,
        html: `This is your entered password:
        </br>
        </br><em>${loginPassword}</em>
        </br>
        </br>Auto-Close in <b></b> seconds.`,
        timer: 10000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()/1000}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

    } else {
      const cloned = togglepassword.slice();

      // delete: find the index and use splice
      const indexToDelete = togglepassword.findIndex(current => current == e.target.value)
      cloned.splice(indexToDelete, 1);

      setTogglePassword(cloned);

      // alert("Hide Password!");
    }
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
        onSubmit={handleSubmit}
      >
        {function (formik) {
          return (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" name="password" className="form-control" autoComplete="on" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}

              {setLoginEmail(formik.values.email)}
              {setLoginPassword(formik.values.password)}

              <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <form class="d-flex">
                <input className="me-2" type="checkbox" name="togglepassword" value="Show Password"
                  onChange={togglePasswordChecked}
                  checked={togglepassword.includes("Show Password")} />
                <label>Show Password</label>
              </form>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default UserLogin;
