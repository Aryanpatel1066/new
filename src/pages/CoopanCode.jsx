import "./CoopanCode.css";
export default function InfoProduct() {
  return (
    <>
      <div className="infoProductContainer">
        <h2 className="infoHeading">First Purchase Offer</h2>
        <div className="parentInfoContainer">
          <div className="twoSubCoopanContainer">
            <p className="offerText">FREE SHIPPING ON YOUR FIRST PURCHASE</p>
            <button className="offerButton">USE CODE: FIRSTGLAM</button>
          </div>
          <div className="twoSubCoopanContainer">
            <p className="offerText">FLAT ₹200 OFF ON ORDERS ABOVE ₹1000</p>
            <button className="offerButton">USE CODE: FIRST200</button>
          </div>
        </div>
      </div>
    </>
  );
}
