import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/samarabiz-logo.svg";
import people1 from "../assets/images/people1.jpg";
import people2 from "../assets/images/people2.jpg";
import people3 from "../assets/images/people3.jpg";
import people4 from "../assets/images/people4.jpg";
import people5 from "../assets/images/people5.jpg";
import money from "../assets/images/money.png";
import stack from "../assets/images/stack.png";
import group from "../assets/images/group.png";
import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";
import {Button} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }


  return (
    <div>
      {/* nav section */}
      <nav className="bg-violet-950 flex justify-between items-center px-16 py-2 border-b-2 border-white fixed w-full">
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
          <Button onClick={handleLoginClick}  variant="outlined" size="small" sx={{borderColor: 'white', color: 'white'}} >
            LOGIN 
          </Button>
        </div>
      </nav>

      {/* Mission Section */}
      <section className="bg-slate-200 px-16 pt-44 pb-28 text-center">
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
        <h1 className="text-3xl font-semibold mb-8">OUR PROJECTS</h1>
        {/* Projects Cards */}
        <div className="flex justify-between">
          <div className="w-[440px] h-auto border rounded p-4">
            <div>
              <img className="h-[270px]" src={project1} alt="project" />
            </div>
            <h3 className="text-left text-2xl font-semibold ml-2 my-4">
              Billing Service Project
            </h3>
            <div className="flex justify-between">
              <div className="border p-2 rounded m-2 w-52">
                <h4>125000 AED</h4>
                <h4>Investment Required</h4>
              </div>
              <div className="border p-2 rounded m-2 w-52">
                <h4>200 AED</h4>
                <h4>Profit Amount</h4>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="border p-2 rounded m-2 w-52">
                <h4>10/6</h4>
                <h4>Total Share/Sold Share</h4>
              </div>
              <div className="border p-2 rounded m-2 w-52">
                <h4>3</h4>
                <h4>No. of Investors</h4>
              </div>
            </div>
            <p className="text-left p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              perspiciatis culpa, iusto explicabo vero quas ut? Necessitatibus
              odio, ullam ipsum in veritatis sunt consequuntur nobis labore cum
              animi quisquam laborum?
            </p>
          </div>
          <div className="w-[440px] h-auto border rounded p-4">
            <div>
              <img className="h-[270px]" src={project2} alt="project" />
            </div>
            <h3 className="text-left text-2xl font-semibold ml-2 my-4">
              Billing Service Project
            </h3>
            <div className="flex justify-between">
              <div className="border p-2 rounded m-2 w-52">
                <h4>125000 AED</h4>
                <h4>Investment Required</h4>
              </div>
              <div className="border p-2 rounded m-2 w-52">
                <h4>200 AED</h4>
                <h4>Profit Amount</h4>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="border p-2 rounded m-2 w-52">
                <h4>10/6</h4>
                <h4>Total Share/Sold Share</h4>
              </div>
              <div className="border p-2 rounded m-2 w-52">
                <h4>3</h4>
                <h4>No. of Investors</h4>
              </div>
            </div>
            <p className="text-left p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              perspiciatis culpa, iusto explicabo vero quas ut? Necessitatibus
              odio, ullam ipsum in veritatis sunt consequuntur nobis labore cum
              animi quisquam laborum?
            </p>
          </div>
          <div className="w-[440px] h-auto border rounded p-4">
            <div>
              <img className="h-[270px]" src={project3} alt="project" />
            </div>
            <h3 className="text-left text-2xl font-semibold ml-2 my-4">
              Billing Service Project
            </h3>
            <div className="flex justify-between">
              <div className="border p-2 rounded m-2 w-52">
                <h4>125000 AED</h4>
                <h4>Investment Required</h4>
              </div>
              <div className="border p-2 rounded m-2 w-52">
                <h4>200 AED</h4>
                <h4>Profit Amount</h4>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="border p-2 rounded m-2 w-52">
                <h4>10/6</h4>
                <h4>Total Share/Sold Share</h4>
              </div>
              <div className="border p-2 rounded m-2 w-52">
                <h4>3</h4>
                <h4>No. of Investors</h4>
              </div>
            </div>
            <p className="text-left p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              perspiciatis culpa, iusto explicabo vero quas ut? Necessitatibus
              odio, ullam ipsum in veritatis sunt consequuntur nobis labore cum
              animi quisquam laborum?
            </p>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-slate-200 px-16 py-28 text-center">
        {/* How We Work Heading */}
        <h1 className="text-3xl font-semibold mb-8">HOW WE WORK</h1>
        {/* How We Work Description */}
        <p className="mb-4">
          A partnership fund rising business is a type of business that raises
          funds through partnerships with investors, rather than through
          traditional loans or other forms of financing. This type of business
          is often used by startups or small businesses that are looking to
          raise capital but may not have the credit history or financial
          stability to secure a loan from a bank.
        </p>
        <p className="mb-4">
          To start a partnership fund raising business, you will need to
          identify potential investors who are interested in investing in your
          business. You will then need to create a partnership agreement that
          outlines the terms of the partnership, including the amount of money
          that the investor will contribute, the expected return on investment,
          and any other relevant details.
        </p>
        <p className="mb-4">
          Once you have secured partnerships with investors, you will need to
          use the funds to grow your business. This may involve hiring new
          employees, investing in marketing and advertising, or developing new
          products or services. It's important to keep your investors informed
          of your progress and provide regular updates on the status of the
          business.
        </p>
        <p className="mb-4">
          To be successful in a partnership fund raising business, it's
          important to establish a strong network of investors and to have a
          solid business plan in place. You should also be prepared to manage
          the partnerships effectively, including handling any conflicts or
          issues that may arise.
        </p>
        <p className="mb-4">
          Overall, a partnership fund raising business can be a great way to
          raise capital and grow your business. With the right strategy and a
          commitment to building strong partnerships, you can achieve success
          and reach your goals.
        </p>
        <p>
          SamaraBiz is most often used in startup companies or growing
          businesses as a way of accessing alternative funds.
        </p>
      </section>

      {/* Our Investors Section */}
      <section className="px-16 py-28 text-center">
        {/* Our Investors Heading */}
        <h1 className="text-3xl font-semibold mb-8">OUR INVESTORS</h1>
        {/* Our Investors Cards */}
        <div className="flex justify-between flex-wrap">
          <div className="w-64 border rounded h-44 px-10 py-6">
            <div className="flex justify-center mb-4">
              <img
                className="h-20 w-20 rounded-full object-cover border-4 border-slate-800"
                src={people1}
                alt="investor"
              />
            </div>
            <h3>Mohammad Waliullah</h3>
          </div>
          <div className="w-64 border rounded h-44 px-10 py-6">
            <div className="flex justify-center mb-4">
              <img
                className="h-20 w-20 rounded-full object-cover border-4 border-slate-800"
                src={people2}
                alt="investor"
              />
            </div>
            <h3>Towhidul Islam</h3>
          </div>
          <div className="w-64 border rounded h-44 px-10 py-6">
            <div className="flex justify-center mb-4">
              <img
                className="h-20 w-20 rounded-full object-cover border-4 border-slate-800"
                src={people3}
                alt="investor"
              />
            </div>
            <h3>Omar Faruk</h3>
          </div>
          <div className="w-64 border rounded h-44 px-10 py-6">
            <div className="flex justify-center mb-4">
              <img
                className="h-20 w-20 rounded-full object-cover border-4 border-slate-800"
                src={people4}
                alt="investor"
              />
            </div>
            <h3>Mahadi Hasan</h3>
          </div>
          <div className="w-64 border rounded h-44 px-10 py-6">
            <div className="flex justify-center mb-4">
              <img
                className="h-20 w-20 rounded-full object-cover border-4 border-slate-800"
                src={people5}
                alt="investor"
              />
            </div>
            <h3>Wahed Emon</h3>
          </div>
        </div>
      </section>

      {/* Investment Summary Section */}
      <section className="bg-slate-200 px-16 py-28 text-center">
        {/* Investment Summary Heading */}
        <h1 className="text-3xl font-semibold mb-8">INVESTMENT SUMMARY</h1>
        {/* Investment Summary Cards */}
        <div className="flex justify-center">
          <div className="w-80 border border-black rounded h-44 px-10 py-6 mx-4">
            <div className="flex justify-center mb-4">
              <img className="h-12 w-12" src={group} alt="people" />
            </div>
            <h4>Number Of Investors</h4>
            <h1 className="text-2xl font-semibold mt-2">4</h1>
          </div>
          <div className="w-80 border border-black rounded h-44 px-10 py-6 mx-4">
            <div className="flex justify-center mb-4">
              <img className="h-12 w-12" src={stack} alt="stack" />
            </div>
            <h4>Total Investments</h4>
            <h1 className="text-2xl font-semibold mt-2">314.25K AED</h1>
          </div>
          <div className="w-80 border border-black rounded h-44 px-10 py-6 mx-4">
            <div className="flex justify-center mb-4">
              <img className="h-12 w-12" src={money} alt="money" />
            </div>
            <h4>Total Earning</h4>
            <h1 className="text-2xl font-semibold mt-2">0 AED</h1>
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section className="px-16 py-28 text-center">
        {/* Funding Section Heading */}
        <h1 className="text-3xl font-semibold mb-8">NUSRAH FUNDING</h1>
        {/* Funding Section Description */}
        <p className="mb-4">
          Nusrah Funding is a humanitarian organization that provides aid and
          assistance to people in need, regardless of their race, religion, or
          gender. Their projects include emergency relief efforts, education,
          healthcare, and livelihood programs. You can donate to Islamic Relief
          to support their ongoing efforts to help those in need around the
          world.
        </p>
        <p className="mb-4">
          There are millions of orphans around the world who are in need of
          support and care. By sponsoring an orphan, you can provide them with
          access to education, healthcare, and basic necessities like food and
          shelter. Many organizations offer orphan sponsorship programs,
          including Islamic Relief, Human Appeal, and Penny Appeal.
        </p>
        <p className="mb-4">
          Access to clean water is a basic human right that many people around
          the world do not have. By donating to organizations that provide clean
          water projects, you can help communities gain access to safe and clean
          drinking water.
        </p>
        <p className="mb-4">
          There are millions of refugees around the world who have been
          displaced from their homes due to conflict, persecution, or natural
          disasters. By supporting organizations that provide refugee support,
          you can help these vulnerable individuals with shelter, food,
          healthcare, and other basic needs.
        </p>
        {/* Funding Section Button */}
        <div>
          <button className="bg-orange-500 py-2 px-3 rounded text-white font-semibold text-sm">
            DONATE NOW
          </button>
        </div>
      </section>

      {/* footer */}
      <footer className="px-16 pt-28 bg-indigo-950 text-white">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Location</h3>
            <div>
              <p>Dhaka</p>
            </div>
            <div>
              <p>+880 1823432432</p>
            </div>
            <div>
              <p>support@samarabizfunding.com</p>
            </div>
            <div>
              <p>Bangladesh</p>
            </div>
          </div>
          <div className="mt-9">
            <div>
              <p>FAQ</p>
            </div>
            <div>
              <p>Contact Us</p>
            </div>
            <div>
              <p>About Us</p>
            </div>
            <div>
              <p>Terms & Conditions</p>
            </div>
          </div>
          <div className="mt-9">
            <div>
              <p>Projects</p>
            </div>
            <div>
              <p>Investors</p>
            </div>
            <div>
              <p>Funding</p>
            </div>
            <div>
              <p>Success Story</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Social Networks</h3>
            <div>
              <p>facebook.com/samarabizfunding</p>
            </div>
            <div>
              <p>twitter.com/samarabizfunding</p>
            </div>
            <div>
              <p>+880 1823432432</p>
            </div>
            <div>
              <p>youtube.com/samarabizfunding</p>
            </div>
          </div>
        </div>
        <div className="text-white mt-28 text-center pb-4">
          <p>SAMARABIZ-FUNDING © 2024 ALL RIGHTS RESERVED​</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
