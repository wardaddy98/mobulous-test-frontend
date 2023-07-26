import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <span>Login or Sign Up to continue</span>
      <Space size={'large'}>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/register')}>Sign Up</Button>
      </Space>
    </div>
  );
};

export default Home;
