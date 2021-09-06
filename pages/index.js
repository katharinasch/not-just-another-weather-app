import {SearchBar} from '../components/SearchBar'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Form() {
  return (
    <div className="bg-blue-200">
      <div className="container mx-auto py-36 bg-blue-200">
        <div className="mt-12 px-96">
          <form action="#" method="POST" className="sm:grid-cols-2 sm:gap-x-8">
            
            <SearchBar />
            
            <div className="sm:col-span-2">
              <p className="block text-sm font-medium text-gray-700">For when are you looking a</p>
              <button className="mt-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Today
              </button>
            </div>
          </form>
      </div>
    </div>
  </div>
  )
}