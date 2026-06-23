import React from "react";
import './BtnGroup.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function BtnGroup({ categories, selectedCategoryId, onCategoryChange }) {
    return (
        <ButtonGroup>
            {/* Кнопка "Все товары" */}
            <Button
                className={`btnGr ${selectedCategoryId === "Все товары" ? "active" : ""}`}
                onClick={() => onCategoryChange("Все товары")}
            >
                Все товары
            </Button>

            {/* Кнопки для категорий */}
            {categories.map(category => (
                <Button
                    key={category.id}
                    className={`btnGr ${selectedCategoryId === category.id ? "active" : ""}`}
                    onClick={() => onCategoryChange(category.id)}
                >
                    {category.name}
                </Button>
            ))}
        </ButtonGroup>
    );
}