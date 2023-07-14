import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { BsDownload } from 'react-icons/bs';

function AddVideoCategory(){
    const container = useRef(null);

    useEffect(()=>{
        const instance = lottie.loadAnimation({
            container:container.current,
            renderer:'svg',
            loop: true,
            autoplay:true,
            animationData: require('./create.json'),
        });
        return () => instance.destroy();
    },[]);

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [banner,setBanner] = useState('');
    const [disabled,setDisabled] = useState(false);

    const handleNameInput = (e)=>setName(e.target.value);
    const handleDescriptionInput = (e)=>setDescription(e.target.value);
    const handleBanner = (e)=>setBanner(e.target.files[0]);
    
    async function handleSubmit(e){
        e.preventDefault();
        setDisabled(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('banner', banner);
        formData.append('status', 1); 

        try {
            const result = await fetch(
                "http://127.0.0.1:8000/api/categories/create",
                {
                    method: "POST",
                    body: formData
                }
            );
           
            
            const response = await result.json();
       
            if(result.status === 201) {
                setDisabled(false)
                return toast.success('New video category added!');
            }
            setDisabled(false)
            toast.error('Error creating category');
        } catch (error) {
            setDisabled(false)
            return toast.error(error.message);
        }
    }

    return <>
     <div class="head-title">
        <div class="left">
            <h1>Video Categories</h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Video Categories Add</a>
                </li>
                <li><i class='bx bx-chevron-right' ></i></li>
                <Link to={"/admin/video-categories"}>
                <li>
                    <a class="active" href="#">View Categories</a>
                </li>
                </Link>
            </ul>
        </div>
        <a href="#" class="btn-download">
            <BsDownload/>
            <span class="text">Download PDF</span>
        </a>
    </div>
    <div className="create-channels-container">
            <div className="lottie_container" ref={container}></div>
            <div className="create-channel-head">
                <h1>Add A New Video Category!</h1>
                <p>Help learners know which videos.</p> <p> belong to which category
                </p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group">
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Category Name</label>
                            <input type="text" name="name" placeholder='Category Name' value={name} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Category Banner</label>
                            <input type="file" onChange={handleBanner}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Category Description</label>
                        <textarea placeholder="Enter category description here" value={description} onChange={handleDescriptionInput}></textarea>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit" disabled={disabled}>Add Category</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </>
}
export default AddVideoCategory;