import { useEffect, useState } from "react";
import AnimatedReceiptWaitingIndicator from "./AnimatedReceiptWaitingIndicator";

const today = new Date();
const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const year = today.getFullYear();

const formattedDate = `${day}/${month}/${year}`;

function generateRandomReceiptNumber() {
    const section1 = ('00' + Math.floor(Math.random() * 100)).slice(-2);
    const section2 = ('000' + Math.floor(Math.random() * 1000)).slice(-3);
    const section3 = ('000' + Math.floor(Math.random() * 1000)).slice(-3);
    const section4 = ('00' + Math.floor(Math.random() * 100)).slice(-2);
  
    return `${section1}-${section2}-${section3}-${section4}`;
  }
  
 

const Receipt = ({ totalProducts, generatReceiptHandler, totalAmount }) => {
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGeneratingReceipt(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const randomReceiptNumber = generateRandomReceiptNumber();

  return !isGeneratingReceipt ? (
    <AnimatedReceiptWaitingIndicator />
  ) : (
    <div className="w-[97%] mx-auto bg-white py-10 md:w-[40rem]">
      <div className="flex gap-8 items-center bg-green-700 p-10">
        <div className="h-20 w-20 bg-white"></div>
        <div className="text-white">
          <p className="font-semibold text-4xl mb-3">Receipt</p>
          <p className="text-sm">No. {randomReceiptNumber}</p>
          <p className="text-sm">
            Date: <span>{formattedDate}</span>
          </p>
        </div>
      </div>

      <div className="bg-gray-200 p-3 my-7 w-full md:p-5">
        <div className="flex font-semibold mb-5 pb-5 border-b border-white justify-between text-xs md:text-base">
          <p className="w-16 md:w-20">Product</p>
          <p className="w-16 md:w-20">Price</p>
          <p className="w-16 md:w-20">Qty</p>
          <p className="w-16 md:w-20">SubTotal</p>
        </div>
        {totalProducts.map((data, index) => (
          <div
            className="flex justify-between text-xs md:text-base"
            key={index}
          >
            <p className="w-16 md:w-20">{data.product}</p>
            <p className="w-16 md:w-20">₦{data.price / data.quantity}</p>
            <p className="w-16 md:w-20">{data.quantity}</p>
            <p className="w-16 md:w-20">₦{data.price}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex justify-end p-5">
        <div>
          {" "}
          <p>
            Total: <span className="text-lg font-semibold">₦{totalAmount}</span>
          </p>
          <p className="text-sm">
            Status: <span>Paid</span>
          </p>
          <p className="text-sm">
            Payment Method: <span>Cash</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
         onClick={() => generatReceiptHandler(false)}
          className="mx-5 bg-orange-500 text-white px-7 py-1"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Receipt;
