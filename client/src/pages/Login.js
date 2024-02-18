import { Button, Form, Input } from "antd";
import { React, useState, useEffect } from "react";
import faceIO from "@faceio/fiojs";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";

import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [faceio, setFaceio] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeFaceIO = async () => {
      try {
        const faceioInstance = new faceIO("fioa1973");
        setFaceio(faceioInstance);
      } catch (error) {
        setError("Failed to initialize FaceIO: " + error.message);
      }
    };
    initializeFaceIO();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        if (response.data.faceID) {
          try {
            const res = await faceio.authenticate({
              locale: "auto",
            });
            if(res.facialId === response.data.faceID){
              toast.success(response.data.message);
              dispatch(setUser(response.data.data));
              localStorage.setItem("token", response.data.data);
              window.location.reload();
              navigate("/");
            } else{
              navigate("/login")
            }
            



          } catch (error) {
            setError("Authentication failed: " + error.message);
          }
        } else {
          toast.success(response.data.message);
          dispatch(setUser(response.data.data));
          localStorage.setItem("token", response.data.data);
          window.location.reload();
          navigate("/");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
