import { AuthContext } from "./authprovider.mjs";
import { useContext } from 'react'
import useUploadInvoiceFile from "./invoice/hook/useInvoicesUpload.mjs";



export const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)


    return (  
        <div className="navbar">
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset focus:outline-none"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="block size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex shrink-5 items-center">
                    <img
                      className="h-8 w-auto"
                      src= '/tumainvoice.png'
                      alt="TumaInvoice"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <a
                        href="/dashboard"
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        aria-current="page"
                      >
                        Dashboard
                      </a>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  >
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  </button>
                  {!isAuthenticated ? (
                    <div className="ml-4 flex space-x-4">
                      <a
                        href="/login"
                        className="rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="rounded-md px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                      >
                        Signup
                      </a>
                    </div>
                  ) : (
                    <div className="ml-4 flex space-x-4">
                      <a
                        href="#"
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Profile
                      </a>
                      <div>
                        <button className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={logout}>Sign out</button>
                      </div>
                     
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
          </div>
    )
}
 

const HomePage = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const { handleFileUpload, file, setFile, loading, setLoading} = useUploadInvoiceFile()
    return (
        
          <div className="container-fluid">
            <Navbar/>
            <div className="flex justify-center items-center h-screen">
              <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Upload a File</h2>
                <form onSubmit={handleFileUpload}>
                  <div className="mb-4">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        
    );
}

export default HomePage;

