import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from "react-dnd";
import { DraggableCard } from './DraggableCard';
import { dndObjectValueProps } from '@/core/types/ssrData';


type Props = {
    accept: string[],
    text: string,
    bg?: any,
    onDrop: (item: dndObjectValueProps) => void,
    droppedValue: dndObjectValueProps[],
    handleRemove: () => void
}

export const DroppableContainer: React.FC<Props> = ({ droppedValue, handleRemove, ...rest }) => {
    const { accept, text, bg, onDrop} = rest
    const [{ isOver }, drop] = useDrop(() => ({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [accept, onDrop]);

    const ref = useRef<HTMLDivElement>(null);
    drop(ref);

    return (
        <div ref={ref} className={`flex justify-center items-center text-center text-sm w-48 h-16 p-2 rounded-md shadow-inner ${bg} ${isOver ? 'bg-gray-200' : ''}`}>
            {droppedValue.length > 0 ? (
                <>
                    <DraggableCard answer={droppedValue[0]} bg={bg} icon={true} onClick={handleRemove} type="sample"/>
                </>
            ) : (
                <p className='opacity-35'>{text}</p>
            )}
        </div>
    );
};
