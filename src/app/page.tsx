'use client'

import { Button, Input, Checkbox } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold mb-6">Sample Form</h1>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Enter your email" type="email" />
        <Checkbox>I agree to the terms and conditions</Checkbox>
        <Button color="primary" type="submit">Submit</Button>
      </form>
    </main>
  )
}
