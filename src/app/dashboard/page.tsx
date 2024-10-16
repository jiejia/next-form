'use client'

import Block from '@/components/shared/block';
import React from "react";
import DashboardLayout from '@/app/dashboard/dashboard-layout';

export default function Dashboard() {

  return (
      <DashboardLayout breadcrumbs={<><span>Dashboard</span></>} currentPageId={1}>
          <div className="grid grid-flow-col gap-4">
              <Block>
                  <h3 className="text-center">Number Of Forms</h3>
                  <div>
                      50
                  </div>
              </Block>
              <Block>
                  <h3 className="text-center">Number Of Submissions</h3>
                  <div>
                      99
                  </div>
              </Block>
              <Block>
                  <h3 className="text-center">Number Of Submissions</h3>
                  <div>
                      99
                  </div>
              </Block>
              <Block>
                  <h3 className="text-center">Number Of Submissions</h3>
                  <div>
                      99
                  </div>
              </Block>
          </div>
      </DashboardLayout>
  );
}
