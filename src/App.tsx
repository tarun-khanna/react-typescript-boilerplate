/* eslint-disable react/button-has-type */
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { formatNumber, getCurrencyList } from "@razorpay/i18nify";

import "./App.css";
// import { useI18nContext } from "@razorpay/i18nify-react";

const CURRENCIES = getCurrencyList();
const App = () => {
  // const { i18nState } = useI18nContext();
  // console.log("🚀 ~ App ~ i18nState:", i18nState);
  const [inp, setInp] = useState("");

  const [display, setDisplay] = useState(inp);
  const [locale, setLocale] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [intlOptionsState, setIntlOptionsState] = useState({});
  const intlOptions = useRef();

  const submitOptions = () => {
    setIntlOptionsState(
      // @ts-expect-error
      intlOptions.current.value ? JSON.parse(intlOptions.current.value) : {}
    );
  };

  useEffect(() => {
    try {
      setDisplay(
        formatNumber(inp, {
          currency,
          locale,
          intlOptions: intlOptionsState,
        })
      );
    } catch (err) {
      // do nothing
    }
  }, [inp, currency, locale, intlOptionsState]);

  return (
    <div>
      <div className="flex-container">
        <div className="child-container">
          Amount:{" "}
          <input
            value={inp}
            onChange={ev => {
              setInp(ev.target.value);
            }}
          />
        </div>
        <div className="child-container">
          Currency:{" "}
          <select
            value={currency}
            onChange={ev => {
              setCurrency(ev.target.value);
            }}
          >
            {Object.keys(CURRENCIES).map(key => {
              return <option>{key}</option>;
            })}
          </select>
        </div>
        <div className="child-container">
          Locale:{" "}
          <input
            value={locale}
            onChange={ev => {
              setLocale(ev.target.value);
            }}
          />
        </div>

        <div className="child-container">
          IntlOptions: <textarea style={{ height: 100 }} ref={intlOptions} />
          <button
            style={{
              backgroundColor: "black",
              borderRadius: 4,
              padding: "10px 20px",
              color: "white",
              fontWeight: "bold",
              borderWidth: 0,
              marginLeft: 4,
            }}
            onClick={submitOptions}
          >
            Submit
          </button>
        </div>
      </div>
      <h1>{display}</h1>
    </div>
  );
};

export default App;
