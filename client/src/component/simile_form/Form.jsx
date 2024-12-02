import horse from "../../assets/img/horse.jpg";
export default function HorseIdentificationForm() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-4 md:p-8">
      <div className=" bg-gray-300 p-6 space-y-6">
        {/* Header */}
        <div className="flex  items-center justify-between  border-b border-black pb-4">
          <div className="w-full flex flex-col items-center justify-center gap-1 ">
            <div className="text-center mb-1 font-bold">
              الاتحاد المصري للفروسية
            </div>
            <div className="text-center text-gray-600 font-bold">
              Egyptian Equestrian Federation
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className=" rtl" dir="rtl">
          <table className="w-full  border-2 border-black  bg-gray-300">
            <tbody>
              <tr>
                <td className="border-2 border-black p-2 font-bold">
                  الهيئة / المركز:
                </td>
                <td className="border-2 border-black p-2" colSpan={3}>
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">
                  اسم الجواد:
                </td>
                <td className="border-2 border-black p-2" colSpan={3}>
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">
                  الاسم السابق للجواد:
                </td>
                <td className="border-2 border-black p-2" colSpan={3}>
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">
                  تاريخ الميلاد:
                </td>
                <td className="border-2 border-black p-2">
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
                <td className="border-2 border-black p-2 font-bold">اللون:</td>
                <td className="border-2 border-black p-2">
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                    defaultValue="احمر"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">الجنس:</td>
                <td className="border-2 border-black p-2">
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                    defaultValue="ذكر"
                  />
                </td>
                <td className="border-2 border-black p-2 font-bold">المنشأ:</td>
                <td className="border-2 border-black p-2">
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                    defaultValue="مصر"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">
                  جهة الميلاد:
                </td>
                <td className="border-2 border-black p-2">
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
                <td className="border-2 border-black p-2 font-bold">
                  رقم الجواد بالاتحاد:
                </td>
                <td className="border-2 border-black p-2">
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">
                  رقم الميكروشيب:
                </td>
                <td className="border-2 border-black p-2" colSpan={3}>
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black p-2 font-bold">
                  اسم المالك:
                </td>
                <td className="border-2 border-black p-2" colSpan={3}>
                  <input
                    type="text"
                    className="w-full p-1 border-2 border-black rounded bg-gray-300"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Horse Diagram */}

        <div className="max-w-4xl mx-auto   border-2 border-black bg-gray-300 rounded-md ">
          <img
            src={horse}
            alt="Horse Identification Diagram"
            height={100}
            className="object-contain  "
          />
        </div>

        {/* Notes Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">ملاحظات</label>
          <textarea
            className="w-full p-2 border-2 border-black rounded-md min-h-[70px] bg-gray-300"
            placeholder="Enter any additional notes"
          />
        </div>

        {/* Signature Section */}
        <div className="max-w-4xl mx-auto  gap-4 pt-4  border-t border-black">
          <div className="max-w-4xl mx-auto" dir="rtl">
            <table className="w-full  border-2 border-black  bg-gray-300">
              <tbody>
                <tr>
                  <td className="border-2 border-black p-2 font-bold">
                    اسم الطبيب البيطري :
                    <br />
                    محرر الاستمارة
                  </td>
                  <td className="border-2 border-black p-2">
                    <input
                      type="text"
                      className="w-full p-1 border-2 border-black rounded bg-gray-300"
                    />
                  </td>
                  <td className="border-2 border-black p-2 font-bold">
                    الامضاء:
                  </td>
                  <td className="border-2 border-black p-2">
                    <input
                      type="text"
                      className="w-full p-1 border-2 border-black rounded bg-gray-300"
                    />
                  </td>
                  <td className="border-2 border-black p-2 font-bold">
                    ختم الهيئة / المركز :
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-black p-2 font-bold">
                    اسم مسؤل البيطري
                  </td>
                  <td className="border-2 border-black p-2">
                    <input
                      type="text"
                      className="w-full p-1 border-2 border-black rounded bg-gray-300"
                      defaultValue=""
                    />
                  </td>
                  <td className="border-2 border-black p-2 font-bold">
                    الامضاء:
                  </td>
                  <td className="border-2 border-black p-2">
                    <input
                      type="text"
                      className="w-full p-1 border-2 border-black rounded bg-gray-300"
                      defaultValue=""
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col  justify-end items-center text-center">
          <div className="text-center mt-4 font-bold ">يعتمد</div>
          <div className="text-center text-sm">
            المدير التنفيذي للاتحاد المصري للفروسية
          </div>
        </div>
      </div>
    </div>
  );
}
