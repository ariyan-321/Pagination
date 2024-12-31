/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const[loading,setLoading]=useState(true);
  const[products,setProducts]=useState([]);
  const[page,setPage]=useState(1);
  const[totalPages,setTotalPages]=useState(0);



  useEffect(()=>{
    setLoading(true)
    fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`)
    .then(res=>res.json())
    .then(data=> {
      setProducts(data.products);
      setLoading(false)
      setTotalPages(Math.ceil(data.total / 10));
    })
  },[page]);


  const selectPageHandler=(selectedPage)=>{
    if(selectedPage>=1 && selectedPage<=totalPages && selectedPage!==page){
      setPage(selectedPage);
    }
  }


  return (

    <>

<div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

   {/* loader */}
     {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}

{/* cards */}
   <div className="grid justify-self-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-7 gap-7">

    {
      products.map(prod=> <div key={prod.id}>
        <div className="card bg-base-100 m-12  md:m-16 lg:m-7 xl:m-20 shadow-xl">
  <figure>
    <img
      src={prod.thumbnail}
      alt={prod.title} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{prod.title}</h2>
    <p>{prod.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
      </div>)
    }

   </div>

   
{/*  
 pagination */}
    <div className='flex flex-wrap justify-center items-center gap-3 my-5'>
      <button onClick={()=> selectPageHandler(page-1)} className={page>1?"btn":"btn hidden"}>prev</button>
    {
      [...Array(totalPages)].map((_,i)=>{
       return <button onClick={()=> selectPageHandler(i+1)} key={i} className={page==i+1?"btn bg-green-400":"btn"}>{i+1}</button>
      })
    }
    <button onClick={()=> selectPageHandler(page+1)} className={page<totalPages?"btn":"btn hidden"}>next</button>
    </div>
    






    <footer className="footer bg-base-200 text-base-content p-10 mt-min-h-screen">
  <aside>
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-current">
      <path
        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    </svg>
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>




   </>
  )
}

export default App