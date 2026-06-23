import React from "react";
import './BtnSmall.css';
// bootstrap
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


export default function BtnSmall({ as, to, children, className = '', onClick, ...props }) {
    if (as === Link) {
        return (
            <Button as={Link} to={to} className={`btnSmall ${className}`.trim()} onClick={onClick} {...props}>
                {children}
            </Button>
        );
    }

    return (
        <Button className={`btnSmall ${className}`.trim()} onClick={onClick} {...props}>
            {children}
        </Button> 
    );
}

