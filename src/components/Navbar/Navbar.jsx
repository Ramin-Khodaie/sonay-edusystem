import './Navbar.css'
import { Link } from 'react-router-dom'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {


return(
        
   
  
  <nav>
    <div  class="my-nav px-3 py-2  text-white">
      
        <div class="  d-flex flex-wrap align-items-center justify-content-start  ">


          
            <Link  style={{textDecoration : "none"}} to={'/fgd'}  >


              

              
              
              <a className='header-text'> <FontAwesomeIcon className='header-icon' icon={faHouseChimney} />  خانه</a>
         
            </Link>

        </div>
    
    </div>
    
  </nav> 


)
}

export default Navbar