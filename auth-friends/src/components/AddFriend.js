import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialFormValues = {
  name: "",
  age: 0,
  email: "",
};

const AddFriend = (props) => {
  console.log(props);
  const [formValues, setFormValues] = useState(initialFormValues);
  const history = useHistory();

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const createNewFriend = () => {
    const newFriend = { ...formValues, id: Date.now };
    return newFriend;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const friend = createNewFriend();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/friends",
        friend,
        {
          headers: {
            authorization: token,
          },
        }
      );
      props.setFriends(res.data)
      history.push('/friends')
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Age
        <input
          type="number"
          name="age"
          value={formValues.age}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default AddFriend;

// {
//     id: 1,
//     name: 'Rachel Green',
//     age: 30,
//     email: 'rachel@friends.com'
//   },
