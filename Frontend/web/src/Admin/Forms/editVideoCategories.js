import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { BsDownload } from 'react-icons/bs';

function EditVideoCategories(){
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
    const {category} = useParams();
const data = JSON.parse(decodeURIComponent(category));

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
        formData.append("id",data.id);

        try {
            const result = await fetch(
                "https://api.gimply.org/categories/update",
                {
                    method: "POST",
                    body: formData
                }
            );
           
            
            const response = await result.json();
            console.log(response.message);
       
            if(result.status === 201) {
                setDisabled(false)
                return toast.success('Category Edited successfully');
            }
            setDisabled(false)
            toast.error('Error editing category');
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
                    <a href="#">Video Categories </a>
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
                <h1>Edit Existing Video Category!</h1>
                <p>Made A mistake?.</p> <p> You can edit it
                </p>
            </div>
            <div className='create-channels-form'>
            <form onSubmit={handleSubmit}>
            <div className="">
                <div className="form-group">
                    <div className='form-group-flex'>
                        <div className="settings_input">
                            <label>Category Name</label>
                            <input type="text" name="name" placeholder={data.name} value={name} onChange={handleNameInput}/>
                        </div>
                        <div className="settings_input">
                            <label>Category Banner</label>
                            <input type="file" onChange={handleBanner}/>
                        </div>
                    </div>
                    <div className="settings_input">
                        <label>Category Description</label>
                        <textarea placeholder={data.description} value={description} onChange={handleDescriptionInput}></textarea>
                    </div>
                </div>
                <br/>
                <div className="button-div">
                    <button type="submit" disabled={disabled}>Edit Category</button>
                </div>
            </div>
        </form>
            </div>
        </div>
    </>
}
export default EditVideoCategories;