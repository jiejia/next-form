import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";
import Link from "next/link";
import FormList from "@/modules/form/components/admin/list/form-list";

export default function Form() {
  return (
    <DashboardLayout
      breadcrumbs={
        <>
          <Link href={"/dashboard"}>Dashboard</Link> / <span>Form</span>
        </>
      }
      menuItemId={2}
    >
      <FormList />
    </DashboardLayout>
  );
}
