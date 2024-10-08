import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    contact: '', // Ensure the key name matches the formData key
    password: '',
    role: '',
    file: '',
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', input.fullName);
    formData.append('email', input.email);
    formData.append('contact', input.contact); // Corrected key name here
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          withCredentials: true,
        },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/login'); // Moved after success toast
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      dispatch(setLoading(false)); // Ensure loading is set to false after the request
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]); // Added user as a dependency

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-[#8d8296] shadow-2xl shadow-[#986dc0] rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Sign Up</h1>
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="Sam Jose"
            value={input.fullName}
            name="fullName"
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="sam@gmail.com"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="number"
            placeholder="5674835680"
            value={input.contact} // Corrected value binding
            name="contact" // Corrected input name
            onChange={changeEventHandler}
          />
        </div>
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="*******"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
          />
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>
        </div>
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            className="text-lg w-full my-4 bg-[#6300b3] hover:border-2 hover:border-[#6300b3] hover:bg-transparent hover:text-[#6300b3]"
            type="submit"
          >
            Sign Up
          </Button>
        )}
        <span>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
