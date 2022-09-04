import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { notificationActions } from '../store/notification-slice';
import Input from './Input'
import { login } from '../services/UserService';
import { userActions } from '../store/user-slice';
import { showLoading, hideLoading } from 'react-redux-loading'
import { toast } from 'react-toastify';

function SignIn({ loggedIn }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (creds) => {
    dispatch(showLoading());
    login(creds).then((res) => {
      console.log(res);
      dispatch(authActions.login());
      dispatch(userActions.setUser(res.result));
      dispatch(authActions.addToken(res.token))
      console.info('Logged in');
      dispatch(hideLoading());
      navigate('/dashboard');
    }, error => {
      dispatch(hideLoading());

      toast.error(error.message);
      console.log("Login error", error);
    });


    // login(values).then(success => {
    //   console.log("true");
    //   dispatch(rLogin());
    //   // navigate('/');
    // }, error => {
    //   console.log(error);
    // })

  }

  const validationSchema = Yup.object({
    username: Yup.string().email().required("This is a required field"),
    password: Yup.string().required("This is a required field"),
  });

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 card px-3 py-2">
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => { handleSubmit(values) }}>
              {({ touched, errors, values }) =>
                <div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <h1 className="mt-1 text-center">Login</h1>
                    </div>
                  </div>
                  <Form>
                    <Input name="username" placeholder="Enter email" type="email" />
                    <Input name="password" placeholder="Enter Password" type="password" />

                    <button type="submit" className="btn btn-primary mt-4">
                      Submit
                    </button>
                  </Form>
                </div>
              }
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;