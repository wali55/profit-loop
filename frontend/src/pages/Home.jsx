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

      {/* Our Projects Section */}
      <section className="px-16 py-28 text-center">
        {/* Projects Header */}
        <h1 className="text-3xl font-semibold mb-8">Our Projects</h1>
        {/* Projects Cards */}
      </section>

      {/* How We Work Section */}
      <section className="bg-slate-200 px-16 py-28 text-center">
        {/* How We Work Heading */}
        <h1 className="text-3xl font-semibold mb-8">How We Work</h1>
        {/* How We Work Description */}
        <p className="mb-4">A partnership fund rising business is a type of business that raises funds through partnerships with investors, rather than through traditional loans or other forms of financing. This type of business is often used by startups or small businesses that are looking to raise capital but may not have the credit history or financial stability to secure a loan from a bank.</p>
        <p className="mb-4">To start a partnership fund raising business, you will need to identify potential investors who are interested in investing in your business. You will then need to create a partnership agreement that outlines the terms of the partnership, including the amount of money that the investor will contribute, the expected return on investment, and any other relevant details.</p>
        <p className="mb-4">Once you have secured partnerships with investors, you will need to use the funds to grow your business. This may involve hiring new employees, investing in marketing and advertising, or developing new products or services. It's important to keep your investors informed of your progress and provide regular updates on the status of the business.</p>
        <p className="mb-4">To be successful in a partnership fund raising business, it's important to establish a strong network of investors and to have a solid business plan in place. You should also be prepared to manage the partnerships effectively, including handling any conflicts or issues that may arise.</p>
        <p className="mb-4">Overall, a partnership fund raising business can be a great way to raise capital and grow your business. With the right strategy and a commitment to building strong partnerships, you can achieve success and reach your goals.</p>
        <p>SamaraBiz is most often used in startup companies or growing businesses as a way of accessing alternative funds.</p>
      </section>

      {/* Our Investors Section */}
      <section>
        {/* Our Investors Heading */}
        <h1 className="text-3xl font-semibold mb-8">Our Investors</h1>
        {/* Our Investors Cards */}
      </section>
    </div>
  );
};

export default Home;
