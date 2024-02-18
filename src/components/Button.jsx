const bgClass = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    gray: "bg-gray-300 hover:bg-gray-400",
    black: "bg-black-200 hover:text-gray-300",
    yellow: "bg-amber-400 hover:bg-amber-600",
    none: "bg-none",
    red: "bg-red-400 hover:bg-red-600"
};

const textClass = {
    white: "text-white",
    black: "text-black",
};

const widthClass = {
    full: "w-full",
};

export default function Button({ children, bg, text, width, onClick, type = "text" }) {
    const classes = `
    ${bg ? bgClass[bg] : ""} 
    ${text ? textClass[text] : ""}
    ${width ? widthClass[width] : ""}
    `;
    return (
        <button className={`btn border-none ${classes}`} onClick={onClick} type={type}>{children}</button>
    );
}
