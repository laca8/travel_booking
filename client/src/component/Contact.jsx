import React from "react";
import Header from "./Header";
import conImg from "../assets/img/contact.jpg";
const Contact = () => {
  return (
    <div>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      <div
        className="container  mt-10 mb-2  p-10 rounded-lg bg-no-repeat bg-cover bg-center-top  bg-fixed"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url(${conImg})`,
        }}>
        <div className="flex items-center justify-center">
          <h3 className="text-white text-xl font-bold border-2 border-white p-2 rounded-lg">
            تواصل معنا
          </h3>
        </div>
        <div className="grid grid-cols-1">
          <span className="text-white text-lg   p-1 rounded-lg">
            {" "}
            يسعدنا تواصلك معنا
          </span>
          <span className="text-white text-[60px] font-bold  p-1 rounded-lg">
            رأيك يهمنا
          </span>
          <p className="text-white text-xl   p-1 rounded-lg w-[600px]">
            لديك إقتراح؟ ربما شكوي او إستفسار تواصل معنا وسوف نقوم بالرد عليك في
            اقرب وقت.
          </p>
          <span className="text-white text-[30px] font-bold  p-1 rounded-lg">
            البريد الإلكتروني
          </span>
          <span className="text-white text-xl   p-1 rounded-lg">
            email@example.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
