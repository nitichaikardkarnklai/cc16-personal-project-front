const defaultClasses = `w-full focus:outline-none px-3 py-1.5 border rounded-md focus:ring-2`;
export default function TextArea({
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    errorMessage
}) {
    const extendedClasses = errorMessage ? "border-red-500 bg-white focus:ring-red-300" : "border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-300"
    return (
        <>
            <textarea
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className={`${defaultClasses} ${extendedClasses}`}
            ></textarea>
            {errorMessage ? (<small className='text-red-500'>{errorMessage}</small>) : null}
        </ >
    );
}