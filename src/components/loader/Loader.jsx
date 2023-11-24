import React from "react";

function Loader() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='relative'>
                <div className='w-20 h-20 border-bgc-ForestGreen border-2 rounded-full'></div>
                <div className='w-20 h-20 border-bgc-sunflower border-t-2 animate-spin rounded-full absolute left-0 top-0'></div>
            </div>

            <div className='relative'>
                <div className='w-10 h-10 border-bgc-ForestGreen border-2 rounded-full'></div>
                <div className='w-10 h-10 border-bgc-sunflower border-t-2 animate-spin rounded-full absolute left-0 top-0'></div>
            </div>

            <div className='relative'>
                <div className='w-5 h-5 border-bgc-ForestGreen border-2 rounded-full'></div>
                <div className='w-5 h-5 border-bgc-sunflower border-t-2 animate-spin rounded-full absolute left-0 top-0'></div>
            </div>
        </div>
    );
}

export default Loader;
