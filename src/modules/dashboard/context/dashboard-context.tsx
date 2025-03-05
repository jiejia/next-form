import React, {createContext, useContext, useState} from 'react';

type dashboardDataType = {
    id: number;
    breadcrumbs: React.ReactNode | null
}

type DashboardContextType = {
    dashboardData: dashboardDataType;
    setDashboardData: (dashboard: dashboardDataType) => void;
};

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({children}: { children: React.ReactNode }) {
    const [dashboardData, setDashboardData] = useState<dashboardDataType>({ breadcrumbs: <></>, id: 0});

    return (
        <DashboardContext.Provider value={{dashboardData, setDashboardData}}>
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a useDashboard');
    }
    return context;
};