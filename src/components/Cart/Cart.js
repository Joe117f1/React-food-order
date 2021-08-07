import { useContext, useState, Fragment } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

import classes from './Cart.module.css';

const firebase_api = process.env.REACT_APP_POST_API_KEY;

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitted, setDidIsSubmitted] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const addCartItemHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    }

    const removeCartItemHamdler = id => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const { sendRequest: confirmOrder } = useHttp();

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        confirmOrder({
            url: firebase_api,
            method: 'POST',
            headers: {},
            body: {
                name: userData.name,
                street: userData.street,
                postalCode: userData.postalCode,
                city: userData.city,
                orderDetails: cartCtx.items
            },
        })
        setIsSubmitting(false);
        setDidIsSubmitted(true);
        cartCtx.clearCart();
    }

    const cartrItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAddItem={addCartItemHandler.bind(null, item)}
                    onRemoveItem={removeCartItemHamdler.bind(null, item.id)}
                />
            )}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onToggleCart}>
                Close
            </button>
            {hasItems && <button className={classes.button} onClick={orderHandler} >
                Order
            </button>}
        </div>
    );

    const modalContent = (
        <Fragment>
            {cartrItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onSubmitOrder={submitOrderHandler} onCancel={props.onToggleCart} />}
            {!isCheckout && modalActions}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending your order...</p>;
    const didSubmittedModalContent = (
        <Fragment>
            <div className={classes.actions}>
                <p>We got it!</p>
                <button className={classes.button} onClick={props.onToggleCart}>
                    Close
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onToggleCart={props.onToggleCart}>
            {!isSubmitting && !didSubmitted && modalContent}
            {isSubmitting && !didSubmitted && isSubmittingModalContent}
            {!isSubmitting && didSubmitted && didSubmittedModalContent}
        </Modal>
    );
}

export default Cart;