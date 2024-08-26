import Logo from "../assets/images/samarabiz-logo.svg";

const Home = () => {
  return <div>
    <nav className="bg-violet-950 flex justify-between items-center px-16 py-2">
        {/* Logo */}
        <div>
            <img src={Logo} alt="logo" />
        </div>
        {/* menu buttons */}
        <div className="text-white flex text-sm font-semibold">
            <ul className="mx-2 cursor-pointer">
                <li>OUR PROJECT</li>
            </ul>
            <ul className="mx-2 cursor-pointer">
                <li>HOW WE WORK</li>
            </ul>
            <ul className="mx-2 cursor-pointer">
                <li>OUR INVESTORS</li>
            </ul>
            <ul className="mx-2 cursor-pointer">
                <li>INVESTMENTS</li>
            </ul>
            <ul className="mx-2 cursor-pointer">
                <li>NUSRAH FUNDING</li>
            </ul>
        </div>
        {/* sign in button */}
        <div>
            <button className="bg-white py-1 px-2 text-sm font-semibold rounded">SIGN IN NOW</button>
        </div>
    </nav>
  </div>;
};

export default Home;
