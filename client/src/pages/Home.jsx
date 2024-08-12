import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import budgetPlanner from '../assets/budgetplanner.jpg'
import analitics from '../assets/analitics.jpeg'
import traker from '../assets/traker.png'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mt-[71px] bg-black text-white flex flex-col items-center justify-center p-6">
      
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to <span className="text-purple-500">FinanceMaster</span>
        </h1>
        <p className="text-2xl md:text-3xl">
          <Typewriter
            words={['Manage Your Finances', 'Track Your Expenses', 'Grow Your Wealth']}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
        <p className="text-lg md:text-xl text-gray-400">
          Your ultimate tool to take control of your finances and achieve financial freedom.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-purple-500 hover:bg-purple-600 text-lg md:text-xl font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <Link to='/income'>Get Started</Link>
          </button>
          <button className="bg-transparent border-2 border-teal-500 hover:bg-teal-600 text-lg md:text-xl font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>
      </div>

      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-gray-800 p-6 rounded-lg text-center transform hover:scale-105 transition duration-300 ease-in-out">
          <img src={budgetPlanner} alt="Budget Planning" className="h-32 mx-auto mb-4" />
          <h3 className="text-xl font-bold">Budget Planning</h3>
          <p className="text-gray-400 mt-2">
            Plan and manage your budget effectively with our intuitive tools.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center transform hover:scale-105 transition duration-300 ease-in-out">
          <img src={analitics} alt="Analytics" className="h-32 mx-auto mb-4" />
          <h3 className="text-xl font-bold">Advanced Analytics</h3>
          <p className="text-gray-400 mt-2">
            Get detailed insights into your financial habits and improve your spending.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center transform hover:scale-105 transition duration-300 ease-in-out">
          <img src={traker} alt="Investment Tracking" className="h-32 mx-auto mb-4" />
          <h3 className="text-xl font-bold">Investment Tracking</h3>
          <p className="text-gray-400 mt-2">
            Monitor your investments and track your growth over time.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 w-full max-w-5xl text-center text-gray-400">
        <p>&copy; 2024 FinanceMaster. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

