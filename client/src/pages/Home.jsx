import React from "react";
import Header from "../component/features/Header";
import img1 from "../assets/img/course114360x340.jpg";
import img2 from "../assets/img/course614360x340.jpg";
import img3 from "../assets/img/courses1.jpg";
import img4 from "../assets/img/courses2.jpg";
import img5 from "../assets/img/courses3.jpg";
import img6 from "../assets/img/courses4.jpg";
import img7 from "../assets/img/equestrian1.jpg";
import img8 from "../assets/img/equestrian2.jpg";
import img9 from "../assets/img/equestrian3.jpg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const arrImges = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const navigator = useNavigate();

  const handleScroll = () => {
    window.scroll({
      top: 200,
      left: 200,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className="relative bg-no-repeat bg-cover bg-center-top  bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url(https://media.giphy.com/media/R8bcfuGTZONyw/giphy.gif)",
          height: "100vh",
        }}>
        <Header />
        <div className="absolute  justify-center items-center   p-4 text-white right-40 rounded-md top-1/3 ">
          <h1 className="text-3xl mb-2 text-[var(--primary-color)] p-2 rounded-md w-44">
            تدريب الخيول
          </h1>
          <p className="w-[800px] text-2xl mb-2">
            تدريب الخيول عملية منظمة يتم من خلالها تمرينها بشكل تدريجي على إحداث
            تغيير في شخصية ومهام الحصان ونقله إلى مستوى يكون فيه أكثر فعالية في
            أداء ما يطلب منه وأكثر قدرة على المنافسة.
          </p>
          <button
            onClick={() => handleScroll()}
            className="bg-[var(--primary-color)] hover:scale-95 transition-all duration-300 w-28 p-2">
            تعرف علينا
          </button>
        </div>
      </div>
      <div className="container grid grid-cols-3 gap-4">
        {arrImges.map((x, i) => (
          <img
            src={x}
            key={i}
            className="w-80 h-80 rounded-lg shadow-lg hover:scale-95 cursor-pointer transition-all duration-300"
          />
        ))}
      </div>
    </>
  );
};

export default Home;
