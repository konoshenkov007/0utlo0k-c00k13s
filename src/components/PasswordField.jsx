import React, { useState } from 'react';

const PasswordField = () => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const isActive = focused || value.length > 0;

    return (
        <fieldset
            className={`
        relative w-full rounded-md 
        border 
        ${focused ? 'border-b-2 border-b-blue-600' : 'border-gray-300'}
        px-3 pt-4 pb-2
        transition-all duration-150
      `}
            style={{
                borderTopWidth: '1px',
                borderLeftWidth: '1px',
                borderRightWidth: '1px',
                borderBottomWidth: focused ? '2px' : '1px',
            }}
        >
            <legend
                className={`
          absolute text-sm text-[#707070] px-1 transition-all duration-200 pointer-events-none
          ${isActive ? '-top-2 text-[10px] text-[#707070] bg-white' : 'top-3 text-base text-gray-300'}
        `}
                style={{
                    left: '0.9rem',
                    backgroundColor: isActive ? 'white' : 'transparent',
                }}
            >
                Password
            </legend>

            <input
                value={value}
                name="password"
                type="password"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-transparent outline-none text-base text-gray-900"
            />
        </fieldset>
    );
};

export default PasswordField;