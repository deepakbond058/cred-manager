import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';


export default function Content() {
  const [form, setForm] = useState({  site: "", username: "", password: "" });
  const [formArray, setFormArray] = useState([]);
  const passwordRef = useRef();
  const getData = async ()=>{
  const response = await fetch('http://localhost:3000');
   setFormArray(await response.json())
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteEntry=async(id)=>{
    const ask = confirm("Do you want to delete these Credentials")
    if(ask){
      setFormArray(formArray.filter((item)=>item.id!==id));
      toast("Deleted Successfully");

      await fetch('http://localhost:3000', {
        method:'DELETE' ,
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id})
      })
    }
  }
  
  async function saveFormData() {

    if(form.site.length>3 && form.username.length>3  && form.password.length>3){
      const newForm =  {...form,id:uuidv4()};
      setFormArray([...formArray,newForm]);
      setForm({ site: "", username: "", password: "" });
      toast("Saved Successfully");
      if(true){

        await fetch('http://localhost:3000', {
          method:'DELETE' ,
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id:form.id})
        })
      }
//on creating array {} gets sent if no if conditon which deletes all items and only 
      await fetch('http://localhost:3000', {
        method:'POST' ,
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newForm)
      })
    }else{
      toast("Error: Enter Valid Credentials");
    }
  }

  const editEntry=(id)=>{
    //only this line will give form state an id otherwise its undefined
    setForm(formArray.find((item)=>item.id===id))  
    setFormArray(formArray.filter((item)=>item.id!==id));
  }

  const copyFromTable = (text) => {
    toast("Copied to Clipboard");
    navigator.clipboard.writeText(text);
  };

  const handlePasswordView = (e) => {
    if (e.target.src.includes("eye.svg")) {
      e.target.src = "assets/eyecross.svg";
      passwordRef.current.type = "text";
    } else {
      e.target.src = "assets/eye.svg";
      passwordRef.current.type = "password";
    }
  };

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  return (
    <div className="container w-full md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-5 mb-16 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />

      <h1 className="text-center mt-5">
        <div className="logo">
          <span className="text-3xl font-bold text-green-500">&lt;</span>
          <span className="text-2xl">Cred</span>
          <span className="text-3xl font-bold text-green-500">
            Manager/&gt;
          </span>
        </div>
        <span className="text-3xl font-bold">
          A reliable password manager for everyone.
        </span>
      </h1>

      <div className="flex flex-col items-center gap-5 bg-green-100 rounded-xl p-5">
        <input
          type="text"
          className="w-full rounded-full py-2 px-4"
          name="site"
          value={form.site}
          onChange={handleFormChange}
          placeholder="Enter Website URL here.."
        />

        <div className="flex flex-col md:flex-row  w-full gap-5">
          <input
            type="text"
            className="w-full rounded-full py-2 px-4"
            name="username"
            value={form.username}
            onChange={handleFormChange}
            placeholder="Enter Username here.."
          />

          <div className="w-full relative">
            <input
              type="password"
              ref={passwordRef}
              className="w-full rounded-full py-2 px-4"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              placeholder="Enter Password here.."
            />

            <img
              onClick={handlePasswordView}
              src="/assets/eye.svg"
              className="absolute right-2 top-3 top w-5"
              alt="eye"
            />
          </div>
        </div>

        <button onClick={saveFormData} className="bg-green-500 rounded-full flex gap-2 items-center py-1 px-5 hover:ring-1 ring-black"> 
        <lord-icon
          src="https://cdn.lordicon.com/jgnvfzqg.json"
          style={{ cursor: "pointer", height: "2rem", width: "2rem" }}
          trigger="hover"
          stroke="bold"
          
        ></lord-icon>
        <span>
        Save
        </span>
        </button>
      </div>


      <div className="flex flex-col gap-5 text-center bg-green-100 rounded-xl py-5 sm:px-5">
        <h2 className="font-bold text-2xl">Your Saved Credentials</h2>
        {formArray.length === 0 && <div>Nothing to display</div>}
        {formArray.length !== 0 && (
          <table className="w-full">
            <thead className="bg-green-900 text-white">
              <tr>
                <th className="py-3">Website name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
        
              </tr>
            </thead>
            <tbody className="bg-green-200">
              {formArray.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="py-1">
                      <div className="flex gap-1 items-center justify-center">
                        <a href={item.site} target="_blank">{item.site}</a>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          stroke="bold"
                          onClick={() => {
                            copyFromTable(item.site);
                          }}
                          style={{
                            cursor: "pointer",
                            height: "1.25rem",
                            width: "1.25rem",
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className="flex gap-1 items-center justify-center">
                        {item.username}
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          stroke="bold"
                          onClick={() => {
                            copyFromTable(item.username);
                          }}
                          style={{
                            cursor: "pointer",
                            height: "1.25rem",
                            width: "1.25rem",
                          }}
                          ></lord-icon>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className="flex gap-1 items-center justify-center">
                        {"*".repeat(item.password.length)}
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          stroke="bold"
                          onClick={() => {
                            copyFromTable(item.password);
                          }}
                          style={{
                            cursor: "pointer",
                            height: "1.25rem",
                            width: "1.25rem",
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td>
                     <div className="flex justify-center gap-2 items-center">

                     <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          stroke="bold"
                          onClick={()=>{deleteEntry(item.id)}}
                          style={{
                            cursor: "pointer",
                            height: "1.25rem",
                            width: "1.25rem",
                          }}
                          ></lord-icon>
                     <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          stroke="bold"
                          onClick={()=>{editEntry(item.id)}}
                          style={{
                            cursor: "pointer",
                            height: "1.25rem",
                            width: "1.25rem",
                          }}
                          ></lord-icon>
                     
                      </div>
                    </td>
                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
