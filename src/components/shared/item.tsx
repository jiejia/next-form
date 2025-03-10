import React, { forwardRef } from 'react';

interface ItemProps {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(({children, className, style, ...props}, ref) => {
    return (
        <div {...props} ref={ref} style={style} className={className}>{children}</div>
    )
});

Item.displayName = 'Item';