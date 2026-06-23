import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './RoundBtn.css';

export default function RoundBtn({ as, to, children, className, ...props }) {
    if (as === Link) {
        return (
            <Button as={Link} to={to} className={`roundBtn ${className}`} {...props}>
                {children}
            </Button>
        );
    }

    // Иначе используем обычную кнопку
    return (
        <Button className={`roundBtn ${className}`} {...props}>
            {children}
        </Button>
    );
}