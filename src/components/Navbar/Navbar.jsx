/* eslint-disable jsx-a11y/anchor-is-valid */
export const Navbar = () => (
    <div className="w-full px-16 border-b flex justify-between items-center h-20 shadow-lg">
        <div className="flex h-full">
            <div className="flex-shrink-0 flex items-center">
                <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            </div>
            <div className="hidden h-full sm:block sm:ml-6">
                <div className="flex space-x-4 h-full">
                    <a href="#" className="flex items-center h-full text-black border-b-2 border-indigo-700 px-3 font-medium" aria-current="page">Notes</a>

                    <a href="#" className="flex items-center h-full text-gray-400 px-3 font-medium border-opacity-0 border-indigo-700 border-b-2 hover:border-opacity-100">Team</a>

                    <a href="#" className="flex items-center h-full text-gray-400 px-3 font-medium border-opacity-0 border-indigo-700 border-b-2 hover:border-opacity-100">Projects</a>

                    <a href="#" className="flex items-center h-full text-gray-400 px-3 font-medium border-opacity-0 border-indigo-700 border-b-2 hover:border-opacity-100">Calendar</a>
                </div>
            </div>
        </div>
        <div className="">
            <button type="button" className=" bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </button>
          </div>
    </div>
)