import TopNavBar from "./topNavBar";

const ViewProductsTable = ({setHideSidebar,hideSidebar})=>{
    return <section id="content">
        <TopNavBar className="menu" setHideSidebar={setHideSidebar} hideSidebar={hideSidebar}/>
        <main>
        <div className="table-data">
            <div className="order">
            <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/assets/ecomm (8).jpg"} alt="Zip jacket"/>
                        <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td><span class="status completed">Completed</span></td>
                </tr>
                <tr>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/assets/ecomm (8).jpg"} alt="Zip jacket"/>
                        <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td><span class="status pending">Pending</span></td>
                </tr>
                <tr>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/assets/ecomm (8).jpg"} alt="Zip jacket"/>
                        <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td><span class="status process">Process</span></td>
                </tr>
                <tr>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/assets/ecomm (8).jpg"} alt="Zip jacket"/>
                        <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td><span class="status pending">Pending</span></td>
                </tr>
                <tr>
                    <td>
                        <img src={process.env.PUBLIC_URL + "/assets/ecomm (8).jpg"} alt="Zip jacket"/>
                        <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td><span class="status completed">Completed</span></td>
                </tr>
            </tbody>
        </table>
            </div>
        </div>

        </main>
    </section>

}
export default ViewProductsTable;