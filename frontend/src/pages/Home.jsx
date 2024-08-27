import Logo from "../assets/images/samarabiz-logo.svg";

const Home = () => {
  return (
    <div>
      {/* nav section */}
      <nav className="bg-violet-950 flex justify-between items-center px-16 py-2 border-b-2 border-white">
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
          <button className="bg-white py-1 px-2 text-sm font-semibold rounded">
            SIGN IN NOW
          </button>
        </div>
      </nav>
      {/* Mission Section */}
      <section className="bg-slate-200 px-16 py-28 text-center">
        {/* Mission Heading */}
        <h1 className="text-5xl font-semibold mb-8">OUR MISSION</h1>
        {/* Mission Description */}
        <p className="mb-4">
          Welcome to our partnership business, where our mission is to create
          meaningful and long-lasting partnerships that drive growth and success
          for both parties involved. We believe that collaboration is the key to
          achieving our goals and creating a better future for all. SamaraBiz
          funding project is a way of raising money to finance a particular one
          project or multiple projects and businesses. It enables fundraisers to
          collect money from a large number of people via online platform then
          invest it on existing running project and distribute profit to
          investor as per their share percentage.
        </p>
        <p className="mb-4">
          Our approach is based on mutual respect, open communication, and a
          shared commitment to excellence. We strive to understand our partners'
          needs and goals so that we can work together to grow our business.
          success.
        </p>
        <p>
          At the heart of our mission is the belief that partnerships should be
          win-win situations, where both parties benefit from the relationship.
          We are committed to building partnerships that are based on trust,
          transparency, and accountability, and we believe that these values are
          essential for
        </p>
      </section>
    </div>
  );
};

export default Home;
