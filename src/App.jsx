import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedValue, setConvertedValue] = useState(0)

  const fromCurrencyInfo = useCurrencyInfo(from)
  const options = Object.keys(fromCurrencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedValue(amount)
    setAmount(convertedValue)
  }

  const convert = () => {
    setConvertedValue(amount * fromCurrencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{
            backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <div className="w-full mb-2 ">
            <InputBox
              label="from"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(value) => setAmount(value)}
              selectCurrency={from}
            />
          </div>

         <div className="relative w-full h-0.5">
            <button
                  type="button"
                  className="text-md absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-1"
                  onClick={swap}
            >
               swap
            </button>
         </div>


          <div className="w-full mb-4">
            <InputBox
              label="to"
              amount={convertedValue}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable={true}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
