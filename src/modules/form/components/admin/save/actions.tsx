import { Button } from "@heroui/react";
import React from "react";

export default function Actions() {
  return (
    <>
      <Button color="primary" size="sm" variant="shadow" radius="sm">
        Create
      </Button>{" "}
      <Button color="primary" radius="sm" size="sm" variant="flat">
        Reset
      </Button>
    </>
  );
}
