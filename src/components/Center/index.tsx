import styles from './center.module.scss';
import { ICenter } from './types';

const Center = (props: ICenter) => {
  const { size = 200 } = props;
  return (
    <div className={styles.wrapper} style={{ height: size, width: size }}>
      {props.children}
    </div>
  );
};

export default Center;
