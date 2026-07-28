import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../../services/authService";


const AdminProfile = () => {
const [open, setOpen] = useState(false);
const [phone, setPhone] = useState("");
const [loading, setLoading] = useState(false);
const [profile,setProfile] = useState(null);


useEffect(()=>{
const loadProfile = async () => {
    try {

        const response = await getProfile();

        setProfile(response.user);
          setPhone(response.user.phone || "");
    } catch (error) {

        console.error(error);

    }
}; loadProfile();

},[]);


const handleUpdate = async () => {

  try {

    setLoading(true);

    const response = await updateProfile({
      phone,
    });

    setProfile(response.user);

    setOpen(false);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};
return (



<>
<div className="p-6">


<h1 className="text-2xl font-bold text-blue-700 mb-6">
My Profile
</h1>


<div className="bg-white shadow-md rounded-xl p-6">


<div className="flex items-center gap-5">


<div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">

{profile?.name?.charAt(0)}

</div>


<div>

<h2 className="text-xl font-bold">
{profile?.name}
</h2>

<p className="text-gray-500">
Admin
</p>

</div>


</div>

<div className="flex justify-end">

  <button
    onClick={() => setOpen(true)}
    className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-2
      rounded-lg
      font-medium
    "
  >
    Edit Profile
  </button>

</div>
<hr className="my-6"/>



<div className="grid grid-cols-2 gap-6">

  <Info title="Email" value={profile?.email} />

  <Info title="Phone" value={profile?.phone} />

  <Info title="Role" value="Administrator" />

  <Info
    title="Account Status"
    value={profile?.isActive ? "Active" : "Inactive"}
  />

</div>

</div>


</div>
{open && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

  <div className="bg-white rounded-xl p-6 w-[400px]">

    <h2 className="text-xl font-bold text-blue-700 mb-5">
      Edit Profile
    </h2>

    <label className="text-sm font-medium">
      Phone Number
    </label>

    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="
        w-full
        border
        rounded-lg
        p-3
        mt-2
        mb-6
      "
    />

    <div className="flex justify-end gap-3">

      <button
        onClick={() => setOpen(false)}
        className="
          px-5
          py-2
          rounded-lg
          border
        "
      >
        Cancel
      </button>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
        "
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    </div>

  </div>

</div>

)};

</>
);
};



const Info=({title,value})=>(
<div>
<p className="text-sm text-gray-500">
{title}
</p>

<p className="font-semibold">
{value || "Not Available"}
</p>

</div>
);

export default  AdminProfile;