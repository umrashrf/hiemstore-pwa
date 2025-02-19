import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";

import { AddressTile } from ".";

const Container = styled.div`
  max-width: 400px;
`;

const onEdit = action("onEdit");
const onRemove = action("onRemove");
const setDefault = action("setDefault");

const DEFAULT_PROPS = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: "Poland",
    countryArea: "dolnyslask",
    firstName: "John",
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: true,
  onEdit,
  onRemove,
  setDefault,
};

storiesOf("@components/molecules/AddressTile", module).add("default", () => (
  <Container>
    <AddressTile {...DEFAULT_PROPS} />
  </Container>
));
