import { addDoc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { MultiSelect } from "react-multi-select-component";

import "react-datepicker/dist/react-datepicker.css";

import {
    eventsCollection,
    storage,
    updateUserDocument,
} from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

import LocaInput from "../reusableComponents/LocaInput";
import { interestList } from "../../lib/interestsList";

function CreateEvent() {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedInterets, setSelectedInterets] = useState([]);
    const [loca, setLoca] = useState(null);
    const { user, setUser } = useUser();
    const router = useRouter();
    const [urlsBunch, setUrlsBunch] = useState(null);

    const options = interestList.map((obj) => {
        return {
            label: `${obj.title}`,
            value: `${obj.title}`,
        };
    });

    const handleLocationSelect = (selectedLocation) => {
        setLoca(() => selectedLocation);
    };

    useEffect(() => {
        if (urlsBunch) {
            console.log("urlsBunch.....:", urlsBunch);
        }
    }, [urlsBunch]);

    async function handleCreateForm(e) {
        e.preventDefault();

        try {
            const imgFile = e.target.image.files[0];

            const fileName = imgFile.name;
            const eventImageRef = ref(
                storage,
                `images/${user.uid}/${fileName}`
            );

            await uploadBytes(eventImageRef, imgFile);
            const url = await getDownloadURL(eventImageRef);

            setUrlsBunch(() => url);

            const newDocRef = await addDoc(eventsCollection, {
                title: e.target.title.value,
                about: e.target.about.value,
                date: startDate.toLocaleDateString("en-GB"),
                image: url,
                location: loca,
                interests: selectedInterets.map((interest) => interest.value),
                createdBy: user.uid,
                attendees: [user.uid],
            });

            await updateUserDocument(user.uid, {
                iEvents: arrayUnion(newDocRef.id),
            });

            e.target.reset();
            router.push("/events");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='m-0 box-border bg-bgc-silver'>
            <div className='relative overflow-hidden w-full h-96'>
                <Image
                    src='/images/publicSpeak.jpg'
                    alt='plant'
                    className='w-full h-auto'
                    width={1920}
                    height={1080}
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
                    <div className='bg-black bg-opacity-50 p-8'>
                        <Image
                            className=' mx-auto my-auto'
                            src='/images/HeroLogo.png'
                            alt='logo'
                            width={40}
                            height={60}
                        ></Image>
                        <h1 className='text-4xl font-bold text-center mb-2 font-Montserrat text-white'>
                            Host an Event!
                        </h1>
                        <p className='text-lg font-Lora text-center text-white'>
                            Empower change by hosting your own event with us!
                            Our easy setup and do-it-yourself model let you
                            become a community leader effortlessly. Start making
                            a positive impact today—create an event that
                            matters. Join us in spreading joy and kindness!
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full border border-x-bgc-Charcoal bg-bgc-silver mx-auto'>
                <div className='flex items-start justify-between p-5 border-b rounded-t'>
                    <h3 className='font-Montserrat text-txtc-DarkCharcoal text-2xl text-center font-semibold'>
                        Create Your Own Event
                    </h3>
                </div>
                <div className='p-6 space-y-6'>
                    <form
                        onSubmit={handleCreateForm}
                        className='space-y-4 space-x-4 m-2 p-2'
                    >
                        <div className='grid grid-cols-6 gap-6'>
                            <div className='col-span-6 sm:col-span-3'>
                                <label htmlFor='title' className='form-input'>
                                    Title
                                </label>
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    placeholder='Green tech”'
                                    required
                                />
                            </div>
                            <div className='col-span-6 sm:col-span-3'>
                                <label
                                    htmlFor='Interests'
                                    className='form-input'
                                >
                                    Interests
                                </label>
                                <MultiSelect
                                    options={options}
                                    value={selectedInterets}
                                    onChange={setSelectedInterets}
                                    labelledBy='Select'
                                    className='m-0 shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full '
                                />
                            </div>
                            <div className='col-span-6 sm:col-span-3'>
                                <label
                                    htmlFor='location'
                                    className='form-input'
                                >
                                    Location
                                </label>
                                <LocaInput
                                    name='location'
                                    id='location'
                                    className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    placeholder='location'
                                    initialLocation={loca}
                                    onSelectLocation={handleLocationSelect}
                                />
                            </div>
                            <div className='col-span-6 sm:col-span-3'>
                                <label htmlFor='image' className='form-input'>
                                    Images
                                </label>
                                <input
                                    type='file'
                                    name='image'
                                    id='image'
                                    className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    placeholder='provide an Image if possible ..'
                                />
                            </div>
                            <div className='col-span-6 sm:col-span-3'>
                                <label htmlFor='date' className='form-input'>
                                    date
                                </label>
                                <DatePicker
                                    type='text'
                                    name='date'
                                    id='date'
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd MMM yyyy 'at' HH'h'mm"
                                    showTimeSelect
                                    timeFormat='p'
                                    showYearDropdown
                                    scrollableMonthYearDropdown
                                    className='shadow-xl bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                />
                            </div>
                            <div className='col-span-full'>
                                <label htmlFor='about' className='form-input'>
                                    About
                                </label>
                                <textarea
                                    id='about'
                                    rows='6'
                                    className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    placeholder='e.g helping kids, coach..etc'
                                ></textarea>
                            </div>
                        </div>
                        <button
                            className='text-txtc-DarkCharcoal text-l font-Roboto bg-bgc-sunflower hover:bg-bgc-sunflower focus:ring-4 focus:ring-bgc-Charcoal font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            type='submit'
                        >
                            Save all
                        </button>
                    </form>
                </div>
                <div className='p-6 border-t border-gray-200 rounded-b'></div>
            </div>
        </div>
    );
}

export default CreateEvent;
