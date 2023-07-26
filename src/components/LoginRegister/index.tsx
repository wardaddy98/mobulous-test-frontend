import { Button, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cover from '../../assets/Sider-2.png';
import { APIResponse } from '../../commonTypes';
import { loginUrl, registerUrl } from '../../constants/urlConstant';
import { useToast } from '../../hooks/useToast';
import styles from './loginRegister.module.scss';
import { ILoginRegister, ILoginSubmitValues, IRegisterSubmitValues } from './types';

const LoginRegister = (props: ILoginRegister) => {
  const { type, description } = props;

  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  const handleLogin = (values: ILoginSubmitValues) => {
    try {
      fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result: APIResponse) => {
          if (result.status === 200) {
            successToast('Logged in successfully!');
            navigate('/cart');
          } else {
            errorToast(result?.message);
          }
        });
    } catch (err) {
      errorToast();
    }
  };

  const handleRegister = (values: IRegisterSubmitValues) => {
    try {
      if (values.password !== values.confirmPassword) {
        errorToast('Passwords do not match');
        return;
      }

      delete values.confirmPassword;

      fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify({ ...values }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((result: APIResponse) => {
          if (result.status === 200) {
            successToast('Registered successfully!');
            navigate('/cart');
          } else {
            errorToast(result?.message);
          }
        });
    } catch (err) {
      errorToast();
    }
  };

  return (
    <div className={styles.wrapper}>
      <img src={Cover} />

      <div className={styles.main_area}>
        <span className={styles.heading}>{type === 'login' ? 'Login' : 'Register'}</span>

        <p>{description}</p>

        {type === 'login' ? (
          <Form name='login' layout='vertical' onFinish={handleLogin} autoComplete='off'>
            <Form.Item
              label='Email Id'
              name='email'
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your Password' }]}
            >
              <Input type='password' />
            </Form.Item>

            <Form.Item className={styles.submit_wrapper}>
              <Button htmlType='submit' style={{ color: 'white', background: '#af2a26' }}>
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form name='register' layout='vertical' onFinish={handleRegister} autoComplete='off'>
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Email Id'
              name='email'
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Phone Number'
              name='phoneNumber'
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
            >
              <Input type='number' />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your Password' }]}
            >
              <Input type='password' />
            </Form.Item>

            <Form.Item
              label='Confirm Password'
              name='confirmPassword'
              rules={[{ required: true, message: 'Please input your Confirm Password' }]}
            >
              <Input type='password' />
            </Form.Item>

            <Form.Item className={styles.submit_wrapper}>
              <Button htmlType='submit' style={{ color: 'white', background: '#af2a26' }}>
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
        )}

        {type === 'login' ? (
          <Space>
            <span>{`Don't have an account`}</span>
            <Button onClick={() => navigate('/register')} type='text'>
              Sign up
            </Button>
          </Space>
        ) : (
          <Space>
            <span>{`Already have an account`}</span>
            &nbsp;
            <Button onClick={() => navigate('/login')} type='text'>
              Sign in
            </Button>
          </Space>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
