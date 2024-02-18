const formatDate = (d) => {
    const date = new Date(d);
    return new Intl.DateTimeFormat("en-UK", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(date)
}

export default formatDate