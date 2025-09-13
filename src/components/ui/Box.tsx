import React from 'react'
import { FaAngleDoubleUp } from "react-icons/fa"
import { BarChart, Bar, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Page A', uv: 4000 },
    { name: 'Page B', uv: 3600 },
    { name: 'Page C', uv: 3000 },
    { name: 'Page D', uv: 2800 },
    { name: 'Page E', uv: 2500 },
]

const Box = ({ title, count, icon, progress }: any) => {
    return (
        <div className='bg-white dark:bg-gray-950 shadow-md border border-gray-200 dark:border-gray-700 rounded-md p-3 flex flex-col justify-between h-full transition-colors duration-300'>
            
            {/* Top: Icon + Info + Mini Chart */}
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <div className='text-3xl text-gray-700 dark:text-gray-200'>{icon}</div>
                    <div className='flex flex-col'>
                        <h4 className='text-gray-700 dark:text-gray-200 font-medium'>{title}</h4>
                        <h5 className='text-[22px] font-bold text-gray-900 dark:text-white'>{count}</h5>
                    </div>
                </div>

                {/* Mini Bar Chart */}
                <div className='w-[100px] h-[50px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barGap={1} barCategoryGap="20%">
                            <Bar dataKey="uv" fill='#3b82f6' barSize={5} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <hr className='my-3 border-gray-200 dark:border-gray-700' />

            {/* Bottom: Progress */}
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <FaAngleDoubleUp
                        className={`${progress ? 'text-green-600' : 'text-red-600 rotate-180'}`}
                        size={18}
                    />
                    <span className={`${progress ? 'text-green-600' : 'text-red-600'} font-semibold text-sm`}>
                        +32.40%
                    </span>
                </div>
                <span className='text-gray-500 dark:text-gray-300 text-sm'>
                    {progress ? "Increased" : "Decreased"} last month
                </span>
            </div>
        </div>
    )
}

export default Box
