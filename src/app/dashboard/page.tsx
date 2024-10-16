'use client'

import Block from '@/components/shared/block';
import { useDashboard } from '@/contexts/dashboard-context';
import React, {useEffect} from "react";

export default function Dashboard() {
    const { setDashboardData } = useDashboard();

    useEffect(() => {
        setDashboardData({
            id: 1,
            breadcrumbs: <span>Dashboard</span>
        });
    });

  return (
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
  );
}
