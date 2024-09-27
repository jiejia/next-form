'use client'


export default function Block({children, className = ''}: { children: React.ReactNode , className?: string }) {
    return (
        <div className={`bg-white rounded-xl px-4 py-4 ${className}`}>
            {children}
        </div>
    );
}
