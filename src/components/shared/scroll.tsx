

export default function Scroll({children, className = ''}: { children: React.ReactNode , className?: string }) {
    return (
        <div className={`h-full relative scrollbar-thin overflow-y-scroll ${className}`}>
            <div className="absolute h-full w-full pr-2">
                {children}
            </div>
        </div>
    );
}
