import React from "react";
import { Input, Button } from "antd";
import MenuNav from "../components/MenuNavBar";

const ContactUs = () => {
  return (
    <div className=" bg-slate-100 min-h-screen w-full h-fit">
      <MenuNav />
      <div className="bg-blue-500  h-fit py-16 flex flex-col  items-center">
        <h1 className="text-white text-4xl">Contact Us</h1>
        <p class="mb-8 lg:mb-16  font-light text-center text-white pt-10  sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
      </div>
      <section class="bg-white ">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <form action="#" class="space-y-8">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium ">
                Your email
              </label>
              <input
                type="email"
                id="email"
                class="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@learnify.com"
                required
              />
            </div>
            <div>
              <label for="subject" class="block mb-2 text-sm font-medium ">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                class="block p-3 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-sm font-medium ">
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submig"
              class="py-3 px-5 text-sm bg-blue-500 font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
