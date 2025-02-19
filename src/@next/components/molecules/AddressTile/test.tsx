import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { IconButton } from "@components/atoms";
import { AddressTile } from ".";

const onEdit = jest.fn();
const onRemove = jest.fn();
const setDefault = jest.fn();

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
  onEdit,
  onRemove,
  setDefault,
};

const DEFAULT_ADDRESSES = {
  isDefaultBillingAddress: true,
  isDefaultShippingAddress: true,
};

describe("<AddressTile />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <AddressTile {...DEFAULT_PROPS} {...DEFAULT_ADDRESSES} />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should run onRemove function for clicking on trash button", () => {
    const wrapper = mount(
      <AddressTile {...DEFAULT_PROPS} {...DEFAULT_ADDRESSES} />
    );

    wrapper
      .find(IconButton)
      .last()
      .simulate("click");

    expect(onRemove).toHaveBeenCalled();
  });

  it("should run onEdit function for clicking on edit button", () => {
    const wrapper = mount(
      <AddressTile {...DEFAULT_PROPS} {...DEFAULT_ADDRESSES} />
    );

    wrapper
      .find(IconButton)
      .at(1)
      .simulate("click");

    expect(onEdit).toHaveBeenCalled();
  });

  it("should run setDefault method for clicking on Set default billing address", () => {
    const wrapper = mount(
      <AddressTile {...DEFAULT_PROPS} {...DEFAULT_ADDRESSES} />
    );

    wrapper
      .find(IconButton)
      .first()
      .simulate("click");
    wrapper
      .find("li")
      .first()
      .simulate("click");

    expect(setDefault).toHaveBeenCalledWith("BILLING");
  });

  it("should run setDefault method for clicking on Set default shipping address", () => {
    const wrapper = mount(
      <AddressTile {...DEFAULT_PROPS} {...DEFAULT_ADDRESSES} />
    );

    wrapper
      .find(IconButton)
      .first()
      .simulate("click");
    wrapper
      .find("li")
      .last()
      .simulate("click");

    expect(setDefault).toHaveBeenCalledWith("SHIPPING");
  });

  it("should present Default address if address is default shipping and billing", () => {
    const wrapper = mount(
      <AddressTile {...DEFAULT_PROPS} {...DEFAULT_ADDRESSES} />
    );

    expect(wrapper.text()).toContain("Default Address");
  });

  it("should present Default Shipping Address if address is set as default shipping and is different from default billing address", () => {
    const wrapper = mount(
      <AddressTile
        {...DEFAULT_PROPS}
        isDefaultShippingAddress={true}
        isDefaultBillingAddress={false}
      />
    );

    expect(wrapper.text()).toContain("Default Shipping Address");
  });

  it("should present Default Billing Address if address is set as default billing and is different from default shipping address", () => {
    const wrapper = mount(
      <AddressTile
        {...DEFAULT_PROPS}
        isDefaultShippingAddress={false}
        isDefaultBillingAddress={true}
      />
    );

    expect(wrapper.text()).toContain("Default Billing Address");
  });
});
