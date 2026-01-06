function Cart({ cartItems, increaseQty, decreaseQty }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px"
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: "80px", marginRight: "15px" }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>$ {item.price}</p>

                <div>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <h4>$ {item.price * item.quantity}</h4>
            </div>
          ))}

          <h2>Total: $ {totalPrice.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;
