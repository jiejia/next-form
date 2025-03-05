import DashboardLayout from "@/app/dashboard/dashboard-layout";
import React from "react";
import Link from "next/link";
import SaveForm from "@/modules/form/components/admin/save/save-form";

export default function Create() {
  return (
    <DashboardLayout
      breadcrumbs={
        <>
          <Link href={"/dashboard"}>Dashboard</Link> /{" "}
          <Link href={"/dashboard/form"}>Form</Link> / <span>Create</span>
        </>
      }
      menuItemId={2}
    >
      <SaveForm />
    </DashboardLayout>
  );
}
