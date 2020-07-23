module.exports = () => {
    return process.env.NODE_ENV === 'production' ? "https://production.com" : "http://localhost:5000/";
}