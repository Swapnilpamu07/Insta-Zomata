function Footer() {
    return (
        <div>
            <footer style={{ background: "#222", color: "#fff", padding: "20px 0", textAlign: "center" }}>
                <p>&copy; {new Date().getFullYear()} Insta+Zomato. All rights reserved.</p>
                <div>
                    <a href="/about" style={{ color: "#fff", margin: "0 10px" }}>About</a>
                    <a href="/contact" style={{ color: "#fff", margin: "0 10px" }}>Contact</a>
                    <a href="/privacy" style={{ color: "#fff", margin: "0 10px" }}>Privacy Policy</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer