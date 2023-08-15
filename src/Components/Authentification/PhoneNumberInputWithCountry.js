import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

function PhoneNumberInputWithCountry() {
  const [phone, setPhone] = useState("");

  return (
    <div>
      <PhoneInput
        country={"uz"} //KR - South Korea
        value={phone}
        onChange={(value) => setPhone(value)}
      />
    </div>
  );
}

export default PhoneNumberInputWithCountry;
