import { Button, Radio, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Center from '../../components/Center';
import ProductCard from '../../components/ProductCard';
import { getProductsUrl } from '../../constants/urlConstant';
import { setProducts } from '../../redux/actions';
import { ICartItem, RootState } from '../../redux/types';
import styles from './cart.module.scss';
import { GetProductsResponse, IPriceDetail, IProduct, ISection } from './types';

const Cart = () => {
  const [productLoading, setProductLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const products = useSelector((store: RootState) => store.product?.products);
  const cart = useSelector((store: RootState) => store.product?.cart);
  const dispatch = useDispatch();
  const shipping = 23;

  useEffect(() => {
    setProductLoading(true);

    fetch(getProductsUrl, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((result: GetProductsResponse) => {
        dispatch(setProducts(result?.body?.products ?? []));
      })
      .finally(() => {
        setProductLoading(false);
      });
  }, []);

  useEffect(() => {
    let total = 0;
    cart.forEach(e => {
      total += e.product.discountedPrice * e.quantity;
    });
    setTotal(total);
  }, [cart]);

  return (
    <div className={styles.wrapper}>
      {productLoading ? (
        <Center>
          <Spin size='large' />
        </Center>
      ) : products?.length > 0 ? (
        <div className={styles.products_wrapper}>
          {products.map((e: IProduct, index: number) => (
            <ProductCard key={index} product={e} />
          ))}
        </div>
      ) : (
        <Center>
          <span>No Products found...</span>
        </Center>
      )}

      <div className={styles.order_summary}>
        <div className={styles.details_area}>
          <Section heading='Your Order Summary'>
            <>
              <div
                style={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}
              >
                <span>Product</span>
                <span>SubTotal</span>
              </div>

              <div
                style={{
                  padding: '0 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {cart?.length > 0 ? (
                  cart?.map((e: ICartItem, index: number) => (
                    <PriceDetail
                      key={index}
                      label={e.product.name}
                      price={e.product.discountedPrice * e.quantity}
                      quantity={e.quantity}
                    />
                  ))
                ) : (
                  <span style={{ textAlign: 'center', width: '100%' }}>No products added...</span>
                )}
              </div>
            </>
          </Section>

          <Section heading='Select Delivery Mode'>
            <Radio.Group>
              <Space direction='vertical'>
                <Radio value={'take_away'}>Take Away</Radio>
                <Radio value={'home_delivery'}>Home Delivery</Radio>
              </Space>
            </Radio.Group>
          </Section>

          <Section heading='Select Payment Mode'>
            <Radio.Group>
              <Space direction='vertical'>
                <Radio value={'card'}>Card</Radio>
                <Radio value={'third_party'}>
                  3rd party payment gateways like PayPal & PayBill
                </Radio>
                <Radio value={'cod'}>COD (Cash on Delivery)</Radio>
              </Space>
            </Radio.Group>
          </Section>

          <div className={styles.price_summary}>
            <PriceDetail label='SubTotal' price={total} />
            <PriceDetail label='Shipping' price={shipping} />
            <PriceDetail label='Total' price={total > 0 ? total + shipping : 0} showLine={false} />
          </div>

          <Button style={{ backgroundColor: '#af2a26', color: 'white' }}>Place Order</Button>
        </div>
      </div>
    </div>
  );
};

const Section = (props: ISection) => {
  const { heading } = props;

  return (
    <div className={styles.section}>
      <span className={styles.heading}>{heading}</span>
      {props.children}
    </div>
  );
};

const PriceDetail = (props: IPriceDetail) => {
  const { label, price, showLine = true, quantity = 0 } = props;
  return (
    <>
      <div className={styles.price_detail}>
        <span>{quantity > 0 ? `${label} x ${quantity}` : label} </span>

        <span>${price}</span>
      </div>
      {showLine && <hr style={{ marginTop: '5px', height: '2px', borderRadius: '4px' }} />}
    </>
  );
};

export default Cart;
