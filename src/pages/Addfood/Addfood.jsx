import React, { useState, useEffect } from 'react';
import addimg from '../../assets/addimg.png';
import { toast, ToastContainer } from 'react-toastify';
const Addfood = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(addimg); // 👈 this holds the actual URL
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Cake'
  });

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreview(url);
      return () => URL.revokeObjectURL(url); // cleanup old URL
    } else {
      setPreview(addimg);
    }
  }, [image]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.info('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('dish', JSON.stringify(data));
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:8080/api/dishes/add', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        toast.success("saved successfully")
        setData({ name: '', description: '', price: '', category: 'Cake' });
        setImage(null);
      }
      else{
        toast.error('Error adding the dish');
      }
    } catch (error) {
      toast.error('call to add dish failed');
    }
  };

  return (
    <div className="mx-3 mt-3">
      <div className="row">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="mb-4">Add a Dish</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img src={preview} alt="" height={58} width={58} />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='enter name'
                  id="name"
                  required
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  placeholder='describe the dish'
                  id="description"
                  rows="5"
                  required
                  name="description"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="roll">Roll</option>
                  <option value="Cake">Cake</option>
                  <option value="Salad">Salad</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Ice Cream">Ice Cream</option>
                  <option value="Biryani">Biryani</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  placeholder='&#8377; 200'
                  name="price"
                  id="price"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.price}
                />
              </div>

              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addfood;
