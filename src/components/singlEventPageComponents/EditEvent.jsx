import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { MultiSelect } from "react-multi-select-component";

import "react-datepicker/dist/react-datepicker.css";

import { firestore, storage } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

import LocaInput from "../reusableComponents/LocaInput";
import { interestList } from "../../lib/interestsList";

function EditEvent() {
    const { user, setUser } = useUser();
    const [imageInput, setImageInput] = useState(null);
    const [urlsBunch, setUrlsBunch] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [selectedInterets, setSelectedInterets] = useState([]);
    const [loca, setLoca] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const options = interestList.map((obj) => {
        return {
            label: `${obj.title}`,
            value: `${obj.title}`,
        };
    });

    const handleLocationSelect = (selectedLocation) => {
        setLoca(selectedLocation);
    };

    const [oldInfo, setOldInfo] = useState(null);
    const [newInfo, setNewInfo] = useState(null);

    // getting the original data

    const eventRef = doc(firestore, "events", id);

    useEffect(() => {
        const originalEventShow = async () => {
            const docGet = await getDoc(eventRef);
            // console.log(docGet.data(), "this docGet", docGet.id, "this docID");
            const EventData = docGet.data();

            // console.log(oldInfo, "before");

            setOldInfo(() => {
                return {
                    title: EventData.title,

                    about: EventData.about,

                    date: EventData.date,

                    image: EventData.image,

                    location: EventData.location,

                    interests: EventData.interests,

                    CreatedBy: EventData.CreatedBy,
                };
            });
        };

        originalEventShow();
    }, []);

    console.log(oldInfo, "oldinfo");

    // collecting new data and chcking

    async function handleEditForm(e) {
        e.preventDefault();

        const imgFile = e.target.image.files[0];

        if (imgFile != undefined) {
            setImageInput(() => imgFile);
            const fileName = imgFile.name;
            const eventImageRef = ref(
                storage,
                `images/${user.uid}/${fileName}`
            );

            try {
                const snapshot = await uploadBytes(eventImageRef, imageInput);
                const url = await getDownloadURL(snapshot.ref);
                setUrlsBunch(url);
            } catch (error) {
                console.error("Error image..................:", error);
            }
        }

        const updatedInfo = {
            title: e.target.title.value ? e.target.title.value : oldInfo.title,
            about: e.target.about.value ? e.target.about.value : oldInfo.about,
            date: startDate
                ? startDate.toLocaleDateString("en-GB")
                : oldInfo.date,
            image: urlsBunch ? urlsBunch : oldInfo.image,
            location: loca ? loca : oldInfo.location,
            interests:
                selectedInterets.length !== 0
                    ? selectedInterets.map((interest) => interest.value)
                    : oldInfo.interests,
            CreatedBy: user.uid,
        };

        console.log("this is new info", updatedInfo);

        try {
            await updateDoc(eventRef, updatedInfo);
            console.log("updated................... ");
            router.push("/events");
        } catch (error) {
            console.error("Error ..............:", error);
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
                    objectFit='cover'
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
                        Edit Your Event
                    </h3>
                </div>
                <div className='p-6 space-y-6'>
                    <form
                        onSubmit={handleEditForm}
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
                                    placeholder='Location'
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

export default EditEvent;
