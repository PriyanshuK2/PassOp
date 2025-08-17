import React from "react";
import { useRef, useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const imgRef = useRef();
  const passRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast.success("Copied to Clipboard");
    // toast.success('Copied to Clipboard!', {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light"
    //   });

    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
        );
        console.log([...passwordArray, { ...form, id: uuidv4() }]);
        setForm({ site: "", username: "", password: "" })
        toast.success("Saved!")
      }else{
        toast.error('Enter valid argumenets!')
      }
  };
  const deletePassword = (id) => {
    
    const c = confirm("Do you want to delete");
    if(c){

      setPasswordArray(passwordArray.filter(item=>item.id!=id))
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!=id)))
      toast.success("Deleted!")
    }

  };
  const editPassword = (id) => {
    setForm(passwordArray.filter(item=>item.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!=id))
    localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!=id)))

  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    if (imgRef.current.src.includes("/icons/eye1.jpg")) {
      passRef.current.type = "text";
      imgRef.current.src = "/icons/eye_crossed.png";
    } else {
      passRef.current.type = "password";
      imgRef.current.src = "/icons/eye1.jpg";
    }
  };

  return (
    <div>
      {/* <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Zoom"
      /> */}

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="md:p-0 p-2 md:mycontainer min-h-[84.4vh]">
        <h1 className="text-4xl font-bold text-center ">
          <span className="text-purple-700 ">&lt;</span>
          Pass
          <span className="text-purple-700">Op/&gt;</span>
        </h1>
        <p className="text-purple-900  text-center text-lg ">
          You're Own Password Manager
        </p>
        <div className="flex flex-col  text-black p-4 gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            type="text "
            name="site"
            className=" rounded-full bg-white border p-4 border-purple-500 w-full py-1"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              type="text "
              name="username"
              className=" rounded-full bg-white border p-4 border-purple-500 w-full py-1"
              id="username"
            />
            <div className="relative">
              <input
                ref={passRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                type="password"
                name="password"
                className=" rounded-full bg-white border p-4 border-purple-500 w-full py-1"
                id="password"
              />
              <span
                className="absolute  cursor-pointer right-[3px] top-[4px]"
                onClick={togglePassword}
              >
                <img
                  ref={imgRef}
                  className="p-1"
                  width={26}
                  src="/icons/eye1.jpg"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex p-6 border border-purple-900 py-2 w-fit gap-2 justify-center rounded-full bg-purple-500 items-center hover:text-white hover:bg-purple-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 items-center justify-center">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No Password to Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
              <thead className="bg-purple-600 text-white ">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Passwords</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td
                        className="py-2 border border-white text-center w-32"
                        onClick={() => copyText(item.site)}
                      >
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <lord-icon
                          className="cursor-pointer"
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{
                            width: "18px",
                            height: "18px",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                        ></lord-icon>
                      </td>
                      <td
                        className="py-2 border border-white text-center w-32"
                        onClick={() => copyText(item.username)}
                      >
                        {item.username}
                        <lord-icon
                          className="cursor-pointer"
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{
                            width: "18px",
                            height: "18px",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                        ></lord-icon>
                      </td>
                      <td
                        className="py-2 border border-white text-center w-32"
                        onClick={() => {copyText(item.password)}}
                      >
                        {item.password}
                        <lord-icon
                          className="cursor-pointer"
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{
                            width: "18px",
                            height: "18px",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                        ></lord-icon>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <span
                          className=""
                          onClick={() => {editPassword(item.id)}}
                        >
                          <lord-icon
                            className="cursor-pointer "
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{
                              width: "18px",
                              height: "18px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>

                        <span
                          className=""
                          onClick={() => {deletePassword(item.id)}}
                        >
                          <lord-icon
                            className="cursor-pointer mx-1"
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{
                              width: "18px",
                              height: "18px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <Toaster />
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager;
