/* eslint-disable react/prop-types */
import { formatNumber } from "@razorpay/i18nify";

const AmountWrapper = ({ amount }) => {
  return <div>{formatNumber(amount)}</div>;
};
export default AmountWrapper;
