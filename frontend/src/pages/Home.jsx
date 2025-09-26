import Navbar from "../component/navbar";
import '../css/Home.css';
import Footer from "../component/footer";
function Home(){
    return (
        <div>
        <Navbar/>

            {/* hero section */}
            <div className="heroSection">
                <h1>Welcome to FoodTube</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam commodi iste fuga illum sapiente quia accusantium fugiat doloribus facilis maxime!</p>
            </div>
            <hr />
            {/* feature section */}
            <div className="featureSection">
                <h2>Our Features</h2>
                <ul>
                    <li>Discover Restaurants</li>
                    <li>Order Online</li>
                    <li>Fast Delivery</li>
                    <li>Exclusive Deals</li>
                </ul>
            </div>
            <hr />
            {/* constact us */}
            <div className="contactSection">
                <h2>Contact Us</h2>
                <div>
                    <p>Email:swapDev@dev.com</p>
                    <p>phone:9900990099</p>
                </div>
            </div>
            <hr />
            <Footer/>
        </div>
    )
}
export default Home;