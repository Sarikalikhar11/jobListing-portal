import React, { useState } from 'react';
import { FaSearch, FaRegBookmark } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import Slider from 'react-slick';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

import { Button } from '../ui/button';

const imgCategory = [
  {
    src: './../../assets/google1.png',
  },
  {
    src: './../../assets/apple.png',
  },
  {
    src: './../../assets/flipkart.png',
  },
  {
    src: './../../assets/ibm.png',
  },
  {
    src: './../../assets/youtube.png',
  },
];

const jobList = [
  {
    title: 'Technical Support Specialist',
    company: 'Google Inc.',
    location: 'New Delhi, India',
    type: 'Part-time',
    salary: '20,000 INR - 25,000 INR',
    applicants: 10,
    img: './../../assets/google.png',
  },
  {
    title: 'Senior UI/UX Designer',
    company: 'Apple',
    location: 'Boston, USA',
    type: 'Full-time',
    salary: '$30,000 - $55,000',
    applicants: 9,
    img: './../../assets/apple.png',
  },
  {
    title: 'Marketing Officer',
    company: 'Intel Corp.',
    location: 'Bangalore, India',
    type: 'Part-time',
    salary: '15,000 INR - 35,000 INR',
    applicants: 30,
    img: './../../assets/intel.png',
  },
];

const Home = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobList);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSearch = () => {
    const filtered = jobList.filter((job) => {
      const titleMatch = job.title
        .toLowerCase()
        .includes(jobTitle.toLowerCase());
      const locationMatch = job.location
        .toLowerCase()
        .includes(location.toLowerCase());
      return titleMatch && locationMatch;
    });
    setFilteredJobs(filtered);
  };

  return (
    <>
      <div className="bg-[#f9f4fc] mx-auto px-4 py-8 w-full m-2">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 mt-6 md:mt-20 px-4">
            <p className="text-3xl md:text-5xl font-semibold">
              Find a Job that aligns With
              <br /> your interests and skills
            </p>
            <p className="text-gray-700 font-medium tracking-wider mt-4">
              Thousands of jobs in all the leading sectors are waiting for you
            </p>
            <div className="relative mt-5 flex flex-col md:flex-row items-center md:items-stretch w-full">
              <div className="relative w-full md:w-auto mb-4 md:mb-0">
                <FaSearch className="text-[#6300b3] absolute left-4 top-4 text-base" />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="pl-10 pr-4 py-3 outline-none w-full"
                />
              </div>
              <div className="relative w-full md:w-auto mb-4 md:mb-0 md:ml-4">
                <FaLocationDot className="text-[#6300b3] absolute left-4 top-4 text-base" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-4 py-3 border-l-2 border-[#6300b3] outline-none w-full"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#6300b3] -ms-3 text-white font-bold px-4 py-3 rounded-md w-full md:w-auto md:ml-4"
              >
                Find Job
              </button>
            </div>
            <p className="text-gray-700 font-semibold mt-4 text-sm">
              <span className="text-gray-500">Suggestions:</span> UI/UX
              Designer, Programming,{' '}
              <span className="text-[#6300b3]">Digital Marketing, </span>Video
              Animation.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="./../../assets/hero-img.png"
              alt="hero-image"
              className="w-full md:w-auto max-w-md"
            />
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-24 mb-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-semibold">Featured Jobs</h1>
          <p className="text-xl md:text-2xl mt-2 text-gray-600">
            Choose jobs from the top employers and apply for the same
          </p>
        </div>
        <Slider {...settings}>
          {filteredJobs.map((job, index) => (
            <div key={index} className="px-2">
              <div className="bg-[#f9f4fc] flex flex-col rounded-lg shadow-md">
                <div className="flex justify-between items-center p-4">
                  <h4 className="text-gray-800 font-medium text-xl">
                    {job.title}
                  </h4>
                  <FaRegBookmark className="text-gray-600 text-xl" />
                </div>
                <p className="text-sm px-4 text-gray-500 font-semibold">
                  <span
                    className={`text-[#6300b3] uppercase bg-[#e5d8f0] rounded-md p-1`}
                  >
                    {job.type}
                  </span>{' '}
                  Salary: {job.salary}
                </p>
                <div className="flex items-center px-4 mt-2">
                  <img src={job.img} alt={job.company} className="w-12 h-12" />
                  <div className="flex flex-col ml-4">
                    <h6 className="font-bold">{job.company}</h6>
                    <p className="flex items-center">
                      <IoLocationOutline className="mr-2" /> {job.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 mt-4">
                  <p className="text-gray-600 text-md font-semibold">
                    {job.applicants}+ applicants
                  </p>
                </div>
                <div className="flex justify-between items-center gap-4 p-4">
                  <button className="border-2 border-[#6300b3] py-2 px-4 rounded-md">
                    View details
                  </button>
                  <button className="bg-[#6300b3] text-white py-2 px-4 rounded-md">
                    Apply now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-8 w-full m-4">
        <div className="text-center mb-16 md:mb-32">
          <h1 className="text-xl md:text-5xl font-semibold underline text-[#6300b3]">
            View all
          </h1>
        </div>
        <div className="text-center mb-2">
          <button className="bg-gray-100 text-gray-700 px-6 py-2 text-xl md:text-2xl font-semibold z-10">
            Top companies hiring now
          </button>
          <hr className="-mt-5 z-0 text-gray-500" />
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 md:gap-10 mt-8 me-20 px-10 py-20 hover:bg-white">
          <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
              {imgCategory.map((cat, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg-basis-1/3 flex justify-center items-center"
                >
                  <Button className="bg-[#c19cdf] h-[70px] ">
                    <img src={cat.src} alt={`category-${index}`} />
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Home;
