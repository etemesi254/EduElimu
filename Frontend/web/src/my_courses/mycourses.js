import "./mycourses.css";
function Mycourses(){
    return <>
    
    <section className="courses-section">
    <h2>My Courses</h2>
        <div className="courses_div">
            <div className="course_div">
                <div className="course">
                    <div className="course_img">
                        <img src="./assets/home (2).jpg" className=""/>
                    </div>
                    <div className="course_info">
                        <h3>Abstract Design</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia facilis possimus necessitatibus aut ad, nobis nemo?</p>
                        <div className="course_attendants">
                            <div className="att">
                                <div className="attendants">
                                    <img src="./assets/home (1).jpg" className=""/>
                                </div>
                                <div className="attendants">
                                    <img src="./assets/home (2).jpg" className=""/>
                                </div>
                                <div className="attendants">
                                    <img src="./assets/home (2).jpg" className=""/>
                                </div>
                                <div className="attendants">
                                    <img src="./assets/home (2).jpg" className=""/>
                                </div>
                            </div>
                            <div className="plus">
                                <p>+38 more</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="progress_div">
                    <div class="progress-bar">
                        <div class="progress-bar-inner"></div>
                    </div>
                    <div className="">
                        <p>78%</p>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
    </>
}
export default Mycourses;