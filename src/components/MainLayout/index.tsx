import Footer from '../Footer';
import Header from '../Header';
import styles from './mainLayout.module.scss';
import { IMainLayout } from './types';

const MainLayout = (props: IMainLayout) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
