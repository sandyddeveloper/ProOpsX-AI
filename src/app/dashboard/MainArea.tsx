"use client";

import DashboardBoxes from '@/components/dashboard/DashboardBoxes';
import { Button } from '@mui/material';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const MainArea = () => {
    return (
        <div className="w-full h-full space-y-6">
            {/* Greeting Section */}
            <div className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                {/* Left Side */}
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                        Good Morning,<br />Harini
                    </h1>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md">
                        Here's what's happening on your team today. See the statistics at once.
                    </p>
                    <div>
                        <Button 
                            className="!bg-black dark:!bg-gray-500 hover:!bg-gray-700 !text-white !capitalize !font-semibold !px-5 !py-2 rounded-lg flex items-center gap-2"
                        >
                            <FaPlus size={12} />
                            Show Projects
                        </Button>
                    </div>
                </div>

                {/* Right Side - Illustration */}
                <div className="w-[200px] md:w-[250px]">
                    <img 
                        src="https://static.vecteezy.com/system/resources/thumbnails/012/329/158/small_2x/data-analysis-graph-and-chart-in-business-dashboard-flat-illustration-purple-and-green-design-concept-vector.jpg" 
                        alt="Dashboard illustration" 
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Stats Boxes */}
            <DashboardBoxes />
        </div>
    );
};

export default MainArea;
