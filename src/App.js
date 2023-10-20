import { useState } from "react";
import Receipt from "./components/Receipt";

const productsInfo = [
  { product: "Hand Bag", price: 100, id: "p1" },
  { product: "Travel Bag", price: 400, id: "p2" },
  { product: "Bag", price: 200, id: "p3" },
  { product: "MacBook Computer", price: 700, id: "p4" },
  { product: "Rose Flowers", price: 800, id: "p5" },
  { product: "Laptop", price: 800, id: "p6" },
  { product: "Apple", price: 800, id: "p7" },
];

function App() {
  const [filteredProductInfo, setFilterdProductInfo] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [switchCart, setSwitchCart] = useState(false);
  const [generatReceipt, setGenerateReceipt] = useState(false);

  const filterProductHandler = (event) => {
    const searchedProduct = event.target.value;
    if (searchedProduct === "") {
      setFilterdProductInfo([]);
      return;
    }
    const filteredProduct = productsInfo.filter((product) => {
      const foundProducts = product.product.toLowerCase();
      return foundProducts.includes(searchedProduct.toLowerCase());
    });

    setFilterdProductInfo(filteredProduct);
  };

  const addProductHandler = (productObj) => {
    setTotalAmount((prev) => {
      const total = prev + productObj.price;
      return total;
    });

    const existingCartItemindex = totalProducts.findIndex(
      (item) => item.id === productObj.id
    );
    const existingCartItem = totalProducts[existingCartItemindex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        price: existingCartItem.price + productObj.price,
        quantity: existingCartItem.quantity + 1,
      };
      setTotalProducts((prev) => {
        updatedItems = [...prev];
        updatedItems[existingCartItemindex] = updatedItem;
        return updatedItems;
      });
    } else {
      setTotalProducts((prev) => [...prev, { ...productObj, quantity: 1 }]);
    }
  };

  const removeProductHandler = (productObj) => {
    const existingCartItemIndex = totalProducts.findIndex(
      (item) => item.id === productObj.id
    );
    const existingItem = totalProducts[existingCartItemIndex];

    let updatedItems;
    if (existingItem.quantity === 1) {
      setTotalProducts((prev) => {
        updatedItems = prev.filter((item) => item.id !== productObj.id);
        return updatedItems;
      });
      
    } else {
      setTotalProducts((prev) => {
        const updatedItem = {
          ...existingItem,
          price:
            existingItem.price - existingItem.price / existingItem.quantity,
          quantity: existingItem.quantity - 1,
        };
        updatedItems = [...prev];
        updatedItems[existingCartItemIndex] = updatedItem;
        return updatedItems;
      });
    }
    setTotalAmount((prev) => {
      const total = prev - existingItem.price / existingItem.quantity;
      return total;
    });
  };

  const switchCartHandler = () => {
    setSwitchCart((prev) => !prev);
  };

  const generatReceiptHandler = (val) => {
    if (!val) {
      setTotalAmount(0);
      setTotalProducts([]);
    }
    setGenerateReceipt(val);
  };
  return (
    <main className="py-5">
      {generatReceipt ? (
        <Receipt
          totalProducts={totalProducts}
          totalAmount={totalAmount}
          generatReceiptHandler={generatReceiptHandler}
        />
      ) : (
        <>
          {" "}
          <h1 className="text-center mt-10 text-white font-bold text-2xl mb-8 md:text-5xl">
            Billing System
          </h1>
          <div className="w-[90%] mx-auto flex flex-col md:w-[50rem]">
            <input
              onChange={filterProductHandler}
              placeholder="Search for products eg.(Bag, Flower, Laptop, Computer)"
              className="h-14 w-full px-5"
            />
            <p className="text-white text-xs p-1">
              Eg. Bags, Computer, Flowers, Apple, Laptop
            </p>
          </div>
          {filteredProductInfo.length !== 0 && (
            <div className="w-[90%] flex flex-col mx-auto gap-3 bg-white px-2 py-3 rounded-2xl shadow-2xl md:p-7 md:w-[40rem] mt-8">
              {filteredProductInfo.map((productObj, index) => (
                <div key={index} className="w-full flex justify-between">
                  <p>{productObj.product}</p>
                  <div className="flex items-center gap-2">
                    {" "}
                    <p>₦ {productObj.price}</p>{" "}
                    <button
                      onClick={() => addProductHandler(productObj)}
                      className="text-sm bg-orange-500 text-white py-1 px-2 md:px-4"
                    >
                      Add
                    </button>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalProducts.length !== 0 && (
            <div className="w-[90%] flex flex-col mx-auto gap-3 bg-white p-7 rounded-2xl shadow-xl md:w-[40rem] mt-8">
              <div className="w-full flex justify-end">
                <button
                  onClick={switchCartHandler}
                  className="flex items-center bg-orange-500 space-x-1 rounded-2xl mb-3 text-white px-3 py-2"
                >
                 <p>{`${switchCart ? "Hide" : "View"} `} Cart </p> 
                 <div className="bg-white text-black flex-shrink-0 h-4 w-4 text-xs  rounded-full">{totalProducts.length}</div>
                </button>
              </div>
              {switchCart && (
                <div>
                  {totalProducts.map((data, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap gap-2 justify-between border-b bg-orange-500 text-white p-3"
                    >
                      <div>
                        {" "}
                        <div className="flex gap-2">
                          <p>Product: </p>
                          <p>{data.product}</p>{" "}
                        </div>
                        <div className="flex gap-2">
                          <p>Price: </p>
                          <p>₦{data.price}</p>{" "}
                        </div>
                        <div className="flex gap-2">
                          <p>Quantity: </p>
                          <p>{data.quantity}x</p>{" "}
                        </div>
                      </div>
                      <button
                        onClick={() => removeProductHandler(data)}
                        className="text-sm bg-white text-gray-500 h-max py-1 px-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <p>
                    Total: <span className="font-semibold">₦{totalAmount}</span>
                  </p>
                  <button
                    onClick={() => generatReceiptHandler(true)}
                    className="rounded-3xl mt-7 py-2 w-full bg-orange-500 text-white text-lg text-center"
                  >
                    Confirm Payment
                  </button>
                </div>
              )}{" "}
            </div>
          )}{" "}
        </>
      )}
    </main>
  );
}

export default App;
