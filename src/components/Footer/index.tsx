import { Button, Space } from 'antd';
import Logo from '../../assets/Logo.png';
import AppStore from '../../assets/app-store.webp';
import PlayStore from '../../assets/play-store.webp';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.top_section}>
        <div className={styles.section}>
          <img className={styles.logo} src={Logo} alt='logo' />
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          </p>
        </div>

        <div className={styles.section}>
          <span>Quick Links</span>
          <div>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Become Merchant</li>
              <li>Driver</li>
              <li>Blogs</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <span>Follow Us</span>
          <Space size='small'>
            <Button size='large' shape='circle' icon={<i className='ri-facebook-line'></i>} />
            <Button size='large' shape='circle' icon={<i className='ri-instagram-line'></i>} />
            <Button size='large' shape='circle' icon={<i className='ri-twitter-line'></i>} />
            <Button size='large' shape='circle' icon={<i className='ri-youtube-line'></i>} />
          </Space>
        </div>

        <div className={styles.section}>
          <span>Get it on</span>

          <Space direction='vertical'>
            <img src={AppStore} className={styles.button_img} />
            <img src={PlayStore} className={styles.button_img} />
          </Space>
        </div>
      </div>
      <div className={styles.bottom_section}>
        <span>Copyright @ 2018- All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
