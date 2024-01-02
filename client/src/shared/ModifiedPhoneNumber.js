import React from "react";

function ModifiedPhoneNumber({ phoneNumber }) {
  const formattedPhoneNumber = phoneNumber
    ? [
        phoneNumber.slice(0, 3),
        phoneNumber.slice(3, 7),
        phoneNumber.slice(7),
      ].join("-")
    : { phoneNumber };

  return <>{formattedPhoneNumber}</>;
}

export default ModifiedPhoneNumber;
