import React, { forwardRef, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    styles?: string;
    register: any; // Assuming it's from a form library like React Hook Form
    name: string;
    error?: string;
}

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
    { type, placeholder, styles, label, register, name, error, ...rest },
    ref
) => {
    return (
        <div className='flex flex-col mt-2'>
            <p className='text-gray-600 text-sm mb-1'>{label}</p>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                ref={ref}
                className={`rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 ${styles}`}
                {...register}
                aria-invalid={error ? "true" : "false"}
                {...rest}
            />
            {error && <span className='text-xs text-red-500 mt-0.5'>{error}</span>}
        </div>
    );
};

export default forwardRef(TextInput);
