import './App.css';
import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {formatDate} from "./contains";

const ModuleEnum = {
    reading: 'Đọc',
    writing: 'Viết',
    listening: 'Nghe',
    speaking: 'Nói',
};

function App() {
    const [users, setUsers] = useState([]);
    const [isActive, setIsActive] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');

    function searchUsers() {
        return users.filter(user =>
            user.fullname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            user.username.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    }

    function getData(isActive) {
        axios.get(`/api/users?isActive=${isActive}`)
            .then((response) => {
                setUsers(response.data);
                setSearchKeyword('');
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
            });
    }

    function updateIsActive(id, isActive) {
        axios.get(`/api/users/update?id=${id}&isActive=${isActive}`)
            .then((response) => {
                void getData(!isActive);
                setSearchKeyword('');
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
            });
    }

    useEffect(() => {
        getData(isActive);
    }, [isActive])

    return (
        <>
            <Disclosure as="nav" className="bg-white shadow sticky top-0">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex px-2 lg:px-0">
                            <div className="flex-shrink-0 flex items-center">
                                <img
                                    className="block lg:hidden h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                    alt="Workflow"
                                />
                                <img
                                    className="hidden lg:block h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                            <div className="max-w-lg w-full lg:max-w-xs">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div
                                        className="absolute text-gray-500 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                                        </svg>
                                    </div>
                                    <input
                                        id="search"
                                        name="search" value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Tìm kiếm"
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center lg:hidden">
                            {/* Mobile menu button */}
                            <div
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open main menu</span>
                                {isActive === 1 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         onClick={() => setIsActive(0)}
                                         strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-indigo-700">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                  onClick={() => setIsActive(1)}
                                                  strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
                                    </svg>}
                            </div>
                        </div>
                        <div className="hidden lg:ml-4 lg:flex lg:items-center">
                            <div className="ml-4 relative flex-shrink-0">
                                <div
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {isActive === 1 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             onClick={() => setIsActive(0)}
                                             strokeWidth="1.5" stroke="currentColor"
                                             className="w-8 h-8 text-indigo-700">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                      onClick={() => setIsActive(1)}
                                                      strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
                                        </svg>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
            <div className="md:container md:mx-auto">
                <ul role="list" className="divide-y divide-gray-200">
                    {searchUsers().map((item) => (
                        <li key={item.id} className="px-4 py-4 sm:px-0">
                            <div className={`flex justify-between`}>
                                <div className={`flex flex-col`}>
                                    <span
                                        className={`font-bold`}>{item.fullname}</span>
                                    <span className={`text-sm text-gray-500`}>{item.username}</span>
                                    <span
                                        className={`text-sm font-semibold`}>{item.module.split(',').map((m, i) => ModuleEnum[m]).join(', ')}<span
                                        className={`text-sm font-normal`}>&nbsp;({formatDate(item.startDate)} - {formatDate(item.endDate)})</span></span>
                                </div>
                                <div className={`flex flex-col gap-y-3`}>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                        </svg>
                                    </button>
                                    <button>
                                        {item.isActive === 0 ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 onClick={() => updateIsActive(item.id, item.isActive === 1 ? 0 : 1)}
                                                 strokeWidth="1.5" stroke="currentColor"
                                                 className="w-6 h-6 text-indigo-700">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 onClick={() => updateIsActive(item.id, item.isActive === 1 ? 0 : 1)}
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
                                            </svg>}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;
