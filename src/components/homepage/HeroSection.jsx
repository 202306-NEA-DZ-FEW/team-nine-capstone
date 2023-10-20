import Image from "next/image";
import React from "react";

const Hero = () => {
    return (
        <div>
            <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto my-8'>
                <div className='md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12'>
                    <div className='md:w-3/5 mx-auto '>
                        <h2 className='text-4xl text-zinc-900 font-semibold mb-4 md:w-4/5'>
                            Medium title placeholder text
                        </h2>
                        <p className='md:w-3/4 text-zinc-500 mb-8'>
                            Body placeholder for text paragraph. A paragraph is
                            a self-contained unit of text dealing with a
                            particular point or idea.Body placeholder for text
                            paragraph. A paragraph is a self-contained unit of
                            text dealing with a particular point or idea.Body
                            placeholder for text paragraph. A paragraph is a
                            self-contained unit of text dealing with a
                            particular point or idea.
                        </p>
                        <button className='w-[166px] h-14 px-4 py-3 bg-cyan-700 rounded-lg flex justify-center items-center text-white text-xl font-medium font-Rubik leading-[30px] tracking-tight'>
                            Get Started
                        </button>
                    </div>
                    <div>
                        <Image
                            src='/images/square.png'
                            alt=''
                            width={630}
                            height={630}
                            className='w-[630px] h-full'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Hero;
