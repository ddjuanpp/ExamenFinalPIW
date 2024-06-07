const Logout = () => {
    const ClickLogOut = () => {
        document.cookie="auth=;  path=/;";
        window.location.href = "/login";
    }
    return <a onClick={ClickLogOut} className="logout-button">Logout</a>
};

export default Logout;