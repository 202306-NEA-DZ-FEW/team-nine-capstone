import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { MultiSelect } from "react-multi-select-component";

import "react-datepicker/dist/react-datepicker.css";

import { firestore } from "@/lib/firebase/controller";

import LocationInput from "../reusableComponents/LocationInput";
import { interestList } from "../../lib/interestsList";

function EditEvent() {
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

    function handleEditForm(e) {
        e.preventDefault();
        // console.log(e.target.about.value)
        // console.log(e.target.date.value)
        // console.log(e.target.image.value)
        // console.log(e.target.category.value)
        // console.log(e.target.location.value)
        if (id) {
            const updatedInfo = {
                title: e.target.title.value,
                about: e.target.about.value,
                date: startDate.toLocaleDateString("en-GB"),
                image: e.target.image.value,
                location: loca,
                interests: selectedInterets.map((interest) => interest.value),
            };

            const eventRef = doc(firestore, "events", id);
            updateDoc(eventRef, updatedInfo);
            console.log("theeventREf", eventRef);
        }
    }

    const handleLocationSelect = (selectedLocation) => {
        setLoca(selectedLocation);
    };

    return (
        <div className='bg-white border rounded-lg shadow relative m-10'>
            <div className='flex items-start justify-between p-5 border-b rounded-t '>
                <h3 className='text-2xl font-semibold'>Edit Event</h3>
                <button
                    type='button'
                    className='text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                    data-modal-toggle='Event-modal'
                ></button>
            </div>
            <div className='p-6 space-y-6'>
                <form onSubmit={handleEditForm}>
                    <div className='grid grid-cols-6 gap-6'>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='title'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Title
                            </label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='Green tech”'
                                required
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='Interests'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Interests
                            </label>
                            <MultiSelect
                                options={options}
                                value={selectedInterets}
                                onChange={setSelectedInterets}
                                labelledBy='Select'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='location'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Location
                            </label>
                            <LocationInput
                                name='location'
                                id='location'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='location'
                                initialLocation={loca}
                                onSelectLocation={handleLocationSelect}
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='image'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Images
                            </label>
                            <input
                                type='text'
                                name='image'
                                id='image'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='provide an Url e.g http:// ...'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='date'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
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
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                            />
                        </div>
                        <div className='col-span-full'>
                            <label
                                htmlFor='about'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                About
                            </label>
                            <textarea
                                id='about'
                                rows='6'
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4'
                                placeholder='e.g helping kids, coach..etc'
                            ></textarea>
                        </div>
                    </div>
                    <button
                        className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        type='submit'
                    >
                        Save all
                    </button>
                </form>
            </div>
            <div className='p-6 border-t border-gray-200 rounded-b'></div>
        </div>
    );
}

export default EditEvent;
