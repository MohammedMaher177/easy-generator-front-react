import React, { useState } from 'react';

type Props = {
    value: string[];
    onChange: (value: string[]) => void;
};

export default function TagInput({ value = [], onChange }: Props) {
    const [inputValue, setInputValue] = useState('');

    const addTag = (tag: string) => {
        const newTag = tag.trim().toLowerCase();
        if (newTag && !value.includes(newTag)) {
            onChange([...value, newTag]);
        }
        setInputValue('');
    };

    const removeTag = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(inputValue);
        }
    };

    return (
        <div className="w-full">
            <label className="block mb-1 font-medium text-white-dark">Tags</label>
            <div className="flex flex-wrap items-center gap-2 p-2 border rounded-lg bg-white/5 border-white/10">
                {value.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-primary/60 rounded-full">
                        {tag}
                        <button type="button" onClick={() => removeTag(idx)} className="text-xs text-white hover:text-red-300">
                            ×
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag and press enter"
                    className="w-full pr-10 rounded px-2 mb-4 text-dark font-bold h-14  ma:text-ba/se outline-none font-medium leading-snug border"
                />
            </div>
        </div>
    );
}
