import { Avatar, Badge, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import Profile from '../../assets/profile.jpg';
import { RootState } from '../../redux/types';
import styles from './header.module.scss';

const Header = () => {
  const location = useLocation();
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const cart = useSelector((store: RootState) => store.product.cart);

  useEffect(() => {
    let tempCount = 0;
    cart.forEach(e => (tempCount += e.quantity));
    setTotalCartItems(tempCount);
  }, [cart]);

  const getPath = () => {
    switch (location.pathname) {
      case '/cart':
        return 'Home/Cart';
      case '/login':
        return 'Home/Login';
      case '/register':
        return 'Home/Register';
      default:
        return 'Home';
    }
  };
  return (
    <div className={styles.header}>
      <div className={styles.sub_wrapper}>
        <div className={styles.panel}>
          <img className={styles.logo} src={Logo} alt='logo' />

          <div className={styles.interactive_area}>
            <Button type='text'>Home</Button>
            <Button type='text'>About Us</Button>
            <Button type='text'>Become Merchant</Button>
            <Button type='text'>Driver</Button>
            <Button type='text'>Blogs</Button>
            <Button type='text'>Contact Us</Button>

            <Button icon={<i className='ri-heart-fill'></i>} shape='circle' />
            <Badge count={totalCartItems}>
              <Button icon={<i className='ri-shopping-cart-line'></i>} shape='circle' />
            </Badge>
            <Avatar src={Profile} />
          </div>
        </div>

        <div className={styles.navigation}>
          <span className={styles.heading}>Cart</span>
          <span className={styles.detail}>
            <i className='ri-home-line'></i> &nbsp; {getPath()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
