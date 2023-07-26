import { Badge, Button, InputNumber, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Food1 from '../../assets/Food-1.png';
import Food2 from '../../assets/Food-2.png';
import Food3 from '../../assets/Food-3.png';
import Food4 from '../../assets/Food-4.png';
import Food5 from '../../assets/Food-5.png';
import Food6 from '../../assets/Food-6.png';
import Food7 from '../../assets/Food-7.png';
import Food8 from '../../assets/Food-8.png';
import { addCartItem, deleteCartItem, updateCartItemQuantity } from '../../redux/actions';
import { RootState } from '../../redux/types';
import styles from './productCard.module.scss';
import { IProductCard } from './types';

const ProductCard = (props: IProductCard) => {
  const { discountedPrice, name, originalPrice, _id } = props.product;
  const dispatch = useDispatch();

  const cart = useSelector((store: RootState) => store.product?.cart);

  const getFoodImage = () => {
    const index = Math.floor(Math.random() * 8);
    const foods = [Food1, Food2, Food3, Food4, Food5, Food6, Food7, Food8];
    return foods[index];
  };

  const handleAddItemToCart = () => {
    dispatch(addCartItem(props.product));
  };

  const handleRemoveItemFromCart = () => {
    dispatch(deleteCartItem(_id));
  };

  const handleQuantityChange = (quantity: number | null) => {
    if (!quantity) return;

    dispatch(
      updateCartItemQuantity({
        product: props.product,
        quantity,
      }),
    );
  };

  const calculateDiscountPercentage = () => {
    return Math.floor(((originalPrice - discountedPrice) / originalPrice) * 100);
  };
  return (
    <Badge.Ribbon text={`${calculateDiscountPercentage()}% off`} placement='start' color='#7FB656'>
      <div className={styles.wrapper}>
        <img src={getFoodImage()} alt='food' />

        <div className={styles.details_area}>
          <span className={styles.heading}>{name}</span>
          <Space size={'large'}>
            <span className={styles.discounted_price}>{`$${discountedPrice}`}</span>
            <span className={styles.price}>{`$${originalPrice}`}</span>
          </Space>

          <Space>
            <Button
              onClick={handleAddItemToCart}
              shape='circle'
              icon={<i className='ri-add-line'></i>}
            />
            <InputNumber
              controls={false}
              min={0}
              onChange={handleQuantityChange}
              defaultValue={0}
              value={cart.find(e => e.product._id === _id)?.quantity ?? 0}
            />
            <Button
              onClick={handleRemoveItemFromCart}
              shape='circle'
              icon={<i className='ri-subtract-line'></i>}
            />
          </Space>

          <Space>
            <Button type='text'>Move to Wishlist</Button>
            <Button type='text' danger>
              Remove
            </Button>
          </Space>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default ProductCard;
