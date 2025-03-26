import "./Cancel.scss";

const Cancel = () => {
  return (
    <div className="cancel">
      <h2 className="cancel__title">❌ Payment Cancelled</h2>
      <p className="cancel__subtitle">
        You can return to your cart and try again anytime.
      </p>
    </div>
  );
};

export default Cancel;
