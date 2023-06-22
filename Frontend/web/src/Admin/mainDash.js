
import {BsFillCalendarCheckFill,BsDownload} from "react-icons/bs";
import {FaUserCircle} from "react-icons/fa";
import {HiUsers} from "react-icons/hi";
import {ImBooks,ImFilm,ImPlay} from "react-icons/im";
import {IoBookSharp} from "react-icons/io5";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { AiFillDollarCircle } from "react-icons/ai";
import LogoutConfirmationDialog from "../user_auth/logoutConfirmation";

const MainDash = ({setHideSidebar,hideSidebar,showLogout,setShowLogout})=>{
    return  <>
	{showLogout &&  <LogoutConfirmationDialog
                setShowLogout={setShowLogout}
              />}
    <div class="head-title">
				<div class="left">
					<h1>Dashboard</h1>
					<ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li>
					</ul>
				</div>
				<a href="#" class="btn-download">
					<BsDownload/>
					<span class="text">Download PDF</span>
				</a>
			</div>

			<ul class="box-info">
				<li>
					<HiUsers className="bx"/>
					<span class="text">
						<h3>1020</h3>
						<p>New Users</p>
					</span>
				</li>
				<li>
					<ImBooks className="bx"/>
					<span class="text">
						<h3>2834</h3>
						<p>Courses</p>
					</span>
				</li>
				<li>
					<ImFilm className="bx"/>
					<span class="text">
						<h3>2543</h3>
						<p>Videos</p>
					</span>
				</li>
				<li>
					<ImPlay className="bx"/>
					<span class="text">
						<h3>2543</h3>
						<p>Chanels</p>
					</span>
				</li>
			</ul>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>New Users</h3>
						<i class='bx bx-search' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>Date Registered</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<img src={process.env.PUBLIC_URL + "/assets/poster (3).jpg"} alt="Zip jacket"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status completed">Completed</span></td>
							</tr>
							<tr>
								<td>
									<img src={process.env.PUBLIC_URL + "/assets/poster (3).jpg"} alt="Zip jacket"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									<img src={process.env.PUBLIC_URL + "/assets/poster (3).jpg"} alt="Zip jacket"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status process">Process</span></td>
							</tr>
							<tr>
								<td>
									<img src={process.env.PUBLIC_URL + "/assets/poster (3).jpg"} alt="Zip jacket"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									<img src={process.env.PUBLIC_URL + "/assets/poster (3).jpg"} alt="Zip jacket"/>
									<p>John Doe</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status completed">Completed</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="todo">
					<div class="head">
						<h3>Todos</h3>
						<i class='bx bx-plus' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<ul class="todo-list">
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
					</ul>
				</div>
			</div>
    </>
}
export default MainDash;