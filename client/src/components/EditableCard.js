import {PropTypes} from 'prop-types';
import './EditableCard.css';
import React, {useEffect, useRef} from 'react';
export const EditableCard = ({onDelete, onDragEnd, sourceValue, onUpdate, isNew}) => {
    const contentRef = useRef();
    useEffect(() => {
        console.log('source value: ' + sourceValue.val);
       if (contentRef.current && sourceValue){
        contentRef.current.textContent = sourceValue.val;
       }
    }, [sourceValue, contentRef]);

    const handleBlur = () => {
        const content = contentRef.current.textContent;
        onUpdate(content);
    };

    const classList = ["deleteable-card", isNew ? "deleteable-card--new" : ""];

    return <div className={classList.join(" ")} draggable={!!onDragEnd} onDragEnd={onDragEnd || (() =>{})}>
        {(!isNew && <button className="deleteable-card__delete-btn" onClick={onDelete}>X</button>)}
        <div className="deleteable-card__content" contentEditable="true" ref={contentRef} onBlur={() => handleBlur()}>
        </div>
    </div>
}
EditableCard.prototype = {
    onDelete: PropTypes.func,
    onDragEnd: PropTypes.func,
    sourceValue: PropTypes.string,
    isNew: PropTypes.bool,
}